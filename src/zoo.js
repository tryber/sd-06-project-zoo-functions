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

const { animals, employees } = data;

const animalsByIds = (...ids) => ids.map(id => animals.find(a => a.id === id));

const animalsOlderThan = (animal, age) => animals.find(a => a.name === animal)
  .residents.every(a => a.age > age);

const employeeByName = employeeName => (
  (employeeName === undefined) ? {} :
    employees.find(e => e.firstName === employeeName || e.lastName === employeeName)
);

const createEmployee = (personalInfo, associatedWith) =>
  Object.assign(personalInfo, associatedWith);

const isManager = id => employees.some(e => e.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => data.employees
  .push({ id, firstName, lastName, managers, responsibleFor });

const animalCount = (species) => {
  // seu código aqui
};

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
