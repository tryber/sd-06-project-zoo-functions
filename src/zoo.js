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
const {
  animals,
  employees,
  prices,
  hours,
} = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(sel => sel.name === animal).residents.every(res => res.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const {
    id,
    firstName,
    lastName,
  } = personalInfo;
  const {
    managers,
    responsibleFor,
  } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(emp => emp.managers.includes(id));
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
  const obj = {};
  if (species === undefined) {
    animals.forEach((animal) => {
      obj[animal.name] = animal.residents.length;
    });
    return obj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  let aux = 0;
  Object.keys(entrants).forEach((entrant, i) => {
    aux += prices[entrant] * Object.values(entrants)[i];
  });
  return aux;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // dsdsdsd
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(elem => elem.id === id).responsibleFor[0];
  return (animals.find(animal => animal.id === animalId).residents)
  .map(elem => Object.values(elem))
  .sort((a, b) => b[2] - a[2])[0];
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
