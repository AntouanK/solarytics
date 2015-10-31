
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


day.getWh = (date) => {

  return day
  .get(date)
  .then(dayObj => {

    //  if null, return value undefined
    if(dayObj === null){
      //  -------------------------------------> EXIT
      return { date };
    }

    let value =
    // get the snapshots keys
    Object
    .keys(dayObj.snapshots)
    //  for every key,
    .map(snapshotKey => {

      //  get that snapshot
      return dayObj.snapshots[snapshotKey]
      //  get the data field
      .data
      //  filter to get only the E_D_WR metric
      .filter(snapshotDataObj => {
        return snapshotDataObj.legend === 'E_D_WR';
      })
      .pop()
      .value;
    })
    .reduce((prev, cur) => { return prev + cur; });

    //  ---------------------------------------> EXIT
    return { date, value };
  });

};


day.getAvailable = () => {

  return new Promise((resolve, reject) => {

    db.isReady
    .then(() => {
      //  initialise the first time
      r
      .table('aiani')
      .pluck('date')
      .run(db.conn)
      .then(cursor => {
        cursor.toArray()
        .then(resolve)
        .catch(reject);
      });
    })
    .catch(reject);
  });

};


module.exports = day;
