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
const { animals, employees } = require('./data');

const animalsByIds = (...ids) => {
  const retorno = [];
  ids.forEach(id => retorno.push(data.animals.find(animal => animal.id === id)));
  return retorno;
};

const animalsOlderThan = (name, age) =>
animals.find(animal => animal.name === name).residents.every(bixo => bixo.age > age);

const employeeByName = (employeeName) => {
  if (!employeeName) return {};
  return employees.find(funcionario =>
  funcionario.firstName === employeeName ||
  funcionario.lastName === employeeName);
};

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

const isManager = id =>
  data.employees.find(employee => employee.id === id)
  .managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992';

function addEmployee(...value) {
  if (value[3] === undefined) {
    value[3] = [];
    value[4] = [];
  }
  const objeto = {
    id: value[0],
    firstName: value[1],
    lastName: value[2],
    managers: value[3],
    responsibleFor: value[4],
  };
  return data.employees.push(objeto);
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
