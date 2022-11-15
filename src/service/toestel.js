let {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
} = require('../data/mock-data');

const toestelRepo = require('../repository/toestel');

const getAll = () => {
  return {
    items: TOESTELLEN,
    count: TOESTELLEN.length
  };
};

const getById = async (id) => {
  return await toestelRepo.getById(id);
};

const create = ({
  type,
  locatieid
}) => {

  if (type !== "gewicht" && type !== "bodyweight")
    throw new Error('Type kan enkel gewicht of bodyweight zijn');

  if (!LOCATIES.find(l => l.id === locatieid))
    throw new Error(`Er bestaat geen locatie met id ${locatieid}`);

  const newToestel = {
    id: Math.max(...TOESTELLEN.map(t => t.id)) + 1,
    type: type,
    locatieid: locatieid
  };
  TOESTELLEN = [...TOESTELLEN, newToestel];
  return newToestel;
};

const updateById = (id, {
  type,
  locatieid
}) => {

  if (type !== "gewicht" && type !== "bodyweight")
    throw new Error('Type kan enkel gewicht of bodyweight zijn');

  if (!LOCATIES.find(l => l.id === locatieid))
    throw new Error(`Er bestaat geen locatie met id ${locatieid}`);

  let toestel;
  if (id)
    toestel = TOESTELLEN.find(t => t.id === parseInt(id));
  if (!toestel)
    throw new Error(`Toestel met id ${id} bestaat niet`);

  toestel.type = type;
  toestel.locatieid = locatieid;
  return toestel;
};

const deleteById = (id) => {
  TOESTELLEN = TOESTELLEN.filter(t => t.id !== parseInt(id));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};