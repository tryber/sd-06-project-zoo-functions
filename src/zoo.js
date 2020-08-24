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
  return (employeeName) ? data.employees
  .find(el => el.firstName === employeeName || el.lastName === employeeName) : {};
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
  });
  return (species) ? data.animals.find(el => el.name === species).residents.length : obj;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  const keys = Object.keys(entrants);
  let total = 0;
  const compare = (element) => {
    switch (element) {
      case 'Senior':
        total += data.prices.Senior * entrants.Senior;
        break;
      case 'Child':
        total += data.prices.Child * entrants.Child;
        break;
      case 'Adult':
        total += data.prices.Adult * entrants.Adult;
        break;
      default:
        total += 0;
    }
  };
  keys.forEach(el => compare(el));
  return total;
}
function animalMap(options) {
}

function schedule(dayName) {
  const addObj = (item, day) => {
    item[day] = (data.hours[day].open === 0)
    ? 'CLOSED'
    : `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
  };
  const keys = Object.keys(data.hours);
  const lista = {};
  const solo = {};
  keys.forEach((day) => {
    addObj(lista, day);
  });
  const diaParam = (element) => {
    addObj(solo, element);
    return solo;
  };
  return (dayName) ? diaParam(dayName) : lista;
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
