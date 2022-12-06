const createServer = require('../../src/createServer');
const supertest = require('supertest');
const {
  getKnex,
  tables
} = require('../../src/data');

describe('locaties', () => {
  let server;
  let request;
  let knex;
  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    knex - getKnex();
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/locaties'
  describe('GET /api/locaties', () => {
    it('should return 200 and all transactions', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200)
    });
  })
})