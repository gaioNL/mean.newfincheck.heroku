/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/spendingrefs              ->  index
 * POST    /api/spendingrefs              ->  create
 * GET     /api/spendingrefs/:id          ->  show
 * PUT     /api/spendingrefs/:id          ->  update
 * DELETE  /api/spendingrefs/:id          ->  destroy
 */

'use strict';

//import _ from 'lodash';
var _ = require('lodash');

//import Spendingref from './spendingref.model';
var Spendingref = require('./spendingref.model'); 

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

//ORIGINAL: Gets a list of Spendingrefs
module.exports.index= function(req, res) {
  return Spendingref.find(req.query).exec()
   .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Spendingref from the DB
module.exports.show = function(req, res) {
  return Spendingref.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Spendingref in the DB
module.exports.create =  function(req, res) {
  return Spendingref.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Spendingref in the DB
module.exports..update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Spendingref.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Spendingref from the DB
module.exports.destroy = function(req, res) {
  return Spendingref.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
