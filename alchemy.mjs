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
