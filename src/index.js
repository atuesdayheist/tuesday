const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT } = require('./constants');

const app = express();

// initialize middlewares
app.use(express.json());
app.use(cookieParser());

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
