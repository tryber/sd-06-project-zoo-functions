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

const animalList = data.animals;
const employeeList = data.employees;


function animalsByIds(...ids) {
  const returnedAnimals = [];
  if (ids.length === 0) return returnedAnimals;
  for (let index = 0; index < ids.length; index += 1) {
    returnedAnimals.push(animalList.find(animal => animal.id === ids[index]));
  }
  return returnedAnimals;
}

function animalsOlderThan(animal, age) {
  const desiredAnimal = animalList.find(searchAnimal => searchAnimal.name === animal);
  const olderAnimals = desiredAnimal.residents.filter(resident => resident.age >= age);
  return olderAnimals.length === desiredAnimal.residents.length;
}

function employeeByName(employeeName) {
  if (employeeName == null) return {};
  const desiredEmployee = employeeList
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return desiredEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
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
