const oefeningRepo = require('../repository/oefening');
const ServiceError = require('../core/serviceError');

const getAll = async () => {
  const oefeningen = await oefeningRepo.getAll();
  return {
    items: oefeningen,
    count: await oefeningRepo.getCount()
  }
};

const getById = async (id) => {
  const oefening = await oefeningRepo.getById(id);

  if (!oefening) {
    throw ServiceError.notFound(`There is no oefening with id ${id}`, {
      id
    });
  }
};

const create = async ({
  spiergroep,
  moeilijkheidsgraad,
  toestel_id
}) => {
  const newOefening = await oefeningRepo.create({
    spiergroep,
    moeilijkheidsgraad,
    toestel_id
  });
  return newOefening;
};

const updateById = async (id, {
  spiergroep,
  moeilijkheidsgraad,
  toestel_id
}) => {
  const updatedOefening = await oefeningRepo.updateById(id, {
    spiergroep,
    moeilijkheidsgraad,
    toestel_id
  });
  return updatedOefening;
};

const deleteById = async (id) => {
  await oefeningRepo.deleteById(id)
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};