const baseURL = "https://alchemy-kd0l.onrender.com";
const startURL = `${baseURL}/start`;
const statusURL = `${baseURL}/status`;
const submitURL = `${baseURL}/submit`;
const clueURL = `${baseURL}/clue`;

let token = null;

const userConfig = {
  email: "eimantasb@uia.no",
  nick: "Eimantas",
  pin: "1234",
};

let response = await (
  await fetch(startURL, {
    body: JSON.stringify(userConfig),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
).json();

token = response.token;

console.log("Token", token);

response = await (
  await fetch(statusURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  })
).json();

console.log("Current challenge", response);

function runCircuit(A, B, C, D, E) {
  const outA = (A & B) | (!C ? 1 : 0);

  const xorCD = C ^ D;
  const andDE = D & E;
  const outB = !(xorCD & andDE) ? 1 : 0;

  return `${outA}${outB}`;
}

function decodeSubstitution(text, cipherAlphabet) {
  const normalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (const char of text) {
    const index = cipherAlphabet.indexOf(char);
    if (index === -1) {
      result += char;
    } else {
      result += normalAlphabet[index];
    }
  }
  return result;
}

let answer = null;
if (response.challengeId === 1) {
  const two = 2;
  answer = two + two;
}
if (response.challengeId === 2) {
  answer = "pi";
}
if (response.challengeId === 3) {
  answer = "GoldQuicksilverSilverIronGold";
}
if (response.challengeId === 4) {
  answer = "SILVER";
}
if (response.challengeId === 5) {
  const binary = "01110110011001010101010101100011010010101100101";
  let result = "";

  for (let i = 0; i < binary.length; i += 5) {
    const group = binary.slice(i, i + 5);

    if (group.length < 5) break;

    const A = Number(group[0]);
    const B = Number(group[1]);
    const C = Number(group[2]);
    const D = Number(group[3]);
    const E = Number(group[4]);

    result += runCircuit(A, B, C, D, E);
  }

  answer = result;
}
if (response.challengeId === 6) {
  const cipherAlphabet = "QFMBTHLCZPRSKVJXDGUWOYAEIN";
  const encoded = "UZSYTG MJXXTG LJSB STQB";
  answer = decodeSubstitution(encoded, cipherAlphabet);
}
const submitResponse = await (
  await fetch(submitURL, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ answer }),
  })
).json();
console.log("Submit result:", submitResponse);

const nextResponse = await (
  await fetch(statusURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  })
).json();

console.log("Next challenge:", nextResponse);
