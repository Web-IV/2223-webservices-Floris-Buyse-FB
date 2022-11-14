let {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
} = require('../data/mock-data');

const getAll = () => {
  return {
    items: LOCATIES,
    count: LOCATIES.length
  };
};

const getById = (id) => {
  return LOCATIES.find(l => l.id === parseInt(id));
};

const create = ({
  stad,
  postcode,
  straat,
  nummer
}) => {
  const newLocation = {
    id: Math.max(...LOCATIES.map(l => l.id)) + 1,
    stad: stad,
    postcode: postcode,
    straat: straat,
    nummer: nummer
  };
  LOCATIES = [...LOCATIES, newLocation];
  return newLocation;
};

const updateById = (id, {
  stad,
  postcode,
  straat,
  nummer
}) => {
  let locatie;
  if (id)
    locatie = LOCATIES.find(l => l.id === parseInt(id));
  if (!locatie)
    throw new Error(`Locatie met id ${id} bestaat niet`);
  locatie.stad = stad;
  locatie.postcode = postcode;
  locatie.straat = straat;
  locatie.nummer = nummer;
  return locatie;
};

const deleteById = (id) => {
  LOCATIES = LOCATIES.filter(l => l.id !== parseInt(id));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};