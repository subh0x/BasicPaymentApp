import { z } from "zod";
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = require('../config/config');

const userRouter = express.Router();

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
        const userExists = User.findOne({ email: email });
        if (userExists) {
            return res.status(409).send({ message: "Email already exists!" });
        }

        // Hash the password before saving it:
        const hashedPassword = await bcrypt.hash(password, 10);

        // If Valid New user Update/Add it to the DB.:
        const newUser = await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: newUser._id, email: email }, JWT_SECRET);

        return res.status(200).send({
            message: "User created successfully!",
            userId: newUser._id,
            token: token
        });

    }
    catch (err) {
        return res.status(500).send({ message: err.message });
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
        const hashedPassword = await bcrypt.hash(password, 10);

        const userDetails = await User.findOne({ email: email, password: hashedPassword });
        if (!userDetails) {
            return res.status(404).send({ Message: "Please enter correct user details." });
        }

        const token = jwt.sign({ userId: userDetails._id, email: email }, JWT_SECRET);

        return res.status(200).send({
            token: token
        });

    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

module.exports = userRouter;

