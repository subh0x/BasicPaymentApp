const { z } = require('zod');
const express = require('express');
const Account = require('../models/accountModel.js');
const authMiddleware = require('../middlewares/middleware.js');

const accountRouter = express.Router();

// Input Validation:
const moneyTransferSchema = z.object({
    to: z.string(),
    amount: z.number()
})

// get User Balance route:
accountRouter.get('/balance', authMiddleware, async (req, res) => {
    try {
        const userAccount = await Account.findOne({ userId: req.userId });

        if (userAccount) {
            return res.status(200).send({ accountBalance: userAccount.balance });
        }
        else {
            return res.status(404).send({ message: "user account unavailable." });
        }

    } catch (err) {
        return res.send({ errorMessage: err.message });
    }
});

// Money Transfer route
accountRouter.get('/transfer', authMiddleware, async (req, res) => {
    try {

    }
    catch (err) {
        return res.send({ errorMessage: err.message });

    }
});

module.exports = accountRouter;