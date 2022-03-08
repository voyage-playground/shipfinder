FROM voyageapp/node:17.6-alpine

WORKDIR /app

COPY client/package*.json client/
RUN cd client && npm ci
COPY client/ client/
RUN cd client && npm run build

COPY server/package*.json server/
RUN cd server && npm ci
COPY server/ server/

RUN npm i -g knex

EXPOSE 8000

WORKDIR /app/server

ENTRYPOINT ["sh", "scripts/run_app.sh"]
