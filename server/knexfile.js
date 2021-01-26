const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const knexConfig = {
  client: 'pg',
  connection: {
    port: DB_PORT || 5432,
    host: DB_HOST || 'database',
    user: DB_USERNAME || 'voyage',
    password: DB_PASSWORD || 'voyage',
    database: DB_DATABASE || 'voyage',
  },
};

module.exports = {
  ...knexConfig,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
