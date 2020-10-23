"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: {
    type: String,
  },
  referenceCount: {
    type: Number,
    default: 0
  },
  parameters: [
    { type: String }
  ],
  createDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false, autoIndex: true });

module.exports = urlSchema