const { Router } = require('express');
const {
  getUsers, register, login, protectedRoute, logout,
} = require('../controllers/auth');
const { validationMiddleware } = require('../middlewares/validation-middleware');
const { registerValidation, loginValidation } = require('../validators/auth');
const { userAuth } = require('../middlewares/auth-middleware');

const router = Router();

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protectedRoute);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', userAuth, logout);

module.exports = router;
