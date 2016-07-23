'use strict';

const r           = require('rethinkdb');
const DB_HOST     = 'rdbMaster';
const DB_NAME     = 'solar';
const TABLE_NAME  = 'aiani';
const tablesToCreate = [TABLE_NAME, 'meta'];
const dbExports   = {};


dbExports.isReady =
r.connect({
  host: DB_HOST,
  port: 28015,
  db: DB_NAME
})
.then(conn => {
  // save that connection to reuse it
  dbExports.conn = conn;

  //  get a list of existing dbs
  return r.dbList().run(conn);
})
.then(dbList => {

  if(dbList.indexOf(DB_NAME) < 0){
    //  create ours if it doesn't exist
    return r
    .dbCreate(DB_NAME)
    .run(dbExports.conn);
  }
})
.then(() => {

  //  use DB_NAME by default on that connection
  dbExports.conn.use(DB_NAME);

  return r
  .tableList()
  .run(dbExports.conn);
})
.then(list => {

  return Promise
  .all(
    tablesToCreate
    .filter(tableName => list.indexOf(tableName) < 0)
    .map(tableName => r
      .tableCreate(tableName, {
        primaryKey: TABLE_NAME === tableName ? 'date' : 'id'
      })
      .run(dbExports.conn)
    )
  );
})
.then(() => console.log(`[db] DB connection and tables are now ready.`));


module.exports = dbExports;
