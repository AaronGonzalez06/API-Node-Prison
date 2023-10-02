'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var CellSchema = Schema({
    name: String,
    sector: String
});

CellSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('cell',CellSchema);