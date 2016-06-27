
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments('userId').primary();
    table.string('name');
    table.string('email');
    table.string('domain');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
