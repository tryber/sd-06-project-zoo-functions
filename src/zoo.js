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

const { prices } = data;

function animalsByIds(...ids) {
  return data.animals.filter(species => ids.includes(species.id));
}

function animalsOlderThan(animal, age) {
  return (data.animals.find(species => species.name === animal)
  .residents.every(species => species.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return (
    data.employees.find(emp => emp
    .firstName === employeeName || emp.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, lastName, id } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { firstName, lastName, id, managers, responsibleFor };
}

function isManager(id) {
  return (data.employees.some(employee => employee.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmp = { id, firstName, lastName, managers, responsibleFor };
  return (data.employees.push(newEmp));
}

function animalCount(species) {
  if (species !== undefined) {
    return (data.animals.find(element => (element.name === species)).residents.length);
  }
  const animals = {};
  data.animals.forEach(each => (animals[each.name] = each.residents.length));
  return animals;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
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
  const prices = Object.keys(data.prices);
  const values = Object.values(data.prices);
  const Increment = {};
  prices.forEach((item, i) => {
    const number = ((percentage / 100) * values[i]) + values[i];
    const totalInc = Math.round(number * 100) / 100;
    Increment[item] = totalInc;
  });
  return priceIncrement;
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
