
const util  = require('util');
const r     = require('rethinkdb');
const db    = require('./db');
const day   = {};

day.check = (newDay) => {

  if(typeof newDay.date !== 'string'){
    throw new Error('`date` property is not a string');
  }

  if( !util.isObject(newDay.snapshots) ){
    throw new Error('`snapshots` property is not an Object');
  }
};


day.add = (newDay) => {

  day.check(newDay);

  return r
  .table('aiani')
  .insert(newDay, { conflict: 'update' })
  .run(db.conn);
};


day.get = (date) => {

  return r
  .table('aiani')
  .get(date)
  .run(db.conn);
};

day.getAvailable = () => {

  return r
  .table('aiani')
  .pluck('date')
  .run(db.conn);
};


module.exports = day;
