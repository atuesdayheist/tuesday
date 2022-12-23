const { config } = require('dotenv');
config();

const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { CLIENT_URL, PORT } = require('./constants');

const app = express();

// import middlewares
require('./auth/middlewares/passport-middleware');

// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());
app.use(express.static('public'));

// import routes
const authRoutes = require('./auth/routes');

// initialize routes
app.use('/api', authRoutes);

// Start App
const appStart = () => {
  try {
    console.log(process.env.NODE_ENV);
    app.listen(PORT);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
