import { z } from "zod";
const express = require('express');
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
userRouter.post('/signup', (req, res) => {
    try {
        const { email, firstname, lastname, password } = req.body;

        // Input Validation:
        const validData = userSignUpValidationSchema.safeParse(email, firstname, lastname, password);
        
        if (!validData.success) {
            return res.status(404).send({ errorMessage: validData.error });
        }

        //TODO: Check if the email already exists in the DB or not:
        

        //TODO: If Valid New user Update/Add it to the DB.:


    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

// User Signin Route:
userRouter.post('/signin', (req, res) => {
    try {
        const { email, password } = req.body;

        // Input Validation:
        const validData = userSignInValidationSchema.safeParse(email, password);
        
        if (!validData.success) {
            return res.status(404).send({ errorMessage: validData.error });
        }
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

module.exports = userRouter;

