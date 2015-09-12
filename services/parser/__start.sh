#!/bin/sh

docker rm -f parser ;

docker run -d \
 -p 14000:80 \
--name parser \
 -v `pwd`:/home/docker \
 -w /home/docker \
  antouank/node:4.0.0-rc.1 node ./
