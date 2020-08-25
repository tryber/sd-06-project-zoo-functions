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
// const { employees } = require('./data');
// const { employees } = require('./data');
//  const { animals } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(animale => animale.name === animal)
  .residents.every(animalee => animalee.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return data.employees.find(name =>
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(idManeger => idManeger.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employeeAdd = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(employeeAdd);
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
