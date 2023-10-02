'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    dni: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User',UserSchema);