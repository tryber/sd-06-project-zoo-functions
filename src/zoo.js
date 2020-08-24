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

function animalsByIds(...ids) {
  // seu código aqui
  const emptyArray = [];
  if (ids.length === 0) return emptyArray;
  if (ids.length === 1) {
    return animals.filter(singleId => singleId.id === ids[0]);
  }
  if (ids.length > 1) {
    return animals.filter(moreThanOneId => ids.includes(moreThanOneId.id));
  }
  return undefined;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const speciesName = animals.filter(species => species.name === animal);
  const allAnimals = speciesName.flatMap(animalList => animalList.residents);
  return allAnimals.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};

  const providedName = employees
  .filter(name => name.firstName === employeeName || name.lastName === employeeName);
  return providedName[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
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
