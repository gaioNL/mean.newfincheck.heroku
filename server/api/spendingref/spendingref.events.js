/**
 * Spendingref model events
 */

'use strict';

//import {EventEmitter} from 'events';
var tmpEvents = require('events');
//old 
//var SpendingrefEvents = new EventEmitter();
//var EventEmitter = tmpEvents.EventEmitter;
//new
var SpendingrefEvents = new tmpEvents.EventEmitter();

//import Spendingref from './spendingref.model';
var Spendingref = require('./spendingref.model');

// Set max event listeners (0 == unlimited)
SpendingrefEvents.setMaxListeners(0);

// Model events
var events = {
  'find':'find',
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  console.log("event %0",event);
  Spendingref.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
  	console.log("passa doc.id " + doc._id );
    SpendingrefEvents.emit(event + ':' + doc._id, doc);
    SpendingrefEvents.emit(event, doc);
  }
}

module.exports.default = SpendingrefEvents;