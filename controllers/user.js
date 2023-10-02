'use strict'

let validator = require('validator');
let User = require('../models/user');
//const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');


let controller = {

    probando: function(req,res){
        return res.status(200).send({
            message: "probando metodo"
        });
    },
    save: function(req,res){
        let params = req.body; 
        let name = !validator.isEmpty(params.name);
        let surname = !validator.isEmpty(params.surname);
        let dni = !validator.isEmpty(params.dni);
        let email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        let password = !validator.isEmpty(params.password);
        let role = !validator.isEmpty(params.role);
        if(name && surname &&dni && email && password && role){                            
                User.findOne({email: params.email})
                .exec()
                .then((usuarioEncontrado) => {
                    if (usuarioEncontrado) {
                        return res.status(200).send({
                            message: "Usuario existente"
                        });
                    } else {
                        let user = new User();
                        user.name = params.name;
                        user.surname = params.surname;
                        user.email = params.email;
                        user.role = params.role;
                        user.dni = params.dni;
                        user.password = params.password;
                        user.save()
                        .then(userStored => {
                            let valor = {
                                message: "New user.",
                                user: user
                            }
                    
                            return res.status(200).send(valor);
                        })
                        .catch(err => {
                            valor = {
                                message: err.message
                            };
                        });
                        
                    }
                })
                .catch((err) => {
                    console.error('Error al buscar usuario:', err);
                });                                   

        }
         
    },

    login: function (req,res) {
        var params = req.body;

        let password = !validator.isEmpty(params.password);
        let email = !validator.isEmpty(params.email) && validator.isEmail(params.email);

        if(password && email){
            User.findOne({ email: params.email }).exec()
            .then((usuarioEncontrado) => {
                if (usuarioEncontrado && (params.password == usuarioEncontrado.password)) {
                    usuarioEncontrado.password = undefined;
                  return res.status(200).send({
                    user: jwt.createToken(usuarioEncontrado)
                  });
                  
                } else {
                    return res.status(400).send({
                        message: "Email o contraseña no validas"
                      });
                }
              })
              .catch((error) => {
                console.error('Error al buscar el usuario:', error);
              });
        }        
    },

    update: async function(req,res){
        let params = req.body; 
        let name = !validator.isEmpty(params.name);
        let surname = !validator.isEmpty(params.surname);
        let email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        if(name && surname && email){

            if(req.user.email != params.email){
                const emailRepit = await User.findOne({email: params.email}).exec();
                if(emailRepit){
                    return res.status(200).send({
                        message: "Email no disponible"
                    });
                }
            }
            
            const update = await User.findOneAndUpdate({_id: req.user.sub},params,{new:true}).exec();
            if(update){
                return res.status(200).send({
                    message: "User update",
                    user: update
                  });
            } else{
                return res.status(400).send({
                    message: "Error al actualizar"
                  });
            }         
        }
    }



}

module.exports = controller;