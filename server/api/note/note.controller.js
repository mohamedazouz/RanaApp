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


export function index(req, res) {
  Thing.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
  Thing.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}