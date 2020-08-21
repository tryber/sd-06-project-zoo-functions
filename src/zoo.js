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
  if (!ids) {
    return [];
  }
  const idsParameters = ids;
  return data.animals.filter(idFind => idFind.id === idsParameters[0] ||
  idFind.id === idsParameters[1]);
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(especie => especie.name === animal)
  .every(checkAge => checkAge.residents.every(ages => ages.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(findEmployeer => findEmployeer.firstName === employeeName ||
    findEmployeer.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const employeer = personalInfo;
  const { managers } = associatedWith;
  const { responsibleFor } = associatedWith;
  employeer.managers = managers;
  employeer.responsibleFor = responsibleFor;
  return employeer;
}

function isManager(id) {
  return data.employees.some(idCheck => idCheck.managers.some(idManager => idManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  return data.employees.push(newEmployee);
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
