const IP=process.env.IP;
const PORT=process.env.PORT;
const ROOT_URL='https://'+IP+':'+PORT;

var staticMaxAge = 4*60*60*1000;

var express = require('express');
var wagner = require('wagner-core');

require('./libs')(wagner);
require('./models/')(wagner,'mongodb://localhost:27017/app');

var app = express();
app.use(require("helmet")());

wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./apis/')(wagner));

app.use(express.static('controllers', {maxAge: staticMaxAge}));
app.use(express.static('views', {maxAge: staticMaxAge}));

app.listen(PORT,IP);
console.log('Listening on '+ROOT_URL);
