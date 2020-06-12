const Joi = require('joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024        
    }
}).plugin(uniqueValidator));

//use of Joi library to validate the user information.
function validateUser(User){
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        lastname: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;