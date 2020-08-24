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
const { animals, employees, hours, prices } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(({ id }, i) => id === ids[i]);
}


function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.filter(entry => entry.name === animal).some(pet => (
    pet.residents.every(pet2 => pet2.age >= age)
    ));
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees.find(name => (
    name.firstName === employeeName || name.lastName === employeeName
    ));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  return employees.some(person => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmp = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmp);
  return employees;
}

function animalCount(species = '') {
  // seu código aqui
  const allCounts = {};
  if (species !== '') {
    return animals.find(pet => pet.name === species).residents.length;
  }
  animals.forEach((pet) => {
    allCounts[pet.name] = pet.residents.length;
  });
  return allCounts;
}

function entryCalculator(entrants) {
  // seu código aqui
  let total = 0;
  if (!entrants) {
    return total;
  }
  if (entrants.Adult) {
    total += entrants.Adult * prices.Adult;
  }
  if (entrants.Senior) {
    total += entrants.Senior * prices.Senior;
  }
  if (entrants.Child) {
    total += entrants.Child * prices.Child;
  }
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  let result = {};
  const daysObj = Object.entries(hours);  
}
console.log(schedule())

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
