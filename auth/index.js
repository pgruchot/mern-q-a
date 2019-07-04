const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

router.get('/user', (req, res) => {
    console.log('---- user ----');
    console.log(req.user);
    if(req.user) {
        return res.json({ user: req.user });
    } else {
        return res.json({ user: null });
    }
});

router.post(
    '/login', (req, res, next) => {
        const { errors, isValid } = validateLoginInput(req.body);
        if(!isValid) {
            return res.json({'errors': errors});
        } else {
            return next();
        }
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('POST to /login');
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        if(cleanUser.local) {
            delete cleanUser.local.password;
        }
        res.json({ user: cleanUser });
    }
);

router.post('/logout', (req, res) => {
    if(req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid');
        return res.json({ 'errors': '' });
    } else {
        return res.json({ 'errors': { user: 'No user to logout' } });
    }
});

router.post('/signup', (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);
    if(!isValid) {
        return res.json({'errors': errors});
    }
    const { username, email, password, password2 } = req.body;
    //validation needed here
    User.findOne({ 'local.username': username }, (err, userMatch) => {
        if(err) {
            console.log(err);
        }
        if(userMatch) {
            return res.json({
                errors: `Sorry, we already have one of you ${username} in here`
            });
        }
        const newUser = new User()
            newUser.email = email;
            newUser.local.username = username;
            newUser.local.password = newUser.hashPassword(password);

        newUser.save((err, savedUser) => {
            if(err) 
                return res.json({ 'errors': { db: 'error while saving to db'} });
            return res.json({ errors: '' });
        });
    });
})

module.exports = router;