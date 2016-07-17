/**
 * Spendingref model events
 */

'use strict';

import {EventEmitter} from 'events';
import Spendingref from './spendingref.model';
var SpendingrefEvents = new EventEmitter();

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
  Spendingref.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SpendingrefEvents.emit(event + ':' + doc._id, doc);
    SpendingrefEvents.emit(event, doc);
  }
}

export default SpendingrefEvents;
