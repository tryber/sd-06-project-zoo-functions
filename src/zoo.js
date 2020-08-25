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
  employees,
  animals,
  prices,
} = require('./data');

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return ids.map(i => data.animals.find(animal => animal.id === i));
}

function animalsOlderThan(animal, age) {
  const animalNameAge = animals.find(i => i.name === animal).residents.every(p => p.age >= age);
  return animalNameAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const first = employees.find(employee => employee.firstName === employeeName);
  const last = employees.find(employee => employee.lastName === employeeName);
  return first || last;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
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
  if (!species) {
    return animals.reduce((ac, animal) => ({ ...ac, [animal.name]: animal.residents.length }), {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  let totalPrice = 0;
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  Object.keys(entrants).forEach((faixaIdade, posicao) => {
    totalPrice += prices[faixaIdade] * Object.values(entrants)[posicao];
  });
  return totalPrice;
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
  Object.entries(prices).forEach((entries) => {
    prices[entries[0]] = Math.round((entries[1] * (1 + (percentage / 100))) * 100) / 100;
  });
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
