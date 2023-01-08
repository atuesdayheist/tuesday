import axios from 'axios';

axios.defaults.withCredentials = true;

let api_endpoint = '';
if (process.env.NODE_ENV == 'development') {
  api_endpoint = 'http://localhost:8000';
} else {
  api_endpoint = 'https://r.atuesday.io';
}

export async function getImageFromSource(tweetID) {
  return await axios.post(`${api_endpoint}/curate/getImage`, tweetID);
}
