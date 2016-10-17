const IP=process.env.IP;
const PORT=process.env.PORT;
const ROOT_URL='https://'+IP+':'+PORT;

var express = require('express');
var wagner = require('wagner-core');

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

app.listen(PORT,IP);
console.log('Listening on '+ROOT_URL);
