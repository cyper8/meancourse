const IP=process.env.IP;
const PORT=process.env.PORT;
const ROOT_URL='https://'+IP+':'+PORT;

var express = require('express');
var wagner = require('wagner-core');
var cookieParser = require("cookie-parser");
var csrf = require("csurf");

require('./models/')(wagner,'mongodb://localhost:27017/app');

var app = express();
app.use(require("helmet")());

// temporary patch instead of login api
app.use(wagner.invoke(function(User) {
  return function(req, res, next) {
    User.findOne({}, function(error, user) { req.user = user; next(); });
  };
}));

app.use('/api/v1', require('./apis/')(wagner));
app.use(cookieParser());
app.use(csrf({cookie: true}));

// for uuid: function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}

app.listen(PORT,IP);
console.log('Listening on '+ROOT_URL);
