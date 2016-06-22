
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments('id').primary();
    table.string('user');
    table.string('email');
    table.string('domain');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
