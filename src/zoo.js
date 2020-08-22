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
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.filter(animalGroup =>
  animalGroup.name === animal)[0].residents.every(eachAnimal => eachAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  return animals.reduce((animalsList, eachAnimal) =>
    ({ ...animalsList, [eachAnimal.name]: eachAnimal.residents.length })
  , {});
}

function entryCalculator(entrants) {
  if (entrants === {} || entrants === undefined) {
    return 0;
  }

  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = prices;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;

  return (adultPrice * Adult) + (seniorPrice * Senior) + (childPrice * Child);
}


function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  return hours.map();
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
