'use strict';

//import express from 'express';
var express = require('express');
//import passport from 'passport';
var passport = require('passport');
//import config from '../config/environment';
var config = require('../config/environment');
//import User from '../api/user/user.model';
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./google/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);
router.use('/google', require('./google').default);

module.exports.default = router;
