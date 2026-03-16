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
