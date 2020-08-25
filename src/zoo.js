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

const { employees, animals, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals
  .filter(animal => animal.id === ids[0])
  .concat(animals.filter(animal => animal.id === ids[1]));
}

function animalsOlderThan(animalName, age) {
  return animals
  .find((animal => animal.name === animalName)).residents
  .every((animal => animal.age > age));
}

function employeeByName(employeeName) {
  return employees
  .filter(worker => worker.firstName === employeeName ||
  worker.lastName === employeeName)[0] || {};
}

function createEmployee(personalInfo, associatedWith) {
  const worker = {};
  return Object.assign(worker, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(worker => worker.managers[0] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let result = {};
  if (!species) {
    animals.forEach((animal) => {
      const { name, residents } = animal;
      result[name] = residents.length;
    });
  } else {
    result = animals.find(animal => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants = {}) {
  if (Object.keys(entrants).toString() !== '') {
    return Object.entries(entrants).map(ticket => prices[ticket[0]] * ticket[1])
    .reduce((accumulator, ticket) => ticket + accumulator);
  }
  return 0;
}

function animalMap(options) {
  // seu código aqui
}

function setSchedule() {
  const scheduleMap = {};
  Object.entries(hours).forEach((hourEntry) => {
    scheduleMap[hourEntry[0]] = `Open from ${hourEntry[1].open}am until ${hourEntry[1].close - 12}pm`;
    return scheduleMap[hourEntry[0]];
  });
  scheduleMap.Monday = 'CLOSED';
  return scheduleMap;
}

function getDaySchedule(dayName, scheduleMap) {
  const daySchedule = {};
  daySchedule[dayName] = scheduleMap[dayName];
  return daySchedule;
}

function schedule(dayName) {
  const scheduleMap = setSchedule();
  if (dayName) {
    return getDaySchedule(dayName, scheduleMap);
  }
  return scheduleMap;
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
