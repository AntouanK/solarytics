
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

  return r
  .table('aiani')
  .get(date)
  .do(function(dayObj){

    return dayObj('snapshots')
    .keys()
    .map(function(key){
      return dayObj('snapshots')(key)('data');
    })
    .map(function(dataObj){
      return dataObj.filter({ legend: 'E_D_WR' })(0)('value');
    })
    .sum();
  })
  .run(db.conn)
  .then(value => {

    return {
      date,
      value
    };
  });
};


day.getAvailable = (() => {

  let cachedList;

  db.isReady
  .then(() => {
    //  initialise the first time
    r
    .table('aiani')
    .pluck('date')
    .run(db.conn, (err, cursor) => {

      cursor.toArray()
      .then(list => {
        cachedList = list.map(listObj => { return listObj.date; });
      });

    });

    r
    .table('aiani')
    .pluck('date')
    .changes()
    .run(db.conn, (err, cursor) => {
      cursor.each((change) => {

        if(change.old_val === null && typeof change.new_val.date === 'string'){
          cachedList.push(change.new_val.date);
        }
      });
    });
  })
  .catch(function(err){
    console.log(err.message);
  });


  return () => {
    return new Promise(function(resolve){
      resolve(cachedList);
    });
  };

})();


module.exports = day;
