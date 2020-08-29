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

function animalsByIds(ids) {
}

function animalsOlderThan(animal, age) {
}

function employeeByName(employeeName) {
}

function createEmployee(personalInfo, associatedWith) {
}

function isManager(id) {
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
}

function animalCount(species) {
}

function entryCalculator(entrants) {
}

function animalMap(options) {
}

function schedule(dayName) {
  const allDays = Object.keys(data.hours);
  const schedule = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      schedule[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });

  if (dayName === undefined) return schedule; 
  return { [dayName]: schedule[dayName] };
}

function oldestFromFirstSpecies(id) {
}

function increasePrices(percentage) {
}

function employeeCoverage(idOrName) {
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
