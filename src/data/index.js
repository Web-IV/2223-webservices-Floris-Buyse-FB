const knex = require('knex');
const config = require('config');
const {
  getLogger
} = require('../core/logging');
const {
  join
} = require('path');

const DB_DB = config.get('database.database');
const DB_HOST = config.get('database.host');
const DB_USER = config.get('database.user');
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
    },
    migrations: {
      tableName: 'knex_meta',
      directory: join('src', 'data', 'migrations')
    },
    seeds: {
      directory: join('src', 'data', 'seeds')
    },
  }
  knexInstance = knex(knexOptions);
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DB_DB}`);
    //connectie verwijderen en nieuwe connectie aanmaken
    await knexInstance.destroy();
    knexOptions.connection.database = DB_DB;
    knexInstance = knex(knexOptions);
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    getLogger().error('Error init db', {
      error
    });
    throw new Error('init db failed');
  }

  let knexMigrationFailed = true
  try {
    await knexInstance.migrate.latest();
    knexMigrationFailed = false;
  } catch (error) {
    getLogger().error('Error while migrating the database', {
      error,
    });
  }

  if (knexMigrationFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      getLogger().error('Error while migrating the database', {
        error
      });
    }
    throw new Error("Migration failed");
  }

  if (isDevelpment) {
    try {
      await knexInstance.seed.run();
    } catch (error) {
      getLogger().error('Seeding failed', {
        error
      })
    };
  }
}

async function shutdownData() {
  const logger = getLogger();

  logger.info('Shutting down database connection');

  await knexInstance.destroy()
  knexInstance = null;

  logger.info('Database connection closed');
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
  shutdownData,
  tables
}