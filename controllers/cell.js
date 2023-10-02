'use strict'

const validator = require('validator');
const Cell = require('../models/cell');
const jwt = require('../services/jwt');

let controller = {

    addCell: function(req,res){
        let params = req.body; 
        let name = !validator.isEmpty(params.name);
        let sector = !validator.isEmpty(params.sector);
        if(name && sector){                            
                Cell.findOne({name: params.name})
                .exec()
                .then((nameExist) => {
                    if (nameExist) {
                        return res.status(200).send({
                            message: "name exist"
                        });
                    } else {
                        let cell = new Cell();
                        cell.name = params.name;
                        cell.sector = params.sector;
                        cell.save()
                        .then(cellStored => {
                            let valor = {
                                message: "New cell.",
                                cell: cell
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

    listCell: function(req,res){
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

        Cell.paginate({},options, (err,cells) => {

            return res.status(200).send({
                cells: cells.docs,
                totalcells: cells.totalDocs,
                totalPages: cells.totalPages
            });
        });
    },

    updateCell: async function(req,res){
            const id = req.params.id
            let params = req.body; 
            let name = !validator.isEmpty(params.name);
            let sector = !validator.isEmpty(params.sector);
            if(name && sector){
                    const cellRepit = await Cell.findOne({name: params.name}).exec();
                    if(cellRepit){
                        return res.status(200).send({
                            message: "Cell no disponible"
                        });
                    }            
                
                const update = await Cell.findOneAndUpdate({_id: id},params,{new:true}).exec();
                if(update){
                    return res.status(200).send({
                        message: "Cell update",
                        cell: update
                      });
                } else{
                    return res.status(400).send({
                        message: "Error al actualizar"
                      });
                }         
            }
    },

    searchSector: async function(req,res){
        const sector = req.params.sector;
                const cells = await Cell.find({sector: sector}).exec();
                if(cells){
                    return res.status(200).send({
                        message: "Cells",
                        cells: cells
                      });
                } else{
                    return res.status(400).send({
                        message: "Sector not search"
                      });
                }                   
    }
}

module.exports = controller;