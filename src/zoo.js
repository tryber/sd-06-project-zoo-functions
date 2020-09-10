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
const data = require('./data.js');
const { employees, animals, prices } = require('./data.js');

function animalsByIds(...ids) {
  const animalId = data.animals.filter(ident => ids.includes(ident.id));
  return animalId;
}
function animalsOlderThan(animal, age) {
  return data.animals.find(animalThan => animalThan.name === animal)
  .residents.every(ageThan => ageThan.age >= age);
}
function employeeByName(employeeName) {
  const objUnder = {};
  if (employeeName === undefined) return objUnder;
  const returnEmployee = employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return returnEmployee;
}
function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  let createInfo = {};
  if (id === undefined) return createInfo;
  createInfo = employees.map(item => item.managers)
    .map(element => element.includes(id))
    .some(item2 => item2 === true);
  return createInfo;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  const objAnimal = { };
  if (!species) {
    data.animals.forEach((animal) => { objAnimal[animal.name] = animal.residents.length });
    return objAnimal;
  }
  const numnimal = animals.find(animal => animal.name === species);
  return numnimal.residents.length;
}

function entryCalculator(entrants) {
  const result = 0;
  if (entrants === undefined) return result;
  const keys = Object.keys(entrants);
  const price = keys.reduce((cc, current) => cc + (entrants[current] * prices[current]), 0);
  return price;
}
module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
