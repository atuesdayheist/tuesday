const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { TWITTER_BEARER_TOKEN } = require('../constants');

const options = {
  method: 'GET',
  headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
};

exports.getImageFromTweet = async (req, res) => {
  const curateURL = req.body.curateURL;
  // return res.status(200).json({ success: 'working lemao' });
  fetch(
    `https://api.twitter.com/2/tweets/${curateURL}?expansions=attachments.media_keys&media.fields=url`,
    options
  )
    .then((response) => {
      response.json().then((data) => {
        const mediaURL = data.includes.media[0].url;
        return res.status(200).json({ success: mediaURL });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
