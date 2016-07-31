'use strict';

const r                   = require('rethinkdb');
const db                  = require('../db');


module.exports = (req, res) => {

    r.table('meta')
    .get('lastUpdate')
    .run(db.conn)
    .then(lastUpdate => res.json({
        status: 'ok',
        content: { timestamp: lastUpdate.timestamp }
    }))
    .catch((err) => {

      console.log(err.message);
      console.log(err.stack);

      res.json({
        status: 'error',
        error: { message: err.message }
      });
    });
};
