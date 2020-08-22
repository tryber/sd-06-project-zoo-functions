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
const animalsByIds = (...ids) =>
  animals.filter(item => ids.includes(item.id));
// const id1 = '0938aa23-f153-4937-9f88-4858b24d6bce';
// const id2 = 'e8481c1d-42ea-4610-8e11-1752cfc05a46';
// console.log(animalsByIds(id1, id2));


// ====================================
// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie
// possuem a idade mínima especificada
const animalsOlderThan = (animal, age) => {
  const allResidents = animals.find(item => item.name === animal).residents;
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

  return { id, firstName, lastName, managers, responsibleFor };
};
// const personalInfo = { id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
//   firstName: 'John',
//   lastName: 'Doe' };
// const associatedWith = {
//   managers: ['c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     '9e7d4524-363c-416a-8759-8aa7e50c0992'],
//   responsibleFor: ['0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'] };
// console.log(createEmployee(personalInfo, associatedWith));


// ====================================
// 5- Implemente a função isManager:
// Testa se o id passado é de um gerente
const isManager = (id) => {
  const allManagers = employees.flatMap(item => item.managers);
  return allManagers.includes(id);
};
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));


// ====================================
// 6- Implemente a função addEmployee:
// Adiciona um funcionário no fim da lista
const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const myEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(myEmployee);
  return employees;
};
// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe',
// [
//   '546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
//   'a67a36ee-3765-4c74-8e0f-13f881f6588a',
// ],
// [
//   'ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
//   '210fcd23-aa7b-4975-91b7-0230ebb27b99',
// ]));


// ====================================
// 7- Implemente a função animalCount:
// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade
const verifyAnimals = () => {
  const myAnimals = {};
  for (let index = 0; index < animals.length; index += 1) {
    const nameAnimal = animals[index].name;
    const countAnimal = animals[index].residents.length;
    myAnimals[nameAnimal] = countAnimal;
  }
  return myAnimals;
};
const animalCount = (species) => {
  const myAnimals = verifyAnimals();
  if (species !== undefined) {
    return myAnimals[species];
  }
  return myAnimals;
};
// console.log(animalCount()); // Object
// console.log(animalCount('lions')); //4
// console.log(animalCount('snakes')); //2


// ====================================
function entryCalculator(entrants) {
  // seu código aqui
}


// ====================================
function animalMap(options) {
  // seu código aqui
}


// ====================================
function schedule(dayName) {
  // seu código aqui
}


// ====================================
function oldestFromFirstSpecies(id) {
  // seu código aqui
}


// ====================================
function increasePrices(percentage) {
  // seu código aqui
}


// ====================================
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
