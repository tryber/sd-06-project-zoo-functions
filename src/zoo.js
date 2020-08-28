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
const { employees } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(Element => Element.name === animal)
  .residents.every(Element => Element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(Element =>
    Element.firstName === employeeName || Element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(Element => Element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const array = {
    id, firstName, lastName, managers, responsibleFor,
  };
  return employees.push(array);
}

function animalCount(species) {
  if (species === undefined) {
    const object = {};

    animals.forEach(element => object[element.name] = element.residents.length);
    return object;
  }
  const animal = animals.find(element => element.name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const days = Object.keys(data.hours);
  const scheduleObject = {};

  days.forEach((day) => {
    if (day === 'Monday') {
      scheduleObject[day] = 'CLOSED';// 'Monday': 'CLOSED'
    } else {
      const open = data.hours[day].open;// = 8
      const closed = data.hours[day].close - 12;// = 6
      scheduleObject[day] = `Open from ${open}am until ${closed}pm`;// 'Tuesday': 'Open from 8am until 6pm'
    }
  });

  if (dayName === undefined) scheduleObject;
    return { [dayName]: scheduleObject[dayName] };
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
