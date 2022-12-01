const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const db = require('../db');
const { SECRET } = require('../constants');

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      'select user_id, username, email from users'
    );
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await db.query(
      'INSERT INTO users(email, username, password) values ($1 , $2 , $3)',
      [email, username, hashedPassword]
    );
    return res.status(201).json({
      success: true,
      message: 'Registration Successful',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { user } = req;
  const payload = {
    id: user.user_id,
    username: user.username,
  };
  try {
    const token = await sign(payload, SECRET);
    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protectedRoute = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
