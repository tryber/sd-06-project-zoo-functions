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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(element => ids.find(param => param === element.id));
}

function animalsOlderThan(animal, idade) {
  return animals.find(element => element.name === animal).residents.every(element =>
    element.age >= idade);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(element => element.firstName === employeeName ||
    element.lastName === employeeName);
}


function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(element => element.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newObject);
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach((element) => {
      const chave = element.name;
      const valor = element.residents.length;
      obj[chave] = valor;
    });
    return obj;
  }
  return animals.find(animais => animais.name === species).residents.length;
}


function entryCalculator(entrants) {
  let total = 0;
  if (entrants === undefined) return total;
  if (entrants.Adult) total += entrants.Adult * prices.Adult;
  if (entrants.Senior) total += entrants.Senior * prices.Senior;
  if (entrants.Child) total += entrants.Child * prices.Child;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const obj = {};
  const hora = Object.entries(hours);
  if (dayName === undefined) {
    hora.map((dia) => {
      if (dia.includes('Monday')) {
        obj.Monday = 'CLOSED';
        return obj;
      }
      return (obj[dia[0]] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`);
    });
    return obj;
  }
  return hora.filter(name => name[0] === dayName).map((dia) => {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
      return obj;
    }
    obj[dayName] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`;
    return obj;
  })[0];
}

function oldestFromFirstSpecies(id) {
  // seu código aquxi
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
