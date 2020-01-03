const mongoose = require('mongoose');
const passport = require('passport');
const PassportLocal = require('passport-local');

const Users = mongoose.model('Users');

passport.use('local-strategy', new PassportLocal({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    console.log({email, password});
    Users.findOne({email})
        .then((user) => {
            const {salt, hash} = user;
            if (!user || !user.validatePassword(password, salt, hash)) {
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }

            return done(null, user);
        }).catch(done);
}));