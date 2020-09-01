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
  return data.animals.filter(idAnimal => ids.includes(idAnimal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(nameAnimal => nameAnimal.name === animal)
  .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  return !employeeName ? {} : data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return Object.fromEntries(data.animals.map(animal => [animal.name, animal.residents.length]));
  }
  return data.animals.find(nameSpecies => nameSpecies.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, curr) => acc +
    (entrants[curr] * data.prices[curr]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  let old = 0;
  let result;
  const firstAnimal = data.employees.find(name => name.id === id).responsibleFor[0];
  data.animals.find(name => name.id === firstAnimal).residents.forEach((pet) => {
    if (pet.age > old) {
      old = pet.age;
      result = pet;
    }
  });
  const oldestAnimal = [result.name, result.sex, result.age];
  return oldestAnimal;
}
// Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
function increasePrices(percentage) {
  const valuePercentage = percentage / 100;
  Object.keys(data.prices).forEach((valor) => {
    data.prices[valor] = Math
    .round((data.prices[valor] + (data.prices[valor] * valuePercentage)) * 100) / 100;
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
