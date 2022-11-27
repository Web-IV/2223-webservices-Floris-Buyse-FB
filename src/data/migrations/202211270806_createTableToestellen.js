const {
  tables
} = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.toestel, (table) => {
      table.increments('id');

      table.string('type', 255)
        .notNullable();

      table.integer('locatie_id')
        .unsigned()
        .notNullable();

      table.foreign('locatie_id', 'fk_locatie_toestel')
        .references(`${tables.locatie}.id`)
        .onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.toestel);
  },
};