const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Account = new mongoose.model("Account", accountSchema);

module.exports = Account;
