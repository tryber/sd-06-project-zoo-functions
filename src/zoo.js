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

function animalsByIds(...ids) {
  const animalsListForIds = [];
  if (ids === undefined) {
    return [];
  }
  ids.forEach((id) => {
    const result = animals.filter(animalss => animalss.id === id);
    animalsListForIds.push(result[0]);
  });
  return animalsListForIds;
}

function animalsOlderThan(animal, age) {
  const nameAnimal = data.animals.find(nameA => nameA.name === animal)
  .residents.every(ageA => ageA.age >= age);
  return nameAnimal;
}

function employeeByName(employeeName) {
  const result = employees.filter(name =>
    name.firstName === employeeName || name.lastName === employeeName)[0];
  if (employeeName === undefined) {
    return {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const result = employees.some(idManager => idManager.managers.includes(id.managers.includes(id)));
  return result;
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
  const schedules = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      schedules[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      schedules[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });

  if (dayName === undefined) {
    return schedules;
  }
  return { [dayName]: schedules[dayName] };
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
