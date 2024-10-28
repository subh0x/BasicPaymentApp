const express = require('express');
const Account = require('../models/accountModel.js');
const authMiddleware = require('../middlewares/middleware.js');
const { handleUserSearch, handleUserDetailsUpdate, handleUserSignIn, handleUserSignUp } = require('../controllers/userController.js');

const userRouter = express.Router();

// User signup Route:
userRouter.post('/signup', handleUserSignUp);

// User signin Route:
userRouter.post('/signin', handleUserSignIn);

// Update user details route
userRouter.put('/', authMiddleware, handleUserDetailsUpdate);

// Search user route: //TODO: Add AuthMiddleware
userRouter.get('/bulk', handleUserSearch);

module.exports = userRouter;

