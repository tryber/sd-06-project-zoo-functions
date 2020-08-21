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
  if (ids === []) {
    return [];
  } else if (ids.length === 1) {
    return data.animals.filter(animal => animal.id === ids[0]);
  }
  return data.animals.filter(animal => ids.some(id => (animal.id === id)));
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(allAnimals => allAnimals.name === animal)
  .some(pets => pets.residents.every(pet => pet.age >= age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.filter((emp) => {
    const emplo = employeeName;
    return (emp.firstName === emplo || emp.lastName === emplo);
  })[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(emplo => (emplo.managers[0] === id || emplo.managers[1] === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return data.animals.map((animal) => {
      const nome = animal.name;
      return {
        [nome]: animal.residents.length,
      };
    }).reduce((acc, i) => Object.assign(acc, i));
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  let result = 0;
  if (entrants.Adult) {
    result = entrants.Adult * data.prices.Adult;
  }
  if (entrants.Child) {
    result += entrants.Child * data.prices.Child;
  }
  if (entrants.Senior) {
    result += entrants.Senior * data.prices.Senior;
  }
  return result;
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
