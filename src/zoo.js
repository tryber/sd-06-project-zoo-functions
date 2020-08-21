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
const { animals } = require('./data');

function animalsByIds(...ids) {
  const arrayResult = [];// array para receber animais advindos do rest
  ids.forEach(id => arrayResult // array push tds animais filtrados de id igual retornados no filter
  .push(...animals
  .filter(animal => animal.id === id)));
  return arrayResult;
}

function animalsOlderThan(animal, age) { // array com tds animals
  const animalCollectionType = animals.filter(animalType => animalType.name === animal);
  return animalCollectionType.every(animalCollectionResident => animalCollectionResident.residents
  .every(animalResidents => animalResidents.age > age));
}// s/ este every ele ñ percorre
console.log(animalsOlderThan('otters', 7));
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  // seu código aqui
}

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
