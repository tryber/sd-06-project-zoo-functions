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
  return ids.map(ele => data.animals.find(el => el.id === ele));
}

function animalsOlderThan(animal, age) {
  const registro = data.animals.find(animals => animals.name === animal).residents
  .map(element => element.age)
  .every((ages => ages >= age));
  return registro;
}

function employeeByName(employeeName) {
  return (employeeName) ? data.employees.find((el) => {
    return el.firstName === employeeName || el.lastName === employeeName;
  }) : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newObj = Object.assign(personalInfo, associatedWith);
  return newObj;
}

function isManager(id) {
  return data.employees.map(el => el.managers)
  .reduce((acc, actual) => acc.concat(actual))
  .some(element => element === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees[employees.length] = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees;
}

function animalCount(species) {
  const obj = {};
  data.animals.forEach((el) => {
    obj[el.name] = el.residents.length;
  })
  return (species) ? data.animals.find(el => el.name === species).residents.length : obj;
}
function entryCalculator(entrants) {
  /*  if (entrants) {
    let total = (entrants.Adult * data.prices.Adult) + (entrants.Senior * data.prices.Senior)
     + (entrants.Child * data.prices.Child)
    return total
  } else {
    return 0
  } */
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
