
const prettyMs            = require('pretty-ms');
const parseBody           = require('../parseBody');
const parseJSONPayload    = require('../parseJSONPayload');
const day                 = require('../day');


module.exports = (req, res, next) => {

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
    let dayObj = parseJSONPayload(parsedData);

    day.add(dayObj)
    .then(() => {

      let ellapsed = Date.now() - start;
      console.log(`it took ${prettyMs(ellapsed)}`);
      res.json({
        status: 'ok',
        message: `Day ${dayObj.date} was saved at ${prettyMs(ellapsed)}`
      });
    })
    .catch((err) => {
      res.json({
        status: 'error'
      });
    });
  });

  req
  .on('error', function(err){
    res.end('ERROR', err.message);
  });

};
