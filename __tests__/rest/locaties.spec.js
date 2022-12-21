const {
  withServer
} = require('../helpers');
const {
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
  let request;
  let knex;
  let authHeader;

  withServer(({
    knex: k,
    request: r,
    authHeader: a
  }) => {
    knex = k;
    request = r;
    authHeader = a;
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
      const response = await request.get(url).set('Authorization', authHeader);
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
      const response = await request.get(`${url}/${locatieId}`)
        .set('Authorization', authHeader);

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

  // post testen
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
        .set('Authorization', authHeader);

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.stad).toBe('Gent');
      expect(response.body.postcode).toBe(9000);
      expect(response.body.straat).toBe('Kasteellaan');
      expect(response.body.nummer).toBe(59);

      locatieToDelete.push(response.body.id)
    });
  });

  // put testen
  describe('PUT /api/locaties/:id', () => {

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.locatie).insert([{
        id: 4,
        stad: 'Gent',
        postcode: 9000,
        straat: 'Kasteellaan',
        nummer: 59
      }]);
    })

    afterAll(async () => {
      await knex(tables.locatie).where('id', 4).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and return the updated locatie', async () => {
      const response = await request.put(`${url}/4`)
        .send({
          stad: 'Gent',
          postcode: 9000,
          straat: 'Veldstraat',
          nummer: 17
        })
        .set('Authorization', authHeader);

      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.stad).toBe('Gent');
      expect(response.body.postcode).toBe(9000);
      expect(response.body.straat).toBe('Veldstraat');
      expect(response.body.nummer).toBe(17);
    });

  });

  // delete testen
  describe('DELETE /api/locaties/:id', () => {

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.locatie).insert([{
        id: 4,
        stad: 'Gent',
        postcode: 9000,
        straat: 'Kasteellaan',
        nummer: 59
      }]);
    })

    afterAll(async () => {
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 204 and return nothing', async () => {
      const response = await request.delete(`${url}/4`)
        .set('Authorization', authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

  });
});