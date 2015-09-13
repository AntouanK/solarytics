FROM antouank/alp-node

WORKDIR /home/docker/workplace/web-client

ADD ./src           /home/docker/workplace/web-client/src
ADD ./fe            /home/docker/workplace/web-client/fe
ADD ./package.json  /home/docker/workplace/web-client/package.json

RUN npm i ;

# build the FE
WORKDIR /home/docker/workplace/web-client/fe
ENV NODE_ENV production
RUN ../node_modules/gulp/bin/gulp.js build-dev

WORKDIR /home/docker/workplace/web-client

CMD node --use-strict ./src/server.js
