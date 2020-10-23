const mongoose = require('mongoose');
const UrlSchema = require('./mongoUrlSchema');

module.exports = mongoose.model('UrlSchemas', UrlSchema);