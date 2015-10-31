FROM antouank/alp-node

WORKDIR /home/docker/workplace/web-client

ADD ./package.json  /home/docker/workplace/web-client/package.json

RUN npm i

# build the FE
ADD ./fe            /home/docker/workplace/web-client/fe
WORKDIR /home/docker/workplace/web-client/fe
ENV NODE_ENV production
RUN ../node_modules/gulp/bin/gulp.js build

ADD ./src           /home/docker/workplace/web-client/src

WORKDIR /home/docker/workplace/web-client

CMD node --use-strict ./src/server.js
