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

const { animals } = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  return (ids.length === 0) ? [] : animals.filter(array => ids.includes(array.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalName => animalName.name === animal).residents
    .every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} : employees
    .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  // Object.assign copia todas as propriedade de um ou mais objetos para outro objeto de destino
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
