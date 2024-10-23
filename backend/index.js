import express from 'express';
import cors from 'cors';
import ConnectDB from './config/dbconnection';
import rootRouter from './routes/index';

const PORT = 3000;
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