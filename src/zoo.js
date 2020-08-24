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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  } else if (ids.length === 1) {
    return animals.filter(animalId => animalId.id === ids[0]);
  }
  return animals.filter(animalId => ids.includes(animalId.id));
}

function animalsOlderThan(animal, age) {
  const nameAnimals = animals.find(nameAnimal => nameAnimal.name === animal);
  return nameAnimals.residents.every(animalAge => animalAge.age > age);
}


function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const Manager = data.employees.some(idManager => idManager.managers
    .some(managerId => managerId === id));
  return Manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, an) => ({ ...acc, [an.name]: an.residents.length }), {});
  }
  return animals.find(nameAnimal => nameAnimal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, cur) => acc +
  (entrants[cur] * prices[cur]), 0);
}
function animalMap(options) {

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
