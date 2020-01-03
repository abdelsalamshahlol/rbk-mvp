var express = require('express');
var router = express.Router();
const aut = require('./auth');
const users = require('../models/Users');
require('../config/passport');
const mongoose = require('mongoose');
const passport = require('passport');

/* GET users listing. */
router.get('/', aut.required, function (req, res, next) {
  res.send('respond with a resource');
});

// Sign up
router.get('/sign-up', function (req, res) {
  // res.render('signup');
  res.end('serve static')
});

router.post('/sign-up', function (req, res) {
  let {body: {email, password}} = req;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
// doesn't make any sense to me refactor the whole structure
  let userModel = mongoose.model('Users');
  const {hash, salt} = new userModel().setPassword(password);

  let user = new users({email, hash, salt});
  user.save()
      .then(result => {
        return res.json({user: user.toAuthJSON()});
      }).catch(err => {
    return res.json(err);
  });
});

router.post('/login', aut.optional, function (req, res, next) {
  let {body: {email, password}} = req;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  return passport.authenticate('local-strategy', {session: false}, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({user: user.toAuthJSON()});
    }
    // return res.end('444dfd')
    return res.status(400).send(info);
  })(req, res, next);
});

module.exports = router;
