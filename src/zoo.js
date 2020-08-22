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


// ====================================
// 1- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
const animalsByIds = (...ids) => animals.filter(item => ids.includes(item.id));
// const id1 = '0938aa23-f153-4937-9f88-4858b24d6bce';
// const id2 = 'e8481c1d-42ea-4610-8e11-1752cfc05a46';
// console.log(animalsByIds(id1, id2));


// ====================================
// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie
// possuem a idade mínima especificada
const animalsOlderThan = (animal, age) => {
  const allResidents = animals
    .find(item => item.name === animal).residents;
  // console.log(allResidents);
  return allResidents.every(item => item.age > age);
};
// console.log(animalsOlderThan('otters', 7)); //true
// console.log(animalsOlderThan('penguins', 10)); //false


// ====================================
// 3- Implemente a função employeeByName:
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário

const employeeByName = (employeeName) => {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(item => item.firstName === employeeName || item.lastName === employeeName);
};
// console.log(employeeByName());
// console.log(employeeByName('Emery'));
// console.log(employeeByName('Wishart'));


// ====================================
// 4- Implemente a função createEmployee:
// Cria um novo colaborador a partir de objetos contendo informações pessoais e
// gerentes e animais gerenciados.
const createEmployee = (personalInfo, associatedWith) => {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  // console.log(managers);
  // console.log(responsibleFor);
  return { id, firstName, lastName, managers, responsibleFor };
};
const personalInfo = { id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe' };
const associatedWith = {
  managers: ['c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992'],
  responsibleFor: ['0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'] };
console.log(createEmployee(personalInfo, associatedWith));


// ====================================
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
