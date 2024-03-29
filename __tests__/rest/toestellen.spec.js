const {
  tables
} = require('../../src/data/index');
const {
  withServer
} = require('../helpers');

const data = {
  locaties: [{
      id: 1,
      stad: 'Gent',
      postcode: 9000,
      straat: 'Rabotpark',
      nummer: 15
    },
    {
      id: 2,
      stad: 'Gent',
      postcode: 9000,
      straat: 'Groene Valei park',
      nummer: 1
    },
    {
      id: 3,
      stad: 'Gent',
      postcode: 9000,
      straat: 'Blaarmeersen',
      nummer: 99
    }
  ],
  toestellen: [{
      id: 1,
      type: 'bodyweight',
      locatie_id: 3
    },
    {
      id: 2,
      type: 'gewicht',
      locatie_id: 1
    },
    {
      id: 3,
      type: 'bodyweight',
      locatie_id: 2
    }
  ],
  oefeningen: [{
      id: 1,
      spiergroep: 'triceps',
      moeilijkheidsgraad: 'medium',
      toestel_id: 1
    },
    {
      id: 2,
      spiergroep: 'biceps',
      moeilijkheidsgraad: 'medium',
      toestel_id: 2
    },
    {
      id: 3,
      spiergroep: 'abs',
      moeilijkheidsgraad: 'hard',
      toestel_id: 3
    },
    {
      id: 4,
      spiergroep: 'quadriceps',
      moeilijkheidsgraad: 'easy',
      toestel_id: 1
    },
    {
      id: 5,
      spiergroep: 'calves',
      moeilijkheidsgraad: 'easy',
      toestel_id: 1
    },
  ],
}

const dataToDelete = {
  locaties: [1, 2, 3],
  toestellen: [1, 2, 3],
  oefeningen: [1, 2, 3, 4, 5]
};

describe('toestellen', () => {
  let request;
  let knex;
  let authHeader;

  withServer(({
    knex: k,
    request: r,
    authHeader: a,
  }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = '/api/toestellen'

  //get all testen
  describe('GET /api/toestellen', () => {
    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
    })

    afterAll(async () => {
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and all toestellen', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(3);
    });
  });


  // get by id testen
  describe('GET /api/toestellen/:id', () => {
    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
    })

    afterAll(async () => {
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and the requested toestel', async () => {
      const toestelId = data.toestellen[0].id
      const response = await request.get(`${url}/${toestelId}`).set('Authorization', authHeader);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: toestelId,
        type: 'bodyweight',
        locatie_id: 3,
      });
    });
  });

  // post testen
  describe('POST /api/toestellen', () => {

    const toestelToDelete = [];

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
    })

    afterAll(async () => {
      await knex(tables.locatie).whereIn('id', toestelToDelete).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 201 and return the created toestel', async () => {
      const response = await request.post(url)
        .send({
          type: 'gewicht',
          locatie_id: 2
        }).set('Authorization', authHeader)

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.type).toBe('gewicht');
      expect(response.body.locatie_id).toBe(2);

      toestelToDelete.push(response.body.id)
    });
  });

  // put testen
  describe('PUT /api/toestellen/:id', () => {

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.toestel).insert([{
        id: 4,
        type: 'bodyweight',
        locatie_id: 2
      }]);
    })

    afterAll(async () => {
      await knex(tables.toestel).where('id', 4).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and return the updated toestel', async () => {
      const response = await request.put(`${url}/4`)
        .send({
          type: 'bodyweight',
          locatie_id: 2,
        }).set('Authorization', authHeader)

      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.type).toBe('bodyweight');
      expect(response.body.locatie_id).toBe(2);
    });

  });

  // delete testen
  describe('DELETE /api/locaties/:id', () => {

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.toestel).insert([{
        id: 4,
        type: 'bodyweight',
        locatie_id: 2
      }]);
    })

    afterAll(async () => {
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 204 and return nothing', async () => {
      const response = await request.delete(`${url}/4`).set('Authorization', authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

  });
});