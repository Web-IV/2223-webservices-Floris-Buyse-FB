let {
  transactions,
  TRANSACTIONS
} = require('../data/mock_data')

const getAll = () => {
  return {
    items: TRANSACTIONS,
    count: TRANSACTIONS.length,
  };
};

const create = ({
  amount,
  date,
  placeId,
  user
}) => {
  let existingPlace;
  if (placeId) {
    existingPlace = PLACES.find((place) => place.id === placeId);

    if (!existingPlace) {
      getLogger().error(`There is no place with id ${id}.`, {
        id
      });
    }
  }

  if (typeof user === 'string') {
    user = {
      id: Math.floor(Math.randrom() * 100000),
      name: user
    };
  }

  const maxId = Math.max(...TRANSACTIONS.map(i => i.id));
  const newTransaction = {
    id: maxId + 1,
    amount,
    date: date.toISOString(),
    place: existingPlace,
    user,
  };
  TRANSACTIONS = [...TRANSACTIONS, newTransaction];
  return newTransaction;
}

const getById = (id) => {
  throw new Error("not implemented yet");
}

const updateById = (id, {
  amount,
  date,
  placeId,
  user
}) => {
  throw new Error("not implemented yet");
}
const deleteById = (id) => {
  throw new Error("not implemented yet");
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};