'use strict';

//import passport from 'passport';
var passport = require('passport');
//import config from '../config/environment';
var config = require('../config/environment');
//import jwt from 'jsonwebtoken';
var jwt = require('jsonwebtoken');
//import expressJwt from 'express-jwt';
var expressJwt = require('express-jwt');
//import compose from 'composable-middleware';
var compose = require('composable-middleware');
//import User from '../api/user/user.model';
var User = require('../api/user/user.model');

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
module.exports.isAuthenticated= function() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
module.exports.hasRole= function(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
module.exports.signToken =function(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
module.exports.setTokenCookie = function(req, res) {

  if (!req.user) { 
      return res.json(404, { message: 'Something went wrong, please try again.'}); 
  }

  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));

  // return the user to the request page (oAuth) or homepage
  if (typeof req.cookies.returnUrl != 'undefined')
  {
      res.redirect(req.cookies.returnUrl.replace(/"/g, "") || '/');
  }
  else
  {
      res.redirect('/');
  }

//ORIGINAL
//  if (!req.user) {
 //   return res.status(404).send('It looks like you aren\'t logged in, please try again.');
//  }
//  var token = signToken(req.user._id, req.user.role);
//  res.cookie('token', token);
//  res.redirect('/');


}
