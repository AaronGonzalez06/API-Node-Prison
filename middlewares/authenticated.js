'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const clave = "clave_aaron";

exports.autenticated = function(req,res,next){

    if(!req.headers.authorization){
        return res.status(403).send({
            message: "No hay cabecera"
        });
    }

    try {
        const payload = jwt.decode(req.headers.authorization,clave);        
        req.user = payload;
    } catch (error) {
        return res.status(404).send({
            message: "Token no valido"
        });
    }    
    
    next();
}