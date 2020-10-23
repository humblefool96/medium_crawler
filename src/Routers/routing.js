'use strict'
var express = require('express');
var app = express()
var urlParser = require('../engine/urlParserEngine');
var analyticsData = require('../api/analyticData');

app.use('/getAnalytic', analyticsData.getUrls);
app.use('/start', urlParser);

module.exports = app;