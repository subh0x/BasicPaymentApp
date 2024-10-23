import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
}, { timestamps: true });

const User = new mongoose.model("user", userSchema);

module.exports = User;
