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

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter(getById => ids.includes(getById.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.find(findedAnimal => findedAnimal.name === animal);
  return getAnimal.residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(name => name.lastName === employeeName || name.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(managerId => managerId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
}


function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  let adultValue = 0;
  let childValue = 0;
  let seniorValue = 0;
  if (entrants.Adult !== undefined) {
    adultValue = entrants.Adult * prices.Adult;
  }
  if (entrants.Child !== undefined) {
    childValue = entrants.Child * prices.Child;
  }
  if (entrants.Senior !== undefined) {
    seniorValue = entrants.Senior * prices.Senior;
  }
  return adultValue + childValue + seniorValue;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
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
