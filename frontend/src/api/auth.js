import axios from 'axios';

axios.defaults.withCredentials = true;

let api_endpoint = '';
if (process.env.NODE_ENV == 'development') {
  api_endpoint = 'http://localhost:8000';
} else {
  api_endpoint = 'https://r.atuesday.io';
}

export async function onRegistration(registrationData) {
  return await axios.post(
    `${api_endpoint}/api/register`,
    registrationData,
  );
}

export async function onLogin(loginData) {
  return await axios.post(`${api_endpoint}/api/login`, loginData);
}

export async function onLogout() {
  return await axios.get(`${api_endpoint}/api/logout`);
}

export async function fetchProtectedInfo() {
  return await axios.get(`${api_endpoint}/api/protected`);
}
