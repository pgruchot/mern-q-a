const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const keys = require('./config/keys');
//const passport = require('passport');

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(helmet());
server.use(morgan('combined'));

server.use('/api', require('./api'));

mongoose.connect(keys.mongoDB.dbURI, { useNewUrlParser: true })
    .then(
        () => {
            console.log('Connected do db :)');
        }
    ).catch(err => {
        console.log('Cant connect to db :(')
        console.log(err);
    });

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

