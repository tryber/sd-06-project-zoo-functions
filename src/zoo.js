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

function animalsByIds(...ids) {
  const foundAnimal = [];
  if (ids) {
    ids.forEach(id => foundAnimal.push(...data.animals
      .filter(animal => animal.id === id)));
  }
  return foundAnimal;
}

function animalsOlderThan(animal, age) {
  const checkAllAnimals = data.animals
    .filter(zooAnimal => zooAnimal.name === animal);
  const areAllAnimalsOlder = checkAllAnimals[0].residents
    .every(resident => resident.age > age);
  return areAllAnimalsOlder;
}

function employeeByName(employeeName) {
  let happyEmployee = {};
  if (employeeName) {
    happyEmployee = data.employees
    .find(thatEmployee =>
      thatEmployee.firstName === employeeName ||
      thatEmployee.lastName === employeeName);
  }
  return happyEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newHappiestEmployeeEva = { ...personalInfo, ...associatedWith };
  const newHappyEmplyoeeData = data.employees.concat(newHappiestEmployeeEva);
  return newHappyEmplyoeeData[newHappyEmplyoeeData.length - 1];
}

function isManager(id) {
  const areYouABoss = data.employees.find(bossy => bossy.managers
    .some(idManager => idManager === id));
  if (!areYouABoss) {
    return false;
  }
  return true;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lookANewEmployeeHasBegun = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const newEmployeeMemory = data.employees.push(lookANewEmployeeHasBegun);
  return newEmployeeMemory;
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0
  }
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
