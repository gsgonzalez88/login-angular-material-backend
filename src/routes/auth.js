const { User } = require('../model/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    const { error } = validate(req.body);
    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    
    res.send(true);
});

function validate(req){
    const schema = {        
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router;