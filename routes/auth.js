const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const {headers: {authorization}} = req;
    if (authorization && authorization.split(' ')[0] === 'token') { // Was Token and crashed the app
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'steveHarris',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'steveHarris',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;