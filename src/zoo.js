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
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, ageInput) {
  return animals
  .filter(item => item.name === animal)
  .map(obj => obj.residents)
  .every((creature, index) => creature[index].age > ageInput);
}

function employeeByName(employeeName) {
  const obj = employees.find((person) => {
    const found = (person.firstName === employeeName ||
    person.lastName === employeeName);
    return found;
  });
  if (obj === undefined) {
    return {};
  }
  return obj;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees
  .some(person => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined && responsibleFor === undefined) {
    managers = [];
    responsibleFor = [];
    employees.push({ id, firstName, lastName, managers, responsibleFor });
  } else {
    employees.push({ id, firstName, lastName, managers, responsibleFor });
  }
}

function animalCount(species) {
  const animalObj = {};
  if (species !== undefined) {
    return animals
    .find(animal => animal.name === species)
    .residents.length;
  }
  animals
  .filter(animal => animal)
  .forEach((obj) => {
    const number = obj.residents.length;
    const name = obj.name;
    animalObj[name] = number;
  });
  return animalObj;
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
