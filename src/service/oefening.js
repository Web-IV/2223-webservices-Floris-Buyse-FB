let {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
} = require('../data/mock-data');

const getAll = () => {
  return {
    items: OEFENINGEN,
    count: OEFENINGEN.length
  };
};

const getById = (id) => {
  return OEFENINGEN.find(o => o.id === parseInt(id));
};

const create = ({
  spiergroep,
  moeilijkheidsgraad,
  toestelid
}) => {

  if (moeilijkheidsgraad !== "easy" && moeilijkheidsgraad !== "medium" && moeilijkheidsgraad !== "hard")
    throw new Error('Moeilijkheidsgraad kan enkel easy, medium of hard zijn');

  if (!TOESTELLEN.find(t => t.id === toestelid))
    throw new Error(`Er bestaat geen toestel met id ${toestelid}`);

  const newOefening = {
    id: Math.max(...OEFENINGEN.map(o => o.id)) + 1,
    spiergroep: spiergroep,
    moeilijkheidsgraad: moeilijkheidsgraad,
    toestelid: toestelid
  };
  OEFENINGEN = [...OEFENINGEN, newOefening];
  return newOefening;
};

const updateById = (id, {
  spiergroep,
  moeilijkheidsgraad,
  toestelid
}) => {

  if (moeilijkheidsgraad !== "easy" && moeilijkheidsgraad !== "medium" && moeilijkheidsgraad !== "hard")
    throw new Error('Moeilijkheidsgraad kan enkel easy, medium of hard zijn');

  if (!TOESTELLEN.find(t => t.id === toestelid))
    throw new Error(`Er bestaat geen toestel met id ${toestelid}`);

  let oefening;
  if (id)
    oefening = OEFENINGEN.find(o => o.id === parseInt(id));
  if (!oefening)
    throw new Error(`Oefening met id ${id} bestaat niet`);

  oefening.spiergroep = spiergroep;
  oefening.moeilijkheidsgraad = moeilijkheidsgraad;
  oefening.toestelid = toestelid;
  return oefening;
};

const deleteById = (id) => {
  OEFENINGEN = OEFENINGEN.filter(o => o.id !== parseInt(id));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};