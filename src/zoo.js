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
  // seu código aqui
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const { residents: selectedsAnimal } = data.animals.find(item => item.name === animal);

  return selectedsAnimal.every(item => item.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return data
    .employees.find(item => (item.firstName === employeeName || item.lastName === employeeName));
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  const createdEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return createdEmployee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.some(itemId => itemId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const createdEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(createdEmployee);
}

function animalCount(species) {
  // seu código aqui
  const returnObj = {};
  if (!species) {
    data.animals.forEach(function (animal) { returnObj[animal.name] = animal.residents.length; });
    return returnObj;
  }
  const animalSelected = data.animals.find(animal => animal.name === species);
  return animalSelected.residents.length;
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
