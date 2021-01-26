FROM node:12-alpine3.9

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY client/package*.json client/
RUN cd client && npm i
COPY client/ client/
RUN cd client && npm run build

COPY server/package*.json server/
RUN cd server && npm i
COPY server/ server/

RUN npm i -g knex

EXPOSE 8000

WORKDIR /app/server

ENTRYPOINT ["sh", "scripts/run_app.sh"]
