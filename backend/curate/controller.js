const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = (...args) =>
  import('axios').then(({ default: fetch }) => fetch(...args));
const { TWITTER_BEARER_TOKEN } = require('../constants');

exports.getImageFromSource = async (req, res) => {
  const curateURL = req.body.curateURL;
  if (!curateURL.match(/https:\/\/twitter.com/)) {
    return res.status(500).json({ error: 'Does not appear to be a tweet' });
  }

  const tweetID = curateURL.split('?')[0].split('/')[5];

  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
  };

  try {
    // Get Tweet from Twitter API
    fetch(
      `https://api.twitter.com/2/tweets/${tweetID}?tweet.fields=entities,possibly_sensitive,author_id,created_at&expansions=attachments.media_keys&media.fields=url`,
      options
    )
      .then((response) => {
        response.json().then((data) => {
          // Query username from tweet author_id because for some reason, you can't get the username from the tweet itself
          const author_id = data.data.author_id;
          fetch(`https://api.twitter.com/2/users/${author_id}`, options).then(
            (response) => {
              response.json().then((userData) => {
                const mediaObjects = data.includes.media;
                const imageObjects = mediaObjects.filter(
                  (media) => media.type == 'photo'
                );

                // Then handle the rest of data
                if (imageObjects.length == 0) {
                  return res.status(500).json({
                    error: 'The tweet does not appear to have any images',
                  });
                }

                const hashtags = [
                  `artist:${userData.data.username}`,
                  `artist:${userData.data.name}`,
                  `twitterUID:${author_id}`,
                ];
                data.data.entities.hashtags.map((hashtag) => {
                  hashtags.push(hashtag.tag);
                });

                imageObjects.map((image) => {
                  image.original_url = curateURL;
                  image.source = 'Twitter';
                  image.tags = hashtags;
                });
                return res.status(200).json({ success: imageObjects });
              });
            }
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.downloadImageFromURL = async (req, res) => {
  const curateURLs = req.body.curateURLs;
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
  };
};
