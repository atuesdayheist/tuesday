const { Router } = require('express');
const { getImageFromTweet } = require('./controller');

const router = Router();

router.post('/getTweet', getImageFromTweet);

module.exports = router;
