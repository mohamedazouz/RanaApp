'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  title: {
  	type: String,
  	required: true
  },
  description: {
  	type: String,
  	required: true
  },
  time: {
  	type: Date,
  	default: Date.now
  },
  author: {
  	type: String,
  	default: 'Mohamed'
  },
  place: {
    type: String
  },
  people: {
    type: String
  }
});

export default mongoose.model('Note', ThingSchema);
