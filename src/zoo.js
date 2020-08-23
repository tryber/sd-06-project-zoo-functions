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

const { animals } = data;
const { employees } = data;
const { prices } = data;

function animalsByIds(...ids) {
  // seu código aqui
  if (!ids) return [];

  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const species = animals.find(element => element.name === animal);
  return species.residents.every(individual => individual.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};

  return employees.find(employee =>
    employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, element) =>
      ({ ...acc, [element.name]: element.residents.length }), {});
  }

  return animals
    .find(element => element.name === species)
    .residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) return 0;

  // if (Object.entries(entrants).length > 0) {
  //   for (let key of Object.keys(entrants)) {
  //     totalEntries += entrants[key] * prices[key]
  //   }
  //   return totalEntries;
  // }

  const entrances = Object.keys(entrants).reduce((total, key) =>
    total + (entrants[key] * prices[key]), 0);
  return entrances;
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
