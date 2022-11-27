const {
  tables
} = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.oefening, (table) => {
      table.increments('id');

      table.string('spiergroep', 255)
        .notNullable();

      table.string('moeilijkheidsgraad', 255)
        .notNullable();

      table.integer('toestel_id')
        .unsigned()
        .notNullable();

      table.foreign('toestel_id', 'fk_toestel_oefening')
        .references(`${tables.toestel}.id`)
        .onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.oefening);
  },
};