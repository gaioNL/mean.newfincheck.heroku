'use strict';

//import express from 'express';
var express = require('express');
//import passport from 'passport';
var passport = require('passport');

//import {setTokenCookie} from '../auth.service';
var authservice = require('../auth.service');
var setTokenCookie = authservice.setTokenCookie;


var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'profile',
      'email'
    ],
    session: false
  }))
  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie);

module.exports.default =router;
