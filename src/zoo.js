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

function animalsByIds(...ids) {
  return data.animals.filter(({ id }, i) => id === ids[i]);
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(({ name }) => name === animal)
  .flatMap((filtered) => {filtered.residents})
  .every((individual) => {individual.age > age});
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  return data.employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((individual) => {individual.managers.includes(id)});
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(obj);
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    data.animals.forEach((individual) => {
      const name = individual.name;
      const count = individual.residents.length;
      obj[name] = count;
    });
    return obj;
  }

  return data.animals.find((individual) => {individual.name === species}).residents.length;
}

function entryCalculator(entrants) {
  let price = 0;
  if (!entrants) {
    return 0;
  } else if (entrants.length === 0) {
    return 0;
  }

  if (entrants.Adult) {
    price += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Child) {
    price += entrants.Child * data.prices.Child;
  }
  if (entrants.Senior) {
    price += entrants.Senior * data.prices.Senior;
  }
  return price;
}

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
