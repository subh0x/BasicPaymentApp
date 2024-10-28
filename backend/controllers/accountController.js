const { z } = require('zod');
const mongoose = require('mongoose');
const Account = require('../models/accountModel.js');

// Input Validation:
const moneyTransferSchema = z.object({
    to: z.string(),
    amount: z.number().min(0)
})

async function handleAccountBalance(req, res) {
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
}

async function handleMoneyTransfer(req, res) {
    try {
        const validData = moneyTransferSchema.safeParse(req.body);

        if (!validData.success) {
            return res.send({ message: "Invalid transaction data." });
        }

        const sourceUser = await Account.findOne({ userId: req.userId });
        const destUser = await Account.findOne({ userId: validData.data.to });

        // console.log(validData);
        // console.log(validData.data.to);
        // console.log(validData.data.amount);
        // console.log(destUser);

        if (!destUser) {
            return res.send({ message: "Invalid transaction destination." });
        }

        // Source user balance less than the transaction amount then return "Insufficient Balance for Transaction" message:
        if (sourceUser.balance < validData.data.amount) {
            return res.send({ message: "Insufficient Balance for Transaction" });
        }

        // Start Session:
        const transactionSession = await mongoose.startSession();
        await transactionSession.startTransaction();

        try {
            // Update Account Balance for Source
            await Account.updateOne(
                { userId: req.userId },
                { $inc: { balance: -validData.data.amount } },
                { session: transactionSession }
            );

            // Update Account Balance for Destination
            await Account.updateOne(
                { userId: validData.data.to },
                { $inc: { balance: +validData.data.amount } },
                { session: transactionSession }
            );

            await transactionSession.commitTransaction();
            await transactionSession.endSession();

            return res.send({ message: "Transfer successful." });
        } catch (err) {

            // Abort Transaction in case of error:
            await transactionSession.abortTransaction();
            await transactionSession.endSession();
            
            return res.send({ errorMessage: err.message });
        }
    }
    catch (err) {
        return res.send({ errorMessage: err.message });
    }
}

module.exports = {
    handleAccountBalance,
    handleMoneyTransfer
}