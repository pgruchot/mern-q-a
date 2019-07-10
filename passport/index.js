const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user');

//serialize stuff
passport.serializeUser((user, done) => {
    console.log('---- serializing user ----');
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log('---- deserializing user ----');
    User.findOne(
        { _id: id },
        'firstName lastName email photos local.username',
        (err, user) => {
            done(null, user);
        }
    );
})

passport.use(LocalStrategy);
module.exports = passport;