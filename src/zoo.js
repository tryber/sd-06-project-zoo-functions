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

// destructuring to verify ids, spread to receive n number of arrays
function animalsByIds(...ids) {
  return data.animals.filter(({ id }, index) => id === ids[index]);
}

// filter for the animals, MAGIC flatMap to access residents and every to test age
function animalsOlderThan(animal, age) {
  return data.animals
  .filter(item => item.name === animal)
  .flatMap(item => item.residents)
  .every(item => item.age > age);
}

function employeeByName(employeeName) {
  let output = {};

  // filter the employee, returns the object within the array or the empty obj
  const employeeObject = data.employees
  .filter(({ firstName, lastName }) =>(firstName === employeeName || lastName === employeeName));
  if (employeeObject.length !== 0) {
    output = employeeObject[0];
  }
  return output;
}

console.log(employeeByName());

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
