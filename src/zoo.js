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
const { animals, employees, prices } = require('./data');

function animalsByIds(id1 = '', ...ids) {
  if (id1 === '') {
    return [];
  }
  return animals.filter(element => element.id === id1 || ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
  .residents.every(element2 => element2.age >= age);
}

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  return employees
  .find(employee => console.log(employee) ||
  employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants = {}) {
  if (entrants === {}) {
    return 0;
  }
  let total = 0;

  let adults = 0;

  if (entrants.Adult) {
    adults = entrants.Adult * 49.99;
  }

  let seniors = 0;
  if (entrants.Senior) {
    seniors = entrants.Senior * 24.99;
  }

  let children = 0;

  if (entrants.Child) {
    children = entrants.Child * 20.99;
  }

  total = adults + seniors + children;

  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName = '') {
  // if (dayName === '') {
  // return `Tuesday: Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close}pm,
  //   Wednesday: Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close}pm,
  //   Thursday: Open from ${hours.Thursday.open}am until ${hours.Thursday.close}pm,
  //   Friday: Open from ${hours.Friday.open}am until ${hours.Friday.close}pm,
  //   Saturday: Open from ${hours.Saturday.open}am until ${hours.Saturday.close}pm,
  //   Sunday: Open from ${hours.Sunday.open}am until ${hours.Sunday.close}pm,
  //   Monday: CLOSED`
  // }
}

// console.log(schedule())

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animal = animals.find(specie => specie.id === animalId).residents;
  let oldestAge = 0;
  let oldestAnimal = {};
  animal.forEach((specificAnimal) => {
    if (specificAnimal.age > oldestAge) {
      oldestAge = specificAnimal.age;
      oldestAnimal = specificAnimal;
    }
  });
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const percentageDivided = percentage / 100;
  prices.Adult = Math.round((prices.Adult + (prices.Adult * percentageDivided)) * 100) / 100;
  prices.Senior = Math.round((prices.Senior + (prices.Senior * percentageDivided)) * 100) / 100;
  prices.Child = Math.round((prices.Child + (prices.Child * percentageDivided)) * 100) / 100;
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
