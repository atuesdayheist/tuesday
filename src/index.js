const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { PORT, CLIENT_URL } = require('./constants');

const app = express();

// import middlewares
require('./middlewares/passport-middleware');

// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credential: true }));
app.use(passport.initialize());

// import routes
const authRoutes = require('./routes/auth');

// initialize routes
app.use('/api', authRoutes);

// Start App
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
