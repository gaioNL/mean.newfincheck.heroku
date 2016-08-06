'use strict';

//import {Router} from 'express';
var express = require('express');
var Router = express.Router;

//import * as controller from './user.controller';
var controller = require('./user.controller');

//import * as auth from '../../auth/auth.service';
auth = require();

var router = new Router('../../auth/auth.service');

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
