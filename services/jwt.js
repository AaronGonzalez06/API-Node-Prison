'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function(user){

    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        dni: user.dni,
        email: user.email,
        role: user.role
    };

    return jwt.encode(payload, 'clave_aaron');
}