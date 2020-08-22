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
  const listOfAnimals = animals.filter(animal => ids.filter(id => id === animal.id).length > 0);
  return listOfAnimals;
}

function animalsOlderThan(specie, age) {
  const list = animals.filter(animal => animal.name === specie);
  const residents = list.filter(zoo => zoo.residents.every(resident => resident.age > age));
  return (residents.length > 0);
}

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(id, firtsname, lastname, managers = [], responsibleFor = []) {
  const newEmployee1 = {//concat??
    id,
    firtsname,
    lastname,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function isManager(id) {
  const teste = employees.filter(empregado => empregado.managers.some(manager => manager === id));
  return (teste > 0);  
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

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
