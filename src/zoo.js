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
  const result = [];
  ids.forEach((eachId) => {
    data.animals.forEach(animal => (animal.id === eachId ? result.push(animal) : null));
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const filteredAnimals = data.animals.filter(eachAnimal => eachAnimal.name === animal);
  return filteredAnimals[0].residents.every(eachAnimal => eachAnimal.age > age);
}

function employeeByName(employeeName) {
  const employeeObj = data.employees.filter((employee) => {
    const testFName = employee.firstName === employeeName;
    const testLName = employee.lastName === employeeName;
    return (testFName) || (testLName);
  })[0];
  return (employeeObj === undefined) ? {} : employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(each => each === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
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
