let {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
} = require('../data/mock-data');
const oefeningRepo = require('../repository/oefening');

const getAll = async () => {
  const oefeningen = await oefeningRepo.getAll();
  return {
    items: oefeningen,
    count: await oefeningRepo.getCount()
  }
};

const getById = async (id) => {
  return await oefeningRepo.getById(id);
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