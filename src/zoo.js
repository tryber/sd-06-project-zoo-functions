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
const { animals } = require('./data.js');

function animalsByIds(...ids) {
animalId = animals.filter(ident => ids.includes(ident.id));
return animalId;
}
const rest = animalsByIds();
console.log(rest);

function animalsOlderThan(animal, age) {
  return animals.find(animal, age);
}

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui -Sem parâmetros, retorna um objeto vazio
}

function isManager(id) {
  // seu código aqui - Testa se o id passado é de um gerente
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui  - Adiciona um funcionário no fim da lista'
}

function animalCount(species) {
  // seu código aqui - Sem parâmetros, retorna animais e suas quantidades
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui -Sem parâmetros, retorna animais categorizados por localização
}

function schedule(dayName) {
  // seu código aqui - Sem parâmetros, retorna um cronograma legível para humanos
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
}

function employeeCoverage(idOrName) {
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
