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

const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.filter(kind =>
    (kind.name === animal))[0].residents.every(animalAge => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(employee => employee.firstName === employeeName ||
      employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.map(employee => employee.managers[0])
  .some(employee => employee === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees
  .push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const qtdAnimals = {};
    animals.forEach(animal => (qtdAnimals[animal.name] = animal.residents.length));
    return qtdAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
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
