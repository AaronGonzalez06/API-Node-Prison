'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 40000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/prison', { useNewUrlParser: true })
        .then(() => {
            console.log("conexión realizada");

            //crear el servidor
            app.listen(port, () => {
                console.log("El servidor esta funcionando ");
            })
        })
        .catch(error => console.log(error));