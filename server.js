const mongoose = require('mongoose');
const env = require('./config/dev');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoSave = require('./src/engine/urlParserEngine');

var app = express();
var server = http.createServer(app);
var route = require('./src/Routers/routing');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

mongoose.Promise = global.Promise;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(env.mongoConnectionString, option, (err) => {
  if (err) {
    console.error(err.stack);
    process.exit(1)
  } else {
    console.log('Connected!!!');
  }
});

app.use('/crawl', route);
// app.get('/getData', (req, res) => {
//   console.log('We are building it, please wait');
//   res.send({
//     'data': "emtpy"
//   })
// });

app.post('/post', async (req, res) => {
  await mongoSave();
  res.send('successfull');
});

app.set('port', (env.port || 80));

server.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
});
