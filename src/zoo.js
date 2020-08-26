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

function animalsByIds(...entrada) {
  // referencia icaro corporation do Brasil
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/contains
  /* usando o filtro para selecionar os id que estão incluidos no paramentro */
  return data.animals.filter(resposta => entrada.includes(resposta.id));
}

function animalsOlderThan(animal, age) {
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  return animals.find(nome => nome.name === animal).residents
  .every(resultado => resultado.age >= age);
}

function employeeByName(employeeName) {
  const achei = data.employees.find(funcionario => funcionario.firstName === employeeName
  || funcionario.lastName === employeeName);
  return achei || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employe => employe.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/
  const contandoPrimos = (nome, meuArray) => ({ ...nome,
    [meuArray.name]: meuArray.residents.length });
  return !species ? data.animals.reduce(contandoPrimos, {}) :
    (data.animals.find(meuArray => meuArray.name === species)
    .residents.length);
}

function entryCalculator(entrants) {
  const somarEntradas = (soma, pessoas) => soma + (data.prices[pessoas] * entrants[pessoas]);
  return (!entrants || Object.keys(entrants).length === 0)
  ? 0 : Object.keys(entrants).reduce(somarEntradas, 0);
}

function animalMap(options) {
}

function schedule(dayName) {
  const resultado = {};
  const daysOfWeek = Object.keys(data.hours);
  daysOfWeek.forEach((day) => {
    day === 'Monday' ? resultado[day] = 'CLOSED':
      resultado[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
  });
  if (!dayName) { return resultado }
  return { [dayName]: resultado[dayName] };
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
