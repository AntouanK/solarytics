FROM mhart/alpine-node

WORKDIR /home/docker/workplace/data-store

ADD ./package.json  /home/docker/workplace/data-store/package.json
RUN npm i ;
ADD ./src           /home/docker/workplace/data-store/src

CMD node --use-strict ./src/
