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
  const result = employees.some(idManager => idManager.managers.includes(id));
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const result = employees.push({ id, firstName, lastName, managers, responsibleFor });
  return result;
}

function animalCount(species) {
  if (species === undefined) {
    const list = {};
    animals.forEach(log => (list[log.name] = log.residents.length));
    return list;
  }
  return animals.find(animal => (animal.name === species)).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
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
  const employee = employees.find(species => species.id === id).responsibleFor[0];
  const animal = animals.find(anima => anima.id === employee);
  let animalResult = animal.residents[0];
  animal.residents.forEach((animalss) => {
    animalResult = (animalss.age > animalResult.age) ? animalss : animalResult;
  });
  return [animalResult.name, animalResult.sex, animalResult.age];
}

function increasePrices(percentage) {
  const porcentageNew = (percentage / 100) + 1;
  prices.Adult = Math.round(prices.Adult * porcentageNew * 100) / 100;
  prices.Child = Math.round(prices.Child * porcentageNew * 100) / 100;
  prices.Senior = Math.round(prices.Senior * porcentageNew * 100) / 100;
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
