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
//  criando branch

const data = require('./data');
const { animals, employees } = require('./data');

/*  1- Implemente a função animalsByIds:
 Caso receba nenhum parâmetro, necessário retornar um array vazio
 Ao receber como parâmetro um único id, retorna os animais com este id
 Ao receber mais de um id, retorna os animais que têm um desses ids */

function animalsByIds(...ids) {
  const arrayAnimals = [];
  ids
  .forEach(id => arrayAnimals
    .push(...animals
    .filter(animal => animal.id === id)));
  return arrayAnimals;
}

console.log(animalsByIds());
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
console.log('**********Requisito 1**********');


/*  2- Implemente a função animalsOlderThan:
 Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta
 espécie possuem a idade mínima especificada*/

function animalsOlderThan(animal, age) {
  const array = animals
  .find(findAnimal => findAnimal.name === animal);
  const result = array.residents
  .every(element => element.age > age);
  return result;
}

console.log(animalsOlderThan('otters', 7));
console.log('**********Requisito 2**********');


/* 3- Implemente a função employeeByName:
 Sem parâmetros, retorna um objeto vazio
 Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
 Quando provido o último nome do funcionário, retorna o objeto do funcionário*/

function employeeByName(employeeName) {
  const worker = employees
  .find(person =>
    person.firstName === employeeName || person.lastName === employeeName);
  return worker || {};
}

console.log(employeeByName());
console.log(employeeByName('Emery'));
console.log('**********Requisito 3**********');

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
