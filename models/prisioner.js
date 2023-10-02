'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var CellSchema = Schema({
    name: String,
    sector: String
});

var PrisionerSchema = Schema({
    name: String,
    surname: String,
    age: String,
    race: String,
    country: String,
    province: String,
    imageOne: String,
    imageTwo: String,
    locality: String,
    dni: String,
    arrests: String,
    date: { type: Date, default: Date.now},
    cell: [CellSchema],
});

PrisionerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Prisioner',PrisionerSchema);