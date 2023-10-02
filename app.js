'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const user_routes = require('./routes/user');
const cell_routes = require('./routes/cell');
const prisioner_routes = require('./routes/prisioner');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',user_routes);
app.use('/api',cell_routes);
app.use('/api',prisioner_routes);
//exportar modulo
module.exports = app;