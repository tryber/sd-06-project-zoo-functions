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

function animalsByIds(...ids) {
  // seu código aqui
  const result = [];
  if (ids === undefined) {
    return [];
  }

  for (let i = 0; i < ids.length; i += 1) {
    const animalsMap = animals.filter(animal => animal.id === ids[i]);
    result[i] = animalsMap[0];
  }
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const myAnimal = animals.find(species => species.name === animal);
  return myAnimal.residents.every(one => one.age >= 7);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined || employeeName === '') {
    return {};
  }
  // supondo que não tem pessoas com o mesmo primeiro nome né
  const myEmployee = data.employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return myEmployee;
}
//console.log(employeeByName('Elser'));

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
