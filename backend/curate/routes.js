const { Router } = require('express');
const { getImageFromSource } = require('./controller');
const { sourceValidation } = require('./validator');

const router = Router();

router.post('/getImage', sourceValidation, getImageFromSource);

module.exports = router;
