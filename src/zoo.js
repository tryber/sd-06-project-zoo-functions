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
  // Caso receba nenhum parâmetro
  if (ids.length === 0) return [];
  // Caso receba um ou dois pârametros
  return animals.filter(animal => ids.includes(animal.id));
}


function animalsOlderThan(animal, age) {
  return animals
    .find(animalArray => animalArray.name === animal).residents
    .every(ageArray => ageArray.age >= age);
}

function employeeByName(employeesByName) {
  // Caso receba nenhum parâmetro
  if (employeesByName === undefined) return {};
  // Caso receba o fistName ou LastName
  return employees
    .find(employee => (employee.firstName === employeesByName ||
    employee.lastName === employeesByName));
}

function createEmployee(personalInfo, associatedWith) {
  const joinEmployee = Object.assign(personalInfo, associatedWith);
  return joinEmployee;
}

function isManager(id) {
  return employees.some(manager => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // Sem parâmetros, retorna animais e suas quantidades
  if (species === undefined) {
    const array = {};
    animals.forEach((speciesAll) => {
      array[speciesAll.name] = speciesAll.residents.length;
    });
    return array;
  }
  // Retorna somente a quantidade a quantidade da especie
  return animals.find(amount => amount.name === species).residents.length;
}

function entryCalculator(entrants) {
  // Retorna 0 se nenhum argumento for passado
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adult = (prices.Adult) * Adult;
  const child = (prices.Child) * Child;
  const senior = (prices.Senior) * Senior;
  const sum = adult + child + senior;
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
