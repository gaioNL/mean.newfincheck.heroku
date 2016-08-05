/**
 * Express configuration
 */

'use strict';

//import express from 'express';
var express = require('express');
//import favicon from 'serve-favicon';
var favicon = require('serve-favicon');
//import morgan from 'morgan';
var morgan=require('morgan');
//import compression from 'compression';
var compression = require('compression');
//import bodyParser from 'body-parser';
var bodyParser = require('body-parser');
//import methodOverride from 'method-override';
var methodOverride = require('method-override');
//import cookieParser from 'cookie-parser';
var cookieParser = require('cookie-parser');
//import errorHandler from 'errorhandler';
var errorHandler = require('errorhandler');
//import path from 'path';
var path = require('path');
//import lusca from 'lusca';
var lusca = require('lusca');
//import config from './environment';
var config = require('./environment');
//import passport from 'passport';
var passport = require('passport');
//import session from 'express-session';
var session = require('express-session');
//import connectMongo from 'connect-mongo';
var connectMongo = require('connect-mongo');
//import mongoose from 'mongoose';
var mongoose = require('mongoose');

var MongoStore = connectMongo(session);

module.exports.default = function(app) {
  var env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'new-fin-copen'
    })
  }));

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if (env !== 'test' && !process.env.SAUCE_USERNAME) {
    app.use(lusca({
      csrf: {
        angular: true
      },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  if ('development' === env) {
    app.use(require('connect-livereload')({
      ignore: [
        /^\/api\/(.*)/,
        /\.js(\?.*)?$/, /\.css(\?.*)?$/, /\.svg(\?.*)?$/, /\.ico(\?.*)?$/, /\.woff(\?.*)?$/,
        /\.png(\?.*)?$/, /\.jpg(\?.*)?$/, /\.jpeg(\?.*)?$/, /\.gif(\?.*)?$/, /\.pdf(\?.*)?$/
      ]
    }));
  }

  if ('development' === env || 'test' === env) {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
