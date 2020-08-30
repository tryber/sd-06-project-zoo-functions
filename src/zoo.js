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

function animalsByIds(...ids) {
  const animalsListForIds = [];
  if (ids === undefined) {
    return [];
  }
  ids.forEach(id => {
    const result = animals.filter(animals => animals.id === id);
    animalsListForIds.push(result[0]);
  });
  return animalsListForIds;
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
  const location = ['NE','NW','SE','SW'];

  if (!options) {
    const animalPerLocation = {};

    location.forEach((location) => {
      const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);

      if (animals.length != 0) animalPerLocation[location] = animals;
    });

    return animalPerLocation;
  }
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
