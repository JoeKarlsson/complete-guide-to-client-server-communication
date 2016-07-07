'use strict';

var express = require('express');
var app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/api', function(req, res){
  res.send((new Date()).toLocaleTimeString());
});

app.listen(3000);