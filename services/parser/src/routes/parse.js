
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

    if(chunk !== undefined){
      body += chunk;
    }

    let start = Date.now();
    let parsedData = parseBody(body);

    parseJSONPayload(parsedData)
    .then((dayObj) => {
      return day.add(dayObj);
    })
    .then((dayObj) => {

      let ellapsed = Date.now() - start;
      console.log(`it took ${prettyMs(ellapsed)}`);
      res.json({
        status: 'ok',
        message: `Day was saved at ${prettyMs(ellapsed)}`
      });
    })
    .catch((err) => {

      console.log(err.message);
      console.log(err.stack);

      res.json({
        status: 'error',
        error: {
          message: err.message
        }
      });
    });
  });

  req
  .on('error', function(err){
    res.end('ERROR', err.message);
  });

};
