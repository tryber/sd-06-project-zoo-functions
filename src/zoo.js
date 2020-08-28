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
  return data.animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(element => element.name === animal)
  .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const retorno = data.employees
  .find(trab => trab.firstName === employeeName || trab.lastName === employeeName);
  return retorno;
}

function createEmployee(personalInfo, associatedWith) {
  const retorno = { ...personalInfo, ...associatedWith };
  return retorno;
}

function isManager(id) {
  return data.employees.some(gerente => gerente.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined || species === '') {
    const objVazio = {};
    data.animals.map((animal) => { objVazio[animal.name] = animal.residents.length});
    return objVazio;
  } else {
    const findTheAnimal = data.animals.find(animal => animal.name === species);
    return findTheAnimal.residents.length;
  }
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
 }
 let totalPrice = 0;
 if (entrants.Adult) {
   totalPrice += (entrants.Adult * data.prices.Adult);
 }
 if (entrants.Senior) {
   totalPrice += (entrants.Senior * data.prices.Senior);
 }
 if (entrants.Child) {
   totalPrice += (entrants.Child * data.prices.Child);
 }
 return totalPrice;
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
