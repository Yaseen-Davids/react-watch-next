NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username");
    table.string("password");
    table.string("email").unique();
    table.string("token").unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
