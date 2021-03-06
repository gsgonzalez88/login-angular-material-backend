const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { User, validate } = require('../model/user')

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body), ['name', 'email', 'password']);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    
    res.send(_.pick(user,['name', 'email']));
})

router.post('/signup', (req, res, next) => {
    const  user = new User({
        email: req.body.email,
        password: req.body.password
    })
})

router.post('/signin', (req, res, next) => {
    //check if the email exist
    if(req.body.email === "test@test.com"){
        if(req.body.password === "1234"){
            return res.status(401).json({
                message: "auth success"
            })
        }
    }
})

module.exports = router;