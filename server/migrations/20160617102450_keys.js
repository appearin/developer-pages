
exports.up = function(knex) {
  return knex.schema.createTable('keys', function(table){
    table.string('key').primary();
    table.integer('userId').references('userId').inTable('users').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('keys');
};
