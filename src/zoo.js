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
const { employees, animals } = require('./data');

function animalsByIds(...params) {
  return data.animals.filter(animal => params.includes(animal.id));
}

function animalsOlderThan(animalName, animalAge) {
  const animalFinded = data.animals.find(animal => animalName === animal.name);
  return animalFinded.residents.every(resident => resident.age >= animalAge);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employe =>
    employe.firstName === employeeName || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(idManager) {
  const manager = data.employees.flatMap(employee => employee.managers);
  return manager.includes(idManager);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
}

function animalCount(species) {
  if (species === undefined) {
    const objAnimals = {};
    animals.forEach((_, indice) => {
      const speciesAnimal = animals[indice].name;
      const qtdAnimal = animals[indice].residents.length;
      objAnimals[speciesAnimal] = qtdAnimal;
    });
    return objAnimals;
  }
  const animalFinded = data.animals.find(animal => species === animal.name);
  return animalFinded.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length == 0) {
    return 0;
  }
  let sum = 0;
  const arrEntries = Object.entries(entrants);
  arrEntries.forEach(element => sum += (data.prices[element[0]] * element[1]));
  return sum;
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
