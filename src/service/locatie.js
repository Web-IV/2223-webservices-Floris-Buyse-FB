const {
  transport
} = require('winston');
let {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
} = require('../data/mock-data');
const locatieRepo = require('../repository/locatie');

const getAll = async () => {
  const locaties = await locatieRepo.getAll();
  return {
    items: locaties,
    count: await locatieRepo.getCount()
  }
};

const getById = async (id) => {
  return await locatieRepo.getById(id);
};

const create = async ({
  stad,
  postcode,
  straat,
  nummer
}) => {
  const newLocatie = await locatieRepo.create({
    stad,
    postcode,
    straat,
    nummer
  });
  return newLocatie;
};

const updateById = async (id, {
  stad,
  postcode,
  straat,
  nummer
}) => {
  const updatedLocatie = await locatieRepo.updateById(id, {
    stad,
    postcode,
    straat,
    nummer
  });
  return updatedLocatie;
};

const deleteById = async (id) => {
  await locatieRepo.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};