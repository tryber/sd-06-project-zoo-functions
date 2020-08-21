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

const { animals } = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  // Caso receba nenhum parâmetro
  if (ids.length === 0) return [];
  // Caso receba um ou dois pârametros
  // O método includes analisa dentro de animal.id
  // tem os valores do ids e o filter faz retornar eles.
  return animals.filter(animal => ids.includes(animal.id));
}


function animalsOlderThan(animal, age) {
  return animals
    .find(animalArray => animalArray.name === animal).residents
    .every(ageArray => ageArray.age >= age);
}

function employeeByName(employeeByName) {
    // Caso receba nenhum parâmetro
    if (employeeByName === undefined) return {};
    
    return employees.find(employee => employee.firstName === employeeByName  || employee.lastName === employeeByName)
    
}
console.log(employeeByName('Wishart'))
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
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
