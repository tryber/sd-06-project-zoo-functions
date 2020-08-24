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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const result = animals.find(element => element.name === animal);
  return result.residents.every(element => element.age >= age);
}

function employeeByName(employeeName = '') {
  // seu código aqui
  if (employeeName === '') return {};
  return employees.find(element =>
    element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const obj = {};
  if (!species) {
    animals.forEach(element => (obj[element.name] = element.residents.length));
    return obj;
  }
  return animals.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const entrantKeys = Object.keys(entrants);
  return entrantKeys.reduce((acc, current, index) => {
    const aux = prices[current] * Object.values(entrants)[index];
    return acc + aux;
  }, 0);
}
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const obj = {};
  const days = Object.keys(hours);
  const scheduleValue = Object.values(hours);
  days.forEach((element, index) => {
    if (scheduleValue[index].open === 0) {
      obj[element] = 'CLOSED';
    } else {
      obj[element] = `Open from ${scheduleValue[index].open}am until ${scheduleValue[index].close - 12}pm`;
    }
  });
  if (!dayName) {
    return obj;
  }
  return { [dayName]: obj[dayName] };
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
