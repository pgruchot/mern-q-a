const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const keys = require('./config/keys');
const passport = require('./passport');
const session = require('express-session')

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use(helmet());
server.use(morgan('combined'));




server.use(session({
    secret: keys.sessionSecret.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1*60*60*1000 },
}));

server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', require('./auth'));
server.use('/questions', require('./questions'));

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

