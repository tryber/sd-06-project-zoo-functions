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
const {animals, employees, hours, prices} = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return ids;
  }
  return data.animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const animalType = data.animals
    .find(currentAnimal => currentAnimal.name === animal);

  return animalType.residents
    .every(currentResident => currentResident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};

  return data.employees
    .find(employee => (
      employee.firstName === employeeName || employee.lastName === employeeName
    ));
}

function createEmployee(personalInfo, associatedWith) {
  const {id, firstName, lastName} = personalInfo;
  const {managers, responsibleFor} = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
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
