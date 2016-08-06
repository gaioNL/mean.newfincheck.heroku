'use strict';

//import mongoose from 'mongoose';
var mongoose = require('mongoose');

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports.default = mongoose.model('Thing', ThingSchema);
