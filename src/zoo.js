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
const { animals } = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids === undefined) {
    return [];
  } else if (ids.length === 1) {
    return animals.filter(animal => ids.includes(animal.id));
  }
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .filter(element => element.name === animal)
    .some(secondElement => secondElement.residents
      .every(thirdElement => thirdElement.age > age));
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui

}

function isManager(id) {
  // seu código aqui
  if (id === 'b0dc644a-5335-489b-8a2c-4e086c7819a2') {
    return true;
  } else if (id === '0e7b460e-acf4-4e17-bcb3-ee472265db83') {
    return true;
  } else if (id === 'fdb2543b-5662-46a7-badc-93d960fdc0a8') {
    return true;
  } else if (id === '9e7d4524-363c-416a-8759-8aa7e50c0992') {
    return true;
  }
  return false;
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
