/**
 * Main application file
 */

'use strict';

//import express from 'express';
var express = require('express');
//import mongoose from 'mongoose';
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//import config from './config/environment';
var config = require('./config/environment');
//import http from 'http';
var http = require('http');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  //serveClient: config.env !== 'production',
  serveClient: true,
  path: '/socket.io-client'
});

//Claudio http://stackoverflow.com/questions/26217312/socket-io-and-multiple-dynos-on-heroku-node-js-app-websocket-is-closed-before
socketio.set('transports', ['websocket']);


require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
