const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const ConnectDB = require('./config/dbconnect');
const rootRouter = require('./routes/index');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Connect to MongoDB
ConnectDB();

// Middlewares:
app.use(cors());
app.use(express.json());

// Router:
app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});