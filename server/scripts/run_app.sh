#!/bin/bash

APP_ENV="${APP_ENV:-development}"

cd /app

DB_HOSTNAME=$([ -n "$DB_HOST" ] && echo "tcp://$DB_HOST:5432" || echo "tcp://127.0.0.1:5432")

echo "🚀 Wait for DB to start"
dockerize -wait $DB_HOSTNAME -timeout 60s

echo "🚀 Running Migrations"
cd /app/server && knex migrate:latest
echo "🚀 Migrations Complete"

if [ -n "$RUNNING_IN_VOYAGE" ] || [ "$APP_ENV" == "ci" ]; then
  cd /app/server && knex seed:run
fi

if [ "$APP_ENV" == "local" ]; then
  npm start
else
  node server.js
fi
