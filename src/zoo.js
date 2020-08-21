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
  // seu código aqui
  return ids.reduce((total, id) =>
    total.concat(data.animals.filter(animal => animal.id === id))
  , []);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(obgAnimal => animal === obgAnimal.name)
  .residents.every(animalResident => animalResident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) { return {}; }
  return employees
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return data.animals.reduce((total, specie) => {
      total[specie.name] = specie.residents.length;
      return total;
    }, {});
  }
  return data.animals.find(specie => specie.name === species).residents.length;
}
// console.log(animalCount());

function entryCalculator(entrants = {}) {
  // seu código aqui
  let { Adult, Child, Senior } = entrants;
  const priceAdult = data.prices.Adult;
  const priceChild = data.prices.Child;
  const priceSenior = data.prices.Senior;
  if (!Adult) { Adult = 0; }
  if (!Child) { Child = 0; }
  if (!Senior) { Senior = 0; }
  return ((Adult * priceAdult) + (Child * priceChild) + (Senior * priceSenior));
}
// console.log(entryCalculator());

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
