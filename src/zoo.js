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
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  const animalID = [];
  ids.forEach(id => animalID.push(animals.find(animal => animal.id === id)));
  return animalID;
}

function animalsOlderThan(animal, age) {
  const creatures = animals.find(creature => creature.name === animal).residents;
  const arrayOfAges = [];

  creatures.forEach(element => arrayOfAges.push(element.age));

  return arrayOfAges.every(old => old >= age);
}

function employeeByName(employeeName) {
  const person = {};
  if (employeeName !== '') {
    Object.assign(person, employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName));
  }
  return person;
}

function createEmployee(personalInfo, associatedWith) {
  const person = {};
  Object.assign(person, personalInfo);
  Object.assign(person, associatedWith);

  return person;
}

function isManager(id) {
  const arrayOfIds = employees.flatMap(employee => employee.managers);

  return arrayOfIds.some(person => person === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const person = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };

  employees.push(person);
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
