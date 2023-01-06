const { Router } = require('express');
const { getImageFromSource, downloadImageFromURL } = require('./controller');

const router = Router();

router.post('/getImage', getImageFromSource);
router.post('/saveImage', downloadImageFromURL);

module.exports = router;
