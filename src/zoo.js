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
const { employees, animals } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animais => ids.includes(animais.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(animais => animais.name === animal).residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return employees.find(employ => employ.firstName === employeeName
    || employ.lastName === employeeName);
}

// acho um pouco confuso a utilização desta função,
// porém, essa implementação atende ao createEmployee.test.js
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(testaManager => testaManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const listOfAnimals = {};
function animalCount(species) {
  if (species === undefined) {
    data.animals.forEach(cada => (listOfAnimals[cada.name] = cada.residents.length));
    return listOfAnimals;
  }
  return (data.animals.find(especie => (especie.name === species)).residents.length);
}

function entryCalculator(entrants) {
  let totalEntries = 0;
  if (entrants === undefined ||
      Object.entries(entrants).length === 0) {
    return 0;
  } else if (entrants.Adult) {
    totalEntries += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Senior) {
    totalEntries += entrants.Senior * data.prices.Senior;
  }
  if (entrants.Child) {
    totalEntries += entrants.Child * data.prices.Child;
  }
  return totalEntries;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const daySchedule = {};
  const weekSchedule = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) { return weekSchedule };
  daySchedule[dayName] = weekSchedule[dayName];
  return daySchedule;
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
