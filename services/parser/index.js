'use strict';

const express             = require('express');
const morgan              = require('morgan');
const prettyMs            = require('pretty-ms');
const parseBody           = require('./parseBody');
const parseJSONPayload    = require('./parseJSONPayload');
const app                 = express();
const PORT                = 9009;



app.use( morgan('dev') );

app.post('/parse', function(req, res, next){

  let body = '';

  req.setEncoding('utf8');

  req
  .on('data', function(chunk){
    body += chunk;
  });

  req
  .on('end', function(chunk){

    body += chunk;

    let start = Date.now();
    let parsedData = parseBody(body);
    let ellapsed = Date.now() - start;
    console.log(`it took ${prettyMs(ellapsed)}`);

    let filteredData = parseJSONPayload(parsedData, wantedKeys);

    res.json(filteredData);
  });

  req
  .on('error', function(err){
    res.end('ERROR', err.message);
  });

});

app.listen(PORT);
console.log(`app listening on ${PORT}...`);
