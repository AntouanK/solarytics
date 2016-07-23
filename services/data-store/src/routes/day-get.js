'use strict';

const day = require('../day');

module.exports = (req, res) => {

  day
  .get(req.params.date)
  .then((dateObj) => res
    .json({
      status: 'ok',
      content: dateObj
    })
  )
  .catch((err) => {

    console.log(err.message);
    console.log(err.stack);

    res.json({
      status: 'error',
      error: { message: err.message }
    });
  });
};
