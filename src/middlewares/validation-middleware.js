const { validationResult } = require('express-validator');

/* eslint-disable consistent-return */
exports.validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
