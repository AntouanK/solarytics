
const r         = require('rethinkdb');
const DB_HOST   = 'rdbMaster';
const DB_NAME   = 'solar';
const TABLE_NAME= 'aiani';
const dbExports = {};


dbExports.isReady =
r.connect({
  host: '192.168.1.128',
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

  if(list.indexOf(TABLE_NAME) < 0){
    return r
    .tableCreate(TABLE_NAME, {
      shards: 3,
      primaryKey: 'date'
    })
    .run(dbExports.conn);
  }
})
.then(() => { console.log(`[db] DB connection and tables are now ready.`);});


module.exports = dbExports;
