const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//passport local strategy, email also has to be unique
const strategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({ 'local.username': username }, (err, userMatch) => {
            if(err) {
                return done(err);
            };
            if(!userMatch) {
                return done(null, false, { message: 'Incorrect username' });
            };
            if(!userMatch.checkPassword(password, userMatch.local.password)) {
                return done(null, false, { message: 'Incorrect password' });
            };
            return done(null, userMatch);
        })
    }
)

module.exports = strategy;