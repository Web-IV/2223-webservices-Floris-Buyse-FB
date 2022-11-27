const {
  tables
} = require("../index")

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.locatie).delete();

    // then add the fresh places
    await knex(tables.locatie).insert([{
        id: 1,
        stad: 'Gent',
        postcode: 9000,
        straat: 'Blaarmeersen',
        nummer: 1
      },
      {
        id: 2,
        stad: 'Gent',
        postcode: 9000,
        straat: 'Rabotpark',
        nummer: 95
      },
      {
        id: 3,
        stad: 'Gent',
        postcode: 9000,
        straat: 'Bijloke site',
        nummer: 10
      },
    ]);
  },
};