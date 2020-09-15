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
  let arrayResults = [];
  if (ids.length === 0) {
    return arrayResults;
  }
  arrayResults.push(data.animals.find(element => {
    if (ids === element.id) {
      return element;
    }
  })
  )
  return arrayResults;
}
// return [1];

function animalsOlderThan(animal, age) {
  // seu código aqui
}

// resolução abaixo foi consultada no código https://github.com/tryber/sd-06-project-zoo-functions/blob/e1ac4308fc924469c75844fd7de70a0e02311f6a/src/zoo.js
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find((name) => name.firstName === employeeName || name.lastName === employeeName);
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
