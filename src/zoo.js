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

// ====================================
// 1- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
// ==========
const animalsByIds = (...ids) => animals.filter(item => ids.includes(item.id));
// const id1 = '0938aa23-f153-4937-9f88-4858b24d6bce';
// const id2 = 'e8481c1d-42ea-4610-8e11-1752cfc05a46';
// console.log(animalsByIds(id1, id2));
// ==========

// ====================================
// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie
// possuem a idade mínima especificada
// ==========
const animalsOlderThan = (animal, age) => {
  const allResidents = animals
    .find(item => item.name === animal).residents;
  // console.log(allResidents);
  return allResidents.every(item => item.age > age);
};
// console.log(animalsOlderThan('otters', 7)); //true
// console.log(animalsOlderThan('penguins', 10)); //false
// ==========

function employeeByName(employeeName) {

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
