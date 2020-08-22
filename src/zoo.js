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
const { employees } = require('./data');

function animalsByIds(...ids) {
  if (ids === []) {
    return [];
  } else if (ids.lenght === 1) {
    return data.animals.filter(animal => animal.id === ids[0]);
  }
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(animal2 => animal2.name === animal)
  .some(animal3 => animal3.residents.every(idade => idade.age > age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.filter(funcionario => (
    funcionario.firstName === employeeName || funcionario.lastName === employeeName))[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}


function isManager(id) {
  return data.employees.some(funcionario => funcionario.managers[0] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) managers = []
  if (responsibleFor === undefined) responsibleFor = []
  return data.employees.push({ id, firstName, lastName, managers,responsibleFor });
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
