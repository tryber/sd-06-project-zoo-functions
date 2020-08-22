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
const { prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(element => element.name === animal).residents
    .every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const objEmpty = {};
  if (employeeName === undefined) {
    return objEmpty;
  }
  const empl = employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return empl;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const total = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return total;
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const total = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(total);
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach((element) => {
      const value = element.residents.length;
      const key = element.name;
      obj[key] = value;
    });
    return obj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  let total = 0;
  if (entrants === undefined) return total;
  if (entrants.Adult) total += entrants.Adult * prices.Adult;
  if (entrants.Senior) total += entrants.Senior * prices.Senior;
  if (entrants.Child) total += entrants.Child * prices.Child;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const residAnimals = animals.find(animal => animal.id === idAnimal).residents;
  const onlyValues = residAnimals.map(element => Object.values(element));
  return onlyValues.sort((a, b) => b[2] - a[2])[0];
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
