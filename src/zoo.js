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
const {
  employees
} = require('./data');

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return ids.map(i => data.animals.find(animal => animal.id === i));
}

function animalsOlderThan(animal, age) {
  const animalNameAge = animals.find(indice => indice.name === animal).residents.every(posicao => posicao.age >= age);
  
  return animalNameAge
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return [];
  }
  return employees.find(employee => employee.firstName === employeeName) || employees.find(employee => employee.lastName === employeeName);
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
