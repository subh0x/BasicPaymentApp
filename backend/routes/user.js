const { z } = require('zod');
const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const Account = require('../models/accountModel.js');
const authMiddleware = require('../middlewares/middleware.js');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const userRouter = express.Router();

// TODO: Create Controllers for handling each route

// Input Validation Schema:
const userSignUpValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

const userSignInValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
});

const userDataUpdateSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }).optional(),
});

// User signup Route:
userRouter.post('/signup', async (req, res) => {
    try {
        const { email, firstname, lastname, password } = req.body;

        // Input Validation:
        const validData = userSignUpValidationSchema.safeParse(req.body);
        if (!validData.success) {
            return res.status(400).send({ errorMessage: validData.error });
        }

        // Check if the email already exists in the DB or not:
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(409).send({ message: "Email already exists!" });
        }

        // If Valid New user Update/Add it to the DB.:
        const newUser = await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        });

        const newUserId = newUser._id;

        // TODO: Handle account creation errors
        await Account.create({
            userId: newUserId,
            balance: (1 + Math.random()*10000) // Initialize users with Random Balance Between 1-10000
        })

        const token = jwt.sign({ userId: newUserId }, JWT_SECRET);

        return res.status(200).send({
            message: "User created successfully!",
            userId: newUser._id,
            token: token
        });

    }
    catch (err) {
        return res.status(500).send({ errorMessage: err.message });
    }
});

// User signin Route:
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input Validation:
        const validData = userSignInValidationSchema.safeParse(req.body);
        if (!validData.success) {
            return res.status(404).send({ errorMessage: validData.error });
        }

        const userDetails = await User.findOne({ email: email, password: password });
        if (!userDetails) {
            return res.status(404).send({ Message: "Please enter correct user details." });
        }

        const token = jwt.sign({ userId: userDetails._id }, JWT_SECRET);

        return res.status(200).send({
            token: token
        });

    }
    catch (err) {
        return res.status(400).send({ errorMessage: err.message });
    }
});

// Update user details route
userRouter.put('/', authMiddleware, async (req, res) => {
    try {
        const validData = userDataUpdateSchema.safeParse(req.body);

        if (!validData.success) {
            return res.status(404).send({ errorMessage: validData.error });
        }

        const detailsUpdated = await User.findOneAndUpdate({ _id: req.userId }, req.body);

        if (detailsUpdated) {
            return res.send({ message: "User details updated successfully." });
        }
    }
    catch (err) {
        return res.status(400).send({ errorMessage: err.message });
    }
});

// Search user route:
userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    console.log(filter);
    const matchedUsers = await User.find({
        $or: [
            { firstname: { $regex: filter, $options: 'i' } },  // Case-insensitive regex
            { lastname: { $regex: filter, $options: 'i' } }    
        ]
    });
    
    console.log(matchedUsers);

    res.send({
        user: matchedUsers.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});


module.exports = userRouter;

