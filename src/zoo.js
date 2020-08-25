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
// const { employees } = require('./data');
// const { animals } = require('./data');
// const { animals } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(getAnimal => getAnimal.name === animal)
    .residents.every(ageAnimal => ageAnimal.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(name =>
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((objectAnimals, current) => {
      objectAnimals[current.name] = current.residents.length;
      return objectAnimals;
    }, {});
  }
  return data.animals.find(getAnimal => getAnimal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((totalPrice, ticket) =>
    totalPrice + (entrants[ticket] * data.prices[ticket]), 0);
}

function animalMap(options) {
  // seu código aqui
}

const openingHours = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};
function schedule(dayName) {
  if (!dayName) return openingHours;
  const key = Object.keys(openingHours).find(day => day === dayName);
  return { [key]: openingHours[key] };
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const whichAnimal = data.animals.find(animal => animal.id === firstAnimal).residents;
  const oldestAnimal = whichAnimal.reduce((accumulator, animalAge) =>
    (accumulator.age > animalAge.age ? accumulator : animalAge), []);
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const result = Object.keys(data.prices).reduce((newPrices, price) => {
    newPrices[price] = Math.round((data.prices[price] + data.prices[price] * (percentage / 100)) * 100) / 100;
    return newPrices;
  }, {});
  return Object.assign(data.prices, result);
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
