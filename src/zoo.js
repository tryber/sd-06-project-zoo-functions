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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  return ids.map(animalID => animals.find(animal => animal.id === animalID));
}

function animalsOlderThan(animalName, animalAge) {
  return animals.find(animal => animalName === animal.name).residents
  .every(resident => resident.age >= animalAge);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const getAnimals = () => {
  const animalsNum = {};
  animals.forEach(({ name, residents }) => { animalsNum[name] = residents.length; });
  return animalsNum;
};

function animalCount(species = getAnimals()) {
  if (typeof species === 'object') return species;
  const allSpecies = getAnimals();
  return allSpecies[species];
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const keys = Object.keys(entrants);
  const sumPrices = (acc, key) => acc + (entrants[key] * prices[key]);
  return keys.reduce(sumPrices, 0);
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
