let {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
} = require('../data/mock-data');

const toestelRepo = require('../repository/toestel');

const getAll = async () => {
  const toestellen = await toestelRepo.getAll();
  return {
    items: toestellen,
    count: await toestelRepo.getCount()
  }
};

const getById = async (id) => {
  return await toestelRepo.getById(id);
};

const create = async ({
  type,
  locatie_id
}) => {
  const newToestel = await toestelRepo.create({
    type,
    locatie_id
  });
  return newToestel;
};

const updateById = async (id, {
  type,
  locatie_id
}) => {
  const updatedToestel = await toestelRepo.updateById(id, {
    type,
    locatie_id
  });
  return updatedToestel;
};

const deleteById = async (id) => {
  await toestelRepo.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};