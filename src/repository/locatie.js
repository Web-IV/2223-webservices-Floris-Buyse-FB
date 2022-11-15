const {
  getKnex,
  tables
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');

const getAll = async () => {
  const locaties = await getKnex()(tables.locatie)
    .select('*')
    .orderBy('straat', 'asc');
  return locaties
}

module.exports = {
  getAll
};