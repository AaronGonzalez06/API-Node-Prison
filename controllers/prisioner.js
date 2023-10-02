'use strict'

const validator = require('validator');
const Prisioner = require('../models/prisioner');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');

let controller = {

    addPrisioner: function(req,res){
        let params = req.body; 
        let name = !validator.isEmpty(params.name);
        let surname = !validator.isEmpty(params.surname);
        let age = !validator.isEmpty(params.age);
        let race = !validator.isEmpty(params.race);
        let country = !validator.isEmpty(params.country);
        let province = !validator.isEmpty(params.province);
        let locality = !validator.isEmpty(params.locality);
        let dni = !validator.isEmpty(params.dni);
        let arrests = !validator.isEmpty(params.arrests);
        if(name && surname && age && race && country && province && locality && dni && arrests){                            
            Prisioner.findOne({dni: params.dni})
                .exec()
                .then((dniExist) => {
                    if (dniExist) {
                        return res.status(200).send({
                            message: "Prisioner exist"
                        });
                    } else {
                        let prisioner = new Prisioner();
                        prisioner.name = params.name;
                        prisioner.surname = params.surname;
                        prisioner.age = params.age;
                        prisioner.race = params.race;
                        prisioner.country = params.country;
                        prisioner.province = params.province;
                        prisioner.locality = params.locality;
                        prisioner.dni = params.dni;
                        prisioner.arrests = params.arrests;
                        prisioner.save()
                        .then(prisionerStored => {
                            let valor = {
                                message: "New prisioner.",
                                prisioner: prisioner
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
                    console.error('Error:', err);
                });
        }
    },

    listPrisioner: function(req,res){
        let page;
        if (typeof req.params.num === 'undefined') {
            page = 1;
        }else{
            page = req.params.num;
        }        
        const options = {
            limit: 5,
            page: page        
        };

        Prisioner.paginate({},options, (err,prisioner) => {

            return res.status(200).send({
                prisioner: prisioner.docs,
                totalprisioner: prisioner.totalDocs,
                totalPages: prisioner.totalPages
            });
        });
    },

    updatePrisioner: async function(req,res){
        const id = req.params.id;
                const prisioner = await Prisioner.findOne({_id: id}).exec();
                if(prisioner){
                    var sum = parseInt(prisioner.arrests) + 1;
                }   
                
                let change = {
                    arrests: sum
                };
            
            const update = await Prisioner.findOneAndUpdate({_id: id},change,{new:true}).exec();
            if(update){
                return res.status(200).send({
                    message: "Prisioner update",
                    prisioner: update
                  });
            } else{
                return res.status(400).send({
                    message: "Error al actualizar"
                  });
            }     
    },

    searchDniPrisoner: async function(req,res){
        const dni = req.params.dni;
                const prisioner = await Prisioner.findOne({dni: dni}).exec();
                if(prisioner){
                    return res.status(200).send({
                        message: "Prisioner",
                        prisioner: prisioner
                      });
                } else{
                    return res.status(400).send({
                        message: "Prisioner not search"
                      });
                }                   
    },

    addCellPrisioner: async function(req,res){
            const dni = req.params.dni;
                const prisioner = await Prisioner.findOne({dni: dni}).exec();
                if(prisioner){
                    const cell = {
                        name: req.body.name,
                        sector: req.body.sector
                    }
                    prisioner.cell.push(cell);
                    prisioner.save()
                             .then(prisionerUpdate => {
                                let valor = {
                                    message: "Prisioner cell.",
                                    prisioner: prisionerUpdate
                                }                        
                                return res.status(200).send(valor);
                            })
                             .catch((err) => {
                                return res.status(400).send({
                                    message: "Error"
                                });
                            });

                } else{
                    return res.status(400).send({
                        message: "Prisioner not search"
                    });
                }                   
    },

    imgPrisioner: async function(req,res){
        if(req.files.file0 && req.files.file1){
            const file_path_img1 = req.files.file0.path;
            const file_path_img2 = req.files.file1.path;

            const file_split_img1 = file_path_img1.split('\\');
            const file_split_img2 = file_path_img2.split('\\');

            const name_file_img1 = file_split_img1[2];
            const name_file_img2 = file_split_img2[2];

            const ext_img1_split = name_file_img1.split('\.');
            const ext_img2_split = name_file_img2.split('\.');

            const ext_fil0 = ext_img1_split[1];
            const ext_fil1 = ext_img2_split[1];

            if (!['png', 'jpg', 'PNG'].includes(ext_fil1) && !['png', 'jpg', 'PNG'].includes(ext_fil0)) {
                return res.status(400).send({
                  message: "Formato no válido"
                });
              }

            const update = await Prisioner.findOneAndUpdate({dni: req.body.dni},{imageOne: name_file_img1, imageTwo: name_file_img2},{new:true}).exec();

            if(update){
                return res.status(200).send({
                    message: "Prisioner update",
                    prisioner: update
                  });
            } else{
                return res.status(400).send({
                    message: "Error al actualizar"
                  });
            }     


        }else{
            return res.status(400).send({
                message: "Faltan datos"
            });
        }
    }
}

module.exports = controller;