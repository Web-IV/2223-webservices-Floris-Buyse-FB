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

const getCount = async () => {
  const [count] = await getKnex()(tables.locatie).count();
  return count['COUNT(*)'];
}

const SELECT_COLUMNS = [
  `${tables.locatie}.id`, 'stad', 'postcode', 'straat', 'nummer'
]

const getById = async (id) => {
  const locaties = await getKnex()(tables.locatie)
    .first(SELECT_COLUMNS)
    .where(`${tables.locatie}.id`, id);
  return locaties
}

const create = async ({
  stad,
  postcode,
  straat,
  nummer
}) => {
  try {
    const [id] = await getKnex()(tables.locatie)
      .insert({
        stad,
        postcode,
        straat,
        nummer
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
  stad,
  postcode,
  straat,
  nummer
}) => {
  try {
    await getKnex()(tables.locatie)
      .update({
        stad,
        postcode,
        straat,
        nummer
      })
      .where(`${tables.locatie}.id`, id);
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
    const deletedLocatie = await getKnex()(tables.locatie)
      .delete()
      .where(`${tables.locatie}.id`, id);
    return deletedLocatie > 0;
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