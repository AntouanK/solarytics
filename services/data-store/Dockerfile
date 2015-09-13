FROM antouank/alp-node

WORKDIR /home/docker/workplace/data-store

ADD ./src           /home/docker/workplace/data-store/src
ADD ./package.json  /home/docker/workplace/data-store/package.json

RUN npm i ;

CMD node --use-strict ./src/
