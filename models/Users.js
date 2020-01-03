const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('./index');
/**
 *  In order to consume this model
 *  Use new keyword
 */
const usersSchema = new mongoose.Schema({
    email: {type: String, required: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
});

usersSchema.methods.setPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return {
        salt,
        hash
    }
};

usersSchema.methods.validatePassword = (password, salt, hash) => {
    const calculatedHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return hash === calculatedHash;
};

usersSchema.methods.generateJWT = () => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'steveHarris');
};

usersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};
// mongoose.model('Users', usersSchema)
module.exports = mongoose.model('Users', usersSchema);