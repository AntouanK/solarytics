FROM antouank/elm-base

WORKDIR /home/docker/workplace/web-client

ADD ./package.json  /home/docker/workplace/web-client/package.json

RUN npm i --silent

# build the FE
ADD ./fe /home/docker/workplace/web-client/fe
WORKDIR /home/docker/workplace/web-client/fe
ENV NODE_ENV production
RUN mkdir -p dist
RUN elm make --warn --yes src/App.elm --output dist/index.html

# run the server
ADD ./src /home/docker/workplace/web-client/src
WORKDIR /home/docker/workplace/web-client

CMD node --use-strict ./src/server.js

