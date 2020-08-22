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

function animalsByIds(ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.find(animalId => animalId.id === ids)
}

function animalsOlderThan(animal, age) {
  const filteringAnimals = animals.find(targetAnimal => targetAnimal.name === animal);
  const checkingAge = filteringAnimals.residents.every(animalAges => animalAges.age > age);
  return checkingAge;

}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const findingEmployees =  employees.find((employeeNames => (employeeNames.firstName === employeeName || employeeNames.lastName === employeeName)))
  return findingEmployees;

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
