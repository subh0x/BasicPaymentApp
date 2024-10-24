const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

async function ConnectDB() {
    try {
        await mongoose.connect(MONGO_URL).then(() => {
            console.log('MongoDB connection established.');
        });
    }
    catch (err) {
        console.log(err.message);
    }
};

module.exports = ConnectDB;