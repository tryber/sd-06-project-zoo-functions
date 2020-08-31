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
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}
// console.log(animalsByIds('e8481c1d-42ea-4610-8e11-1752cfc05a46'))
function animalsOlderThan(animal, age) {
  let response;
  animals.filter(options => options.name === animal)
    .forEach((position) => {
      response = position.residents.every(animalAge => animalAge.age >= age);
    });
  return response;
  // const filterAnimals = animals.filter((options)=> animal.includes(options.name))
}
// console.log(animalsOlderThan('penguins', 6));

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  let response;
  employees.filter(filterNameFun => filterNameFun.firstName === employeeName
    || filterNameFun.lastName === employeeName)
    .forEach((position) => { response = position; });
  return response;
}
// console.log(employeeByName('Nigel'));

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
