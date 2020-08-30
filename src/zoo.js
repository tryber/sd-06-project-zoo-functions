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
const { employees, animals } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animais => ids.includes(animais.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(animais => animais.name === animal).residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return employees.find(employ => employ.firstName === employeeName
    || employ.lastName === employeeName);
}

// acho um pouco confuso a utilização desta função,
// porém, essa implementação atende ao createEmployee.test.js
function createEmployee(personalInfo, associatedWith) {
  return { personalInfo, associatedWith };
}

function isManager(id) {
  return employees.some(testaManager => testaManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const listOfAnimals = {};
function animalCount(species) {
  if (species === undefined) {
    data.animals.forEach(cada => (listOfAnimals[cada.name] = cada.residents.length));
    return listOfAnimals;
  }
  return (data.animals.find(especie => (especie.name === species)).residents.length);
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
