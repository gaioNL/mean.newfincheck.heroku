/**
 * Broadcast updates to client when the model changes
 */

'use strict';

//import SpendingrefEvents from './spendingref.events';
var SpendingrefEvents = require('./spendingref.events');
// Model events to emit
var events = ['find','save', 'remove'];

module.exports.register= function(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('spendingref:' + event, socket);
    console.log("SpendingrefEvents registered " +event);

    SpendingrefEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    SpendingrefEvents.removeListener(event, listener);
  };
}
