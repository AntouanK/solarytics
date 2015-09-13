
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

  Object.keys(newDay.snapshots)
  .map(key => { return newDay.snapshots[key]; })
  .forEach(snapshot => {
    if( !Array.isArray(snapshot.data) ){
      throw new Error('.data of asnapshot must be an Array');
    }

    if(typeof snapshot.time !== 'string'){
      throw new Error('.time of asnapshot must be a string');
    }
  });
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
  .run(db.conn)
  .then((cursor) => {
    return cursor.toArray();
  })
  .then((list) => {
    return list.map(listObj => { return listObj.date; });
  });
};


module.exports = day;
