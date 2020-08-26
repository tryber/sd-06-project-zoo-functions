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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter(getById => ids.includes(getById.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.find(findedAnimal => findedAnimal.name === animal);
  return getAnimal.residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(name => name.lastName === employeeName || name.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(managerId => managerId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return Object.fromEntries(animals
      .map(allAnimals => [allAnimals.name, allAnimals.residents.length]));
  }
  return animals
    .find(countAnimal => countAnimal.name === species)
    .residents.length;
}


function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const keys = Object.keys(entrants);
  const totalPrice = keys
    .reduce((sum, currentValue) => sum + (entrants[currentValue] * prices[currentValue]), 0);
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
  // seu código aqui
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const fullName = employees.map(employFullName => `${employFullName.firstName} ${employFullName.lastName}`);
    const animal = employees.map(animalId => animalId.responsibleFor);

  }

}
employeeCoverage();

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
