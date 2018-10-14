const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Config = require('../config/db');


router.post('/signup', (req, res) => {
    const { email, password } = req.body;

    const newUser = new User({
        email: email,
        password: password
    })
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.json({
                message: 'Email already Exists'
            })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.log("Error during generating salt");
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log("Error during hashing password");
                        else {
                            newUser.password = hash;
                            console.log(newUser);

                            newUser.save()
                                .then(user => {
                                    res.send({
                                        user: user
                                    })
                                })
                                .catch(error => {
                                    res.json({
                                        message: 'Error during registration'
                                    })
                                })
                        }

                    })

                }
            })

        }
    })



})

router.post('/signin', (req, res) => {
    console.log("this is from server", req.body);

    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            console.log("user: ", user);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            console.log(user);

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            email: user.email
                        }
                        jwt.sign(payload, Config.secretKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) console.log("Error during login in jwt");
                            else {
                                console.log("after login success");

                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                })
                            }

                        })
                    }
                })
        })

})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
        message: 'This is from me'
    })
})

module.exports = router;