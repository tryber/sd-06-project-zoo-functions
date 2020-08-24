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
  return (ids.length === 0) ? [] : animals.filter(array => ids.includes(array.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalName => animalName.name === animal).residents
    .every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} : employees
    .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

// console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  // Object.assign copia todas as propriedade de um ou mais objetos para outro objeto de destino
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(manager => manager.managers.includes(id));
}

// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const object = {};
  if (!species) {
    animals.forEach((specie) => {
      object[specie.name] = specie.residents.length;
    });
    return object;
  }
  return animals.find(specie => specie.name === species).residents.length;
}

// console.log(animalCount())

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
}

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

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
