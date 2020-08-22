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

const { employees, animals, prices } = require('./data');

function animalsByIds(...ids) {
  if (typeof ids != null){
    return animals
    .filter(animal => animal.id === ids[0])
    .concat(animals.filter(animal => animal.id === ids[1]));
  }
  return [];
}

function animalsOlderThan(animalName, age) {
  return animals.every(animal => animal.name === animalName && animal.age > age);
}


function employeeByName(employeeName) {
  return employees
  .filter(worker => worker.firstName === employeeName ||
  worker.lastName === employeeName)[0] || {}
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return employees.some(worker => worker.managers[0] === id)
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  //seu código aqui
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
  const ticketsPrices = prices.forEach((newPrice) => newPrice * (1 + percentage/100))
  return ticketsPrices
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
