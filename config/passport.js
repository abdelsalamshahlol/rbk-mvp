const mongoose = require('mongoose');
const passport = require('passport');
const PassportLocal = require('passport-local');

const Users = mongoose.model('Users');

passport.use('local-strategy', new PassportLocal({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    Users.findOne({email})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }

            return done(null, user);
        }).catch(done);
}));