import express from 'express';
import userRouter from './user';
import accountRouter from './account';
import transactionRouter from './transaction';

const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/transaction', transactionRouter);

module.exports = router;