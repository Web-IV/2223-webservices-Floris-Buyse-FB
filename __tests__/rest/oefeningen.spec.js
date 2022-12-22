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

describe('oefeningen', () => {
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

  const url = '/api/oefeningen'

  //get all testen
  describe('GET /api/oefeningen', () => {
    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.oefening).insert(data.oefeningen);
    })

    afterAll(async () => {
      await knex(tables.oefening).whereIn('id', dataToDelete.oefeningen).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and all oefeningen', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(5);
    });
  });


  // get by id testen
  describe('GET /api/oefeningen/:id', () => {
    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.oefening).insert(data.oefeningen);
    })

    afterAll(async () => {
      await knex(tables.oefening).whereIn('id', dataToDelete.oefeningen).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and the requested oefening', async () => {
      const oefeningId = data.oefeningen[0].id
      const response = await request.get(`${url}/${oefeningId}`).set('Authorization', authHeader);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: oefeningId,
        spiergroep: 'triceps',
        moeilijkheidsgraad: 'medium',
        toestel_id: 1,
      });
    });
  });

  // post testen
  describe('POST /api/oefeningen', () => {

    const oefeningToDelete = [];

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.oefening).insert(data.oefeningen);
    })

    afterAll(async () => {
      await knex(tables.oefening).whereIn('id', oefeningToDelete).delete();
      await knex(tables.oefening).whereIn('id', dataToDelete.oefeningen).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 201 and return the created oefening', async () => {
      const response = await request.post(url)
        .send({
          id: 6,
          spiergroep: 'calves',
          moeilijkheidsgraad: 'medium',
          toestel_id: 2,
        }).set('Authorization', authHeader);

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.spiergroep).toBe('calves');
      expect(response.body.moeilijkheidsgraad).toBe('medium');
      expect(response.body.toestel_id).toBe(2);

      oefeningToDelete.push(response.body.id)
    });
  });

  // put testen
  describe('PUT /api/oefeningen/:id', () => {

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.oefening).insert(data.oefeningen);
      await knex(tables.oefening).insert([{
        id: 6,
        spiergroep: 'calves',
        moeilijkheidsgraad: 'medium',
        toestel_id: 2,
      }]);
    })

    afterAll(async () => {
      await knex(tables.oefening).where('id', 4).delete();
      await knex(tables.oefening).whereIn('id', dataToDelete.oefeningen).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 200 and return the updated oefening', async () => {
      const response = await request.put(`${url}/4`)
        .send({
          id: 6,
          spiergroep: 'quadriceps',
          moeilijkheidsgraad: 'medium',
          toestel_id: 2,
        }).set('Authorization', authHeader);

      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.spiergroep).toBe('quadriceps');
      expect(response.body.moeilijkheidsgraad).toBe('medium');
      expect(response.body.toestel_id).toBe(2);
    });

  });

  // delete testen
  describe('DELETE /api/oefeningen/:id', () => {

    beforeAll(async () => {
      await knex(tables.locatie).insert(data.locaties);
      await knex(tables.toestel).insert(data.toestellen);
      await knex(tables.oefening).insert(data.oefeningen);
      await knex(tables.oefening).insert([{
        id: 6,
        spiergroep: 'quadriceps',
        moeilijkheidsgraad: 'medium',
        toestel_id: 2,
      }]);
    })

    afterAll(async () => {
      await knex(tables.oefening).whereIn('id', dataToDelete.oefeningen).delete();
      await knex(tables.toestel).whereIn('id', dataToDelete.toestellen).delete();
      await knex(tables.locatie).whereIn('id', dataToDelete.locaties).delete();
    })

    it('should return 204 and return nothing', async () => {
      const response = await request.delete(`${url}/6`).set('Authorization', authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

  });
});