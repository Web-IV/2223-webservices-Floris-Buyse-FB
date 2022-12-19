const toestelRepo = require('../repository/toestel');
const ServiceError = require('../core/serviceError');

const getAll = async () => {
  const toestellen = await toestelRepo.getAll();
  return {
    items: toestellen,
    count: await toestelRepo.getCount()
  }
};

const getById = async (id) => {
  const toestel = await toestelRepo.getById(id);

  if (!toestel) {
    throw ServiceError.notFound(`There is no toestel with id ${id}`, {
      id
    });
  }

  return toestel
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