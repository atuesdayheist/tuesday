const db = require('../db');
const { check } = require('express-validator');

const imageSource = check('curateURL').custom(async (value, { req }) => {
  if (!value.match(/twitter.com/)) {
    throw new Error("This doesn't appear to be a tweet");
  }
});

module.exports = {
  sourceValidation: [imageSource],
};
