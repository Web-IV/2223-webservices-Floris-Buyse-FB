const knex = require('knex');
const config = require('config');
const {
  getLogger
} = require('../core/logging');

const DB_DB = config.get('database.database');
const DB_HOST = config.get('database.host');
const DB_USER = config.get('database.username');
const DB_PW = config.get('database.password');
const DB_CLIENT = config.get('database.client');
const DB_PORT = config.get('database.port');
const NODE_ENV = config.get('env')
const isDevelpment = NODE_ENV === 'development';

let knexInstance;

const initializeDatabase = async () => {
  const knexOptions = {
    client: DB_CLIENT,
    debug: isDevelpment,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PW,
      database: DB_DB
    }
  }
  knexInstance = knex(knexOptions);
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    getLogger().error('Error init db', {
      error
    });
    throw new Error('init db failed');
  }
}

const getKnex = () => {
  if (!knexInstance) {
    throw new Error('connection not initialized');
  }
  return knexInstance;
}

const tables = Object.freeze({
  locatie: 'locaties',
  toestel: 'toestellen',
  oefening: 'oefeningen'
});

module.exports = {
  initializeDatabase,
  getKnex,
  tables
}