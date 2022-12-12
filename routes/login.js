const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
mongoose.connect("mongodb://localhost/USERDBMONGOOSE");
const bodyparser = require("body-parser");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "RESTAPIAUTH";



const router = express.Router();

router.use(bodyparser.json());

router.post("/register",
    // username must be an email
    body('email').isEmail(),
    body('name').isAlpha(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6, max: 16 }), async (req, res) => {
        // 1. Check whether users already exists or not
        // 2. USers exists. Send message like user already there
        // 3. New user then create it
        try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(409).json({
                    status: "Failed",
                    message: "User already exists with the given email"
                })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err.message
                    })
                }

                user = await User.create({
                    name: name,
                    email: email,
                    password: hash
                });

                res.json({
                    status: "Success",
                    message: "User succesfully created",
                    user
                })
            });

        } catch (e) {
            res.json({
                status: "Failed",
                message: e.message
            })
        }
    });

router.post("/login",
    // username must be an email
    body('email').isEmail(),
    async (req, res) => {
        try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // 1. Firt check whether there is an account with the given email
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(409).json({
                    status: "Failed",
                    message: "There is no account with the entered email"
                })
            }
            // If user already there then compare the pasword 
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                if(result){
                    // Create a token after login 
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                      }, secret);



                    return res.json({
                        status: "Success",
                        message: "Login Succesful",
                        token
                    })
                }else {
                    return res.status(401).json({
                        status: "Failed",
                        message: "Invalid credentials"
                    })
                }

            });

        } catch (e) {
            res.json({
                status: "Failed",
                message: e.message
            })
        }
    });

module.exports = router;