'use strict';

const r                   = require('rethinkdb');
const prettyMs            = require('pretty-ms');
const parseBody           = require('../parseBody');
const parseJsonPayload    = require('../parseJsonPayload');
const day                 = require('../day');
const db                  = require('../db');

const markParseUpdate = (dayObj) => r
  .table('meta')
  .insert(
    {
      id: 'lastUpdate',
      timestamp: Date.now()
    },
    { conflict: 'update' }
  )
  .run(db.conn);


module.exports = (req, res, next) => {

  let body = '';

  req.setEncoding('utf8');

  req
  .on('data', (chunk) => { body += chunk; });

  req
  .on('end', (chunk) => {

    if(chunk !== undefined){ body += chunk; }

    let start = Date.now();
    let parsedData = parseBody(body);

    parseJsonPayload(parsedData)
    .then(day.add)
    .then(dayObj => {

      let ellapsed = Date.now() - start;
      console.log(`it took ${prettyMs(ellapsed)}`);
      res.json({
        status: 'ok',
        message: `Day was saved at ${prettyMs(ellapsed)}`
      });

      return dayObj;
    })
    .then(markParseUpdate)
    .catch((err) => {

      console.log(err.message);
      console.log(err.stack);

      res.json({
        status: 'error',
        error: { message: err.message }
      });
    });
  });

  req
  .on('error', function(err){
    res.end('ERROR', err.message);
  });

};
