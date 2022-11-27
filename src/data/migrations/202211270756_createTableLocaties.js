const {
  tables
} = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.locatie, (table) => {
      table.increments('id');

      table.string('stad', 255)
        .notNullable();

      table.integer('postcode')
        .notNullable();

      table.string('straat', 255)
        .notNullable();

      table.integer('nummer')
        .notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.locatie);
  },
};