const {
  Sequelize
} = require('sequelize');
const config = require('config');


const DB_DB = config.get('database.database');
const DB_HOST = config.get('database.host');
const DB_USER = config.get('database.user');
const DB_PW = config.get('database.password');
const DB_DIALECT = config.get('database.dialect');

const sequelize = new Sequelize(DB_DB, DB_USER, DB_PW, {
  host: DB_HOST,
  dialect: DB_DIALECT
});

const testCon = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', {
      error
    });
  }
}

testCon();