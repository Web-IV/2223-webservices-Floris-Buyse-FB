const {
  getKnex,
  tables
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');

const getAll = async () => {
  const oefeningen = await getKnex()(tables.oefening)
    .select('*')
    .orderBy('spiergroep', 'asc');
  return oefeningen
}

const getCount = async () => {
  const [count] = await getKnex()(tables.oefening).count();
  return count['COUNT(*)'];
}

const SELECT_COLUMNS = [
  `${tables.oefening}.id`, 'spiergroep', 'moeilijkheidsgraad', 'toestel_id'
];

const getById = async (id) => {
  const oefeningen = await getKnex()(tables.oefening)
    .first(SELECT_COLUMNS)
    .where(`${tables.oefening}.id`, id);
  return oefeningen
}

const create = async ({
  spiergroep,
  moeilijkheidsgraad,
  toestel_id
}) => {
  try {
    const [id] = await getKnex()(tables.oefening)
      .insert({
        spiergroep,
        moeilijkheidsgraad,
        toestel_id
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
  spiergroep,
  moeilijkheidsgraad,
  toestel_id
}) => {
  try {
    await getKnex()(tables.oefening)
      .update({
        spiergroep,
        moeilijkheidsgraad,
        toestel_id
      })
      .where(`${tables.oefening}.id`, id);
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
    const deletedOefening = await getKnex()(tables.oefening)
      .delete()
      .where(`${tables.oefening}.id`, id);
    return deletedOefening > 0;
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