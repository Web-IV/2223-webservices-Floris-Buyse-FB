const {
  tables
} = require("../index")

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.toestel).delete();

    // then add the fresh places
    await knex(tables.toestel).insert([{
        id: 1,
        type: 'gewicht',
        locatie_id: 1
      },
      {
        id: 2,
        type: 'gewicht',
        locatie_id: 2
      },
      {
        id: 3,
        type: 'bodyweight',
        locatie_id: 1
      },
      {
        id: 4,
        type: 'bodyweight',
        locatie_id: 3
      }
    ]);
  },
};