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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => {
    for (let i = 0; i < ids.length; i += 1) {
      if (animal.id === ids[i]) {
        return true;
      }
    }
    return false;
  });
}

function animalsOlderThan(animal, age) {
  return animals
    .find(specie => specie.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const name = employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);

  if (name) {
    return name;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(employee => employee.managers
      .some(managerId => managerId === id));
}

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  species = animals.map(animal => animal.name);
  const count = animals.map(animal => animal.residents.length);
  const creatArrayAnimals = {};

  for (let i = 0; i < count.length; i += 1) {
    creatArrayAnimals[species[i]] = count[i];
  }

  return creatArrayAnimals;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }

  const entrantsKeys = Object.keys(entrants);
  const entrantsQuantity = Object.values(entrants);

  return entrantsQuantity
    .map((entrant, index) => entrant * prices[entrantsKeys[index]])
    .reduce((acc, curr) => acc + curr, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  return dayName;
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
