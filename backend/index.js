const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const ConnectDB = require('./config/dbconnection');
const rootRouter = require('./routes/index');

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// Connect to MongoDB
ConnectDB(MONGO_URL);

// Middlewares:
app.use(cors());
app.use(express.json());

// Router:
app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});