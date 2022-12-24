import axios from 'axios';

axios.defaults.withCredentials = true;

let api_endpoint = '';
if (process.env.NODE_ENV == 'development') {
  api_endpoint = 'http://localhost:8000';
} else {
  api_endpoint = 'https://r.atuesday.io';
}

export async function getImageFromTweet(tweetID) {
  return await axios.get(
    `${api_endpoint}/curate/getTweet`,
    tweetID.curateURL,
  );
}
