'use strict';

import _ from 'lodash';
var Thing = require('./note.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
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

export function index(req, res) {
  Thing.find().sort({'time': -1})
    .then(responseWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
  Thing.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

export function show(req, res) {
  Thing.findByIdAsync(req.params.id)
    .then(responseWithResult(res))
    .catch(handleError(res));
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

// Updates an existing Thing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}