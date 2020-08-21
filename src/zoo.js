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

function animalsByIds(id1 = '', ...ids) {
  if (id1 === '') {
    return [];
  }
  return animals.filter(element => element.id === id1 || ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
  .residents.every(element2 => element2.age >= age);
}

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  return employees
  .find(employee => console.log(employee) ||
  employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // fazer
}

function entryCalculator(entrants = {}) {
  if (entrants === {}) {
    return 0;
  }
  let total = 0;

  let adults = 0;

  if (entrants.Adult) {
    adults = entrants.Adult * 49.99;
  }

  let seniors = 0;
  if (entrants.Senior) {
    seniors = entrants.Senior * 24.99;
  }

  let children = 0;

  if (entrants.Child) {
    children = entrants.Child * 20.99;
  }

  total = adults + seniors + children;

  return total;
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
