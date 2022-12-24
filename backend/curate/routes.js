const { Router } = require('express');
const { getImageFromTweet } = require('./controller');

const router = Router();

router.get('/', getImageFromTweet);

module.exports = router;
