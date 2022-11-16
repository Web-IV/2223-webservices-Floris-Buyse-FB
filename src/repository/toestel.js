const {
  getKnex,
  tables
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');

const getAll = async () => {
  const toestellen = await getKnex()(tables.toestel)
    .select('*')
    .orderBy('id', 'asc');
  return toestellen
}

const getCount = async () => {
  const [count] = await getKnex()(tables.toestel).count();
  return count['COUNT(*)'];
}

const SELECT_COLUMNS = [
  `${tables.toestel}.id`, 'type', 'locatie_id'
]

const getById = async (id) => {
  const toestellen = await getKnex()(tables.toestel)
    .first(SELECT_COLUMNS)
    .where(`${tables.toestel}.id`, id);
  return toestellen
}

const create = async ({
  type,
  locatie_id
}) => {
  try {
    const [id] = await getKnex()(tables.toestel)
      .insert({
        type,
        locatie_id
      })
    return await getById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error('creation failed', {
      error
    });
    throw new Error('creation failed');
  }
}

const updateById = async (id, {
  type,
  locatie_id
}) => {
  try {
    await getKnex()(tables.toestel)
      .update({
        type,
        locatie_id
      })
      .where(`${tables.toestel}.id`, id);
    return await getById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error('update failed', {
      error
    });
    throw new Error('update failed');
  }
}

const deleteById = async (id) => {
  try {
    const deletedToestel = await getKnex()(tables.toestel)
      .delete()
      .where(`${tables.toestel}.id`, id);
    return deletedToestel > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('delete failed', {
      error
    });
    throw new Error('delete failed');
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getCount
};