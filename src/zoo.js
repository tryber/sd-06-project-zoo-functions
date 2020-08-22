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

// 1- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids

const data = require('./data');
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  const filteredAnimals = animals.filter(animal => ids.includes(animal.id));
  return filteredAnimals;
}

// 2 - Ao passar o nome de uma espécie e uma idade, testa se todos os animais
// desta espécie possuem a idade mínima especificada

function animalsOlderThan(animal, age) {
  return animals.find(eachAnimal => eachAnimal.name === animal)
  .residents.every(residents => residents.age >= age);
}

// 3 - Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  const employee = employees.find(eachEmployee => eachEmployee.firstName === employeeName
      || eachEmployee.lastName === employeeName);
  return employee;
}

// 4- Cria um novo colaborador a partir de objetos contendo informações pessoais
// e gerentes e animais gerenciados.

function createEmployee(personalInfo, associatedWith) {
  return ({
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  });
}

// 5 - Testa se o id passado é de um gerente

function isManager(id) {
  return employees.some(manager => manager.managers.includes(id));
}

// 6 - Adiciona um funcionário no fim da lista

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

//  7- Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species = '') {
  if (species === '') {
    const animalsCount = animals.reduce((acc, cur) => {
      acc[cur.name] = cur.residents.length;
      return acc;
    }, {});
    return animalsCount;
  }
  return animals.find(lookedSpecie => lookedSpecie.name === species).residents.length;
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
