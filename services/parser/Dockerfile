FROM antouank/alp-node

WORKDIR /home/docker/workplace/parser

ADD ./src           /home/docker/workplace/web-client/src
ADD ./package.json  /home/docker/workplace/web-client/package.json

RUN npm i ;

CMD node --use-strict ./src/
