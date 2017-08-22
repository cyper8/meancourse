const IP=process.env.IP||"127.0.0.1";
const PORT=process.env.PORT||3000;
const ROOT_URL='https://'+(process.env.C9_HOSTNAME?process.env.C9_HOSTNAME:("localhost:"+PORT));

var staticMaxAge = 1000;//4*60*60*1000;

var express = require('express');
var wagner = require('wagner-core');

require('./libs')(wagner);
require('./models/')(wagner,'mongodb://localhost:27017/app');

var app = express();
app.use(require("helmet")());

wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./apis/')(wagner));

app.use(express.static('frontend/styles', {maxAge: staticMaxAge}));
app.use(express.static('frontend/js', {maxAge: staticMaxAge}));
app.use(express.static('frontend/templates', {maxAge: staticMaxAge}));

app.listen(PORT,IP);
console.log('Listening on '+ROOT_URL);
