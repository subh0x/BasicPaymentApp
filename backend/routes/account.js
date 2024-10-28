const express = require('express');
const authMiddleware = require('../middlewares/middleware.js');
const { handleAccountBalance, handleMoneyTransfer } = require('../controllers/accountController.js');

const accountRouter = express.Router();

// get User Balance route:
accountRouter.get('/balance', authMiddleware, handleAccountBalance);

// Transfer route
accountRouter.post('/transfer', authMiddleware, handleMoneyTransfer);

module.exports = accountRouter;