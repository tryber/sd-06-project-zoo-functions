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
const { animals, employees } = require('./data');

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
  const entryObj = Object.entries(entrants);
  for (let i = 0; i < entryObj.length; i += 1) {
    if (entryObj[i][0] === 'Adult') {
      total += entryObj[i][1] * 49.99;
    } else if (entryObj[i][0] === 'Senior') {
      total += entryObj[i][1] * 24.99;
    } else {
      total += entryObj[i][1] * 20.99;
    }
  }
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  if (!dayName) {
    return ''
  }
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
