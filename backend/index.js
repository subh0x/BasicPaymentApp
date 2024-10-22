const express = require('express');
const rootRouter = require('./routes/index');
const cors = require('cors');


const PORT = 3000;
const app = express();

//TODO: 1. Setup DB Connection 2. Connect to MongoDB


// Middlewares:
app.use(cors());
app.use(express.json());

// Router:
app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});