const mongoose = require('mongoose');

async function ConnectDB(url) {
    try {
        await mongoose.connect(url).then(() => {
            console.log('MongoDB Connection Established.');
        });
    }
    catch (err) {
        console.log(err.message);
    }
};

module.exports = ConnectDB;