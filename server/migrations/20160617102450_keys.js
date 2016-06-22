
exports.up = function(knex) {
  return knex.schema.createTable('keys', function(table){
    table.string('key').primary();
    table.integer('ownerId').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('keys');
};
