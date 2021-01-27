const tableName = 'ships';

exports.up = async knex => {
  await knex.schema.createTable(tableName, table => {
    table.increments('id');
    table.text('name');
    table.text('captain');
    table.float('lat');
    table.float('lng');
    table.text('avatar');
    table.timestamps(false, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable(tableName);
};
