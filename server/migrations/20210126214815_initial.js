const tableName = 'ships';

exports.up = async knex => {
  await knex.schema.createTable(tableName, table => {
    table.increments('id');
    table.text('name');
    table.timestamps(false, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable(tableName);
};
