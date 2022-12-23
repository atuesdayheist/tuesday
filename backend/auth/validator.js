const { compare } = require('bcryptjs');
const { check } = require('express-validator');

const db = require('../db');

const username = check('username')
  .isLength({ min: 3 })
  .withMessage('Username must have 3 or more characters.');
const password = check('password')
  .isLength({ min: 6 })
  .withMessage('Password must have 6 or more characters.');
const email = check('email').isEmail().withMessage('Invalid Email');

const usernameExists = check('username').custom(async (value) => {
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [
    value,
  ]);
  if (rows.length) {
    throw new Error('Username already exists');
  }
});

const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [
    value,
  ]);
  if (rows.length) {
    throw new Error('Email has been registered already');
  }
});

const loginFieldsCheck = check('username').custom(async (value, { req }) => {
  const user = await db.query('SELECT * FROM users WHERE username = $1', [
    value,
  ]);
  if (!user.rows.length) {
    throw new Error('Username does not exist');
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);
  if (!validPassword) {
    throw new Error('Invalid Password');
  }

  [req.user] = user.rows;
});

module.exports = {
  registerValidation: [email, username, password, usernameExists, emailExists],
  loginValidation: [loginFieldsCheck],
};
