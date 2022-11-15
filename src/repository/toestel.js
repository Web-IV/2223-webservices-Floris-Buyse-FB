const {
  getKnex,
  tables
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.toestel}.id`, 'type', 'locatie_id'
]

const getById = async (id) => {
  const toestellen = await getKnex()(tables.toestel)
    .first(SELECT_COLUMNS)
    .where(`${tables.toestel}.id`, id);
  return toestellen
}

module.exports = {
  getById
};