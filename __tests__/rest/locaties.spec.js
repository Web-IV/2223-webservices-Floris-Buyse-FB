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
}

const dataToDelete = {
  locaties: [1, 2, 3],
};

describe('locaties', () => {
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

  const url = '/api/locaties'

  //get all testen
  describe('GET /api/locaties', () => {
    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
    })

    afterAll(async () => {
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and all locaties', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(3);
    });
  });


  // get by id testen
  describe('GET /api/locaties/:id', () => {
    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
    })

    afterAll(async () => {
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and the requested locatie', async () => {
      const locatieId = data.locaties[0].id
      const response = await request.get(`${url}/${locatieId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: locatieId,
        stad: 'Gent',
        postcode: 9000,
        straat: 'Rabotpark',
        nummer: 15
      });
    });
  });

  //hier verder
  describe('POST /api/locaties', () => {

    const locatieToDelete = [];

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
    })

    afterAll(async () => {
      await knex(tables.locatie).whereIn('id', locatieToDelete).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 201 and return the created locatie', async () => {
      const response = await request.post(url)
        .send({
          stad: 'Gent',
          postcode: 9000,
          straat: 'Kasteellaan',
          nummer: 59
        })

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.stad).toBe('Gent');
      expect(response.body.postcode).toBe(9000);
      expect(response.body.straat).toBe('Kasteellaan');
      expect(response.body.nummer).toBe(59);

      locatieToDelete.push(response.body.id)
    });
  });
});