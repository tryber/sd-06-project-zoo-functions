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

const { employees, animals } = require('./data');

function animalsByIds(...ids) {
  return animals
  .filter(animal => animal.id === ids[0])
  .concat(animals.filter(animal => animal.id === ids[1]));
}

function animalsOlderThan(animalName, age) {
  return animals.every(animal => animal.name === animalName && animal.age > age);
}

function employeeByName(employeeName) {
  return employees
  .filter(worker => worker.firstName === employeeName ||
  worker.lastName === employeeName)[0] || {};
}

function createEmployee(personalInfo, associatedWith) {
  const worker = {};
  return Object.assign(worker, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(worker => worker.managers[0] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(...entrants) {
  const ticketValue = 0;
  if ( entrants.values === '' || entrants.values === {}) {
    return 0;
  }
  return ticketValue;
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
