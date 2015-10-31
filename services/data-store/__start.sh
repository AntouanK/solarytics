#!/bin/sh

SERVICE_NAME='data-store'
EXISTING_DATASTORE_CONTAINERS=$(docker ps -a | grep -oE $SERVICE_NAME | uniq);

# if a container already exists, remove it
if [ -n "$EXISTING_DATASTORE_CONTAINERS" ] && [ $(echo "$EXISTING_DATASTORE_CONTAINERS" | wc -l) -ge 1 ]; then
  echo "[$SERVICE_NAME] Removing existing $SERVICE_NAME container" ;
  docker rm -f $EXISTING_DATASTORE_CONTAINERS ;
fi

if [ $(docker images | grep $SERVICE_NAME | wc -l) -lt 1  ]; then
  echo "[$SERVICE_NAME] No image found!" && \
  sh ./__build.sh ;
fi


docker run -d \
 -p 11000:80 \
--name data-store \
--link rdbMaster:rdbMaster \
 -v $(pwd)/src:/home/docker/workplace/data-store/src \
 -w /home/docker/workplace/data-store \
  data-store
