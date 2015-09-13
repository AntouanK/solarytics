#!/bin/sh

EXISTING_RDB_CONTAINERS=$(docker ps -a | grep -oE "rdb\w+" | xargs | cat);

# if an "rdb" container exists, remove it
if [ -n "$EXISTING_DATASTORE_CONTAINERS" ] && [ $(echo "$EXISTING_DATASTORE_CONTAINERS" | wc -l) -ge 1 ]; then
  echo "[rdb] Removing existing rdb containers ($EXISTING_RDB_CONTAINERS)";
  docker rm -f $EXISTING_RDB_CONTAINERS ;
fi

STORAGE_PATH="$(pwd)/_db";
echo "[rdb] Storage will persist at $STORAGE_PATH";

echo '[rdb] Starting RethinkDB master...';
docker run \
  -d \
  -p 18080:8080 \
  -v $STORAGE_PATH/master:/data \
  --name rdbMaster \
  rethinkdb rethinkdb --bind all;

echo '[rdb] Starting RethinkDB node A...';
# run node A
docker run \
  -d \
  --name rdbNodeA \
  --link rdbMaster \
  -v $STORAGE_PATH/nodeA:/data \
  rethinkdb rethinkdb --join rdbMaster:29015 --bind all ;

echo '[rdb] Starting RethinkDB node B...';
# run node B
docker run \
  -d \
  --name rdbNodeB \
  --link rdbMaster \
  -v $STORAGE_PATH/nodeB:/data \
  rethinkdb rethinkdb --join rdbMaster:29015 --bind all ;
