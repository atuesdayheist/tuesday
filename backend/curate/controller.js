import axios from 'axios';
import { TWITTER_BEARER_TOKEN } from '../constants';

axios.defaults.withCredentials = true;

const config = {
  headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
};

export async function getImageFromTweet(tweetID) {
  console.log(tweetID);
  //   return await axios
  //     .get(
  //       `https://api.twitter.com/2/tweets/${tweetID}?expansions=attachments.media_keys&media.fields=url`,
  //       config
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     });
}
