const createServer = require('../../src/createServer');
const supertest = require('supertest');
const {
  getKnex,
  tables
} = require('../../src/data/index');

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
}

const dataToDelete = {
  locaties: [1, 2, 3],
  toestellen: [1, 2, 3]
};

describe('toestellen', () => {
  let server;
  let request;
  let knex;
  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    knex = getKnex();
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/toestellen'

  //get all testen
  describe('GET /api/toestellen', () => {
    beforeAll(async () => {
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.locatie).insert(data.locaties);
    })

    afterAll(async () => {
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
    })

    it('should return 200 and all toestellen', async () => {
      const response = await request.get(url);
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
      const toestelId = data.toestel[0].id
      const response = await request.get(`${url}/${toestelId}`);

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
        })

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
        })

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
      const response = await request.delete(`${url}/4`)

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

  });
});