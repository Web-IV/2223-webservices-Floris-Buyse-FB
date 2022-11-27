const {
  tables
} = require("../index")

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.oefening).delete();

    // then add the fresh places
    await knex(tables.oefening).insert([{
        id: 1,
        spiergroep: 'hamstrings',
        moeilijkheidsgraad: 'hard',
        toestel_id: 1
      },
      {
        id: 2,
        spiergroep: 'abs',
        moeilijkheidsgraad: 'hard',
        toestel_id: 3
      },
      {
        id: 3,
        spiergroep: 'quadriceps',
        moeilijkheidsgraad: 'easy',
        toestel_id: 1
      },
      {
        id: 4,
        spiergroep: 'triceps',
        moeilijkheidsgraad: 'medium',
        toestel_id: 2
      },
      {
        id: 5,
        spiergroep: 'biceps',
        moeilijkheidsgraad: 'easy',
        toestel_id: 4
      }
    ]);
  },
};