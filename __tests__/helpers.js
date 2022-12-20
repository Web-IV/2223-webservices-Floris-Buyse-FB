const supertest = require('supertest');
const createServer = require('../src/createServer');
const {
  getKnex
} = require('../src/data');

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      request: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  withServer,
};