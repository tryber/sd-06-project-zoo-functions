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
  const foundAnimal = [];
  if (ids) {
    ids.forEach(id => foundAnimal.push(...data.animals
      .filter(animal => animal.id === id)));
  }
  return foundAnimal;
}

function animalsOlderThan(animal, age) {
  const checkAllAnimals = data.animals
    .filter(zooAnimal => zooAnimal.name === animal);
  const areAllAnimalsOlder = checkAllAnimals[0].residents
    .every(resident => resident.age > age);
  return areAllAnimalsOlder;
}

function employeeByName(employeeName) {
  let happyEmployee = {};
  if (!employeeName) {
    return happyEmployee;
  }
  happyEmployee = data.employees
  .find(thatEmployee =>
    thatEmployee.firstName === employeeName ||
    thatEmployee.lastName === employeeName);
  return happyEmployee;
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
