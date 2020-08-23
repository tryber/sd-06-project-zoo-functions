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
const { animals, prices } = require('./data');

function animalsByIds(...ids) {
  return ids.length === 0 ? ids : animals.filter(idFilter => ids.includes(idFilter.id));
}

function animalsOlderThan(nome, age) {
  return animals.find(animal => animal.name === nome).residents.every(element =>
    element.age >= age);
}

function employeeByName(employeeName) {
  return !employeeName ? {} : data.employees.find(name => name.firstName === employeeName
    || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers: Object.assign([], managers),
    responsibleFor: Object.assign([], responsibleFor),
  });
}

function animalCount(species) {
  if (!species) {
    return Object.fromEntries(animals.map(animal => [animal.name, animal.residents.length]));
  }
  return animals.reduce(function (acc, animal) {
    return animal.name === species ? acc + animal.residents.length : acc;
  }
  , 0);
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((totalPrice, current) => totalPrice +
  (entrants[current] * data.prices[current])
  , 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const opening = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  return !dayName ? opening : Object.fromEntries([[dayName, opening[dayName]]]);
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(current => current.id === id);
  const animalArray = animals.filter(animal => animal.id === employee.responsibleFor[0])
  .flatMap(element => element.residents).sort((a, b) => b.age - a.age);
  return Object.values(animalArray[0]);
}

function increasePrices(percentage) {
  const percent = percentage / 100;
  let arrayPrices = Object.entries(prices);
  Object.values(prices).forEach(function (price, index) {
    arrayPrices[index][1] = Math.round((price + (price * percent)) * 100) / 100;
  });
  arrayPrices = Object.fromEntries(arrayPrices);
  return Object.assign(prices, arrayPrices);
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
