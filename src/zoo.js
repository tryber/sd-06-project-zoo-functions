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
// const assert = require('assert');
const data = require('./data');
const { animals } = require('./data');
// const { hours } = require('./data')

function animalsByIds(...ids) {
  // rest parameter inserido para que pudessem ser utilizados quantos parametros necessarios
  const searchAnimalsById = animals
  .filter(animal => ids.includes(animal.id));
  // filter para filtrar valores
  return searchAnimalsById;
}

function animalsOlderThan(animal, age) {
  const ageComparator = animals
.find(creature => creature.name === animal)
// encontrar os animais através do nome usando find
.residents.every(ageOf => ageOf.age >= age);
// utilizando every comparar as idades de todos(every) os elementos dentro de residents
  return ageComparator;
}


function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
