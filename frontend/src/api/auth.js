import axios from 'axios';

axios.defaults.withCredentials = true;

const api_endpoint = process.env.REACT_APP_SERVER_URL;

export async function onRegistration(registrationData) {
  return await axios.post(
    `https://${api_endpoint}/api/register`,
    registrationData,
  );
}

export async function onLogin(loginData) {
  return await axios.post(
    `https://${api_endpoint}/api/login`,
    loginData,
  );
}

export async function onLogout() {
  return await axios.get(`https://${api_endpoint}/api/logout`);
}

export async function fetchProtectedInfo() {
  return await axios.get(`https://${api_endpoint}/api/protected`);
}
