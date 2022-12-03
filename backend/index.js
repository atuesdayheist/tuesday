const { config } = require('dotenv');
config();

const express = require('express');
// const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const cors = require('cors');
// const { PORT, CLIENT_URL } = require('./constants');

const app = express();

// import middlewares
// require('./auth/middlewares/passport-middleware');

// initialize middlewares
app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: CLIENT_URL, credentials: true }));
// app.use(cors({ origin: '*', credentials: false }));
// app.use(passport.initialize());

// import routes
const authRoutes = require('./auth/routes');

// initialize routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('>:(');
});

// Start App
const appStart = () => {
  try {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'dev') {
      app.listen(8000, () => {
        console.log(`The app is running at http://localhost:8000`);
      });
    } else {
      app.listen();
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
