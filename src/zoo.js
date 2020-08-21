/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');
const { animals, employees } = require('./data');

const animalsByIds = (...params) => {
  const filtered = params.map(ids => animals.find(({ id }) => id === ids));
  return filtered;
};

const animalsOlderThan = (animal, paramAge) => {
  const filtered = animals.find(({ name }) => name === animal);
  const everyAnimal = filtered.residents.every(({ age }) => age > paramAge);
  return everyAnimal;
};

const employeeByName = (name) => {
  if (!name) {
    return {};
  }
  const funcionario = employees
  .find(({ firstName, lastName }) => firstName === name || lastName === name);
  return funcionario;
};

const createEmployee = (personalInfo, associatedWith) => {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = { id, firstName, lastName, managers, responsibleFor };
  return employee;
};

const isManager = id => employees.some(({ managers }) => managers.includes(id));

// const addEmployee = (id, firstName, lastName, ...managers, responsibleFor) => {
//   // const employee = { id, firstName, lastName, managers, responsibleFor };
//   // employees.push(employee);
// };

const addEmployee = () => {};

const animalCount = (species) => {
  const animalCounts = {};
  if (!species) {
    animals.forEach(({ name, residents }) => {
      animalCounts[name] = residents.length;
      return 0;
    });
  } else {
    return animals.find(({ name }) => name === species).residents.length;
  }
  return animalCounts;
};

const entryCalculator = (entrants) => {
  if (!entrants || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return `${(Adult * 49.99) + (Child * 20.99) + (Senior * 24.99)}`;
};

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
