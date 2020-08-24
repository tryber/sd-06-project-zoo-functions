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

// 1 - Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
function animalsByIds(...ids) {
  // seu código aqui
  const emptyArray = [];
  if (ids.length === 0) return emptyArray;
  if (ids.length === 1) {
    return animals.filter(singleId => singleId.id === ids[0]);
  }
  if (ids.length > 1) {
    return animals.filter(moreThanOneId => ids.includes(moreThanOneId.id));
  }
  return undefined;
}

// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a idade mínima especificada
function animalsOlderThan(animal, age) {
  // seu código aqui
  const speciesName = animals.filter(species => species.name === animal);
  const allAnimals = speciesName.flatMap(animalList => animalList.residents);
  return allAnimals.every(animalAge => animalAge.age >= age);
}

// 3- Implemente a função employeeByName:
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário
function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const providedName = employees
    .filter(name => name.firstName === employeeName || name.lastName === employeeName);
  return providedName[0];
}

// 4- Implemente a função createEmployee:
// Cria um novo colaborador a partir de objetos contendo informações
// pessoais e gerentes e animais gerenciados.
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

// 5- Implemente a função isManager:
// Testa se o id passado é de um gerente
function isManager(id) {
  // seu código aqui
  return employees.some(manager => manager.managers.includes(id));
}

// 6- Implemente a função addEmployee:
// Adiciona um funcionário no fim da lista
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const neyEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(neyEmployee);
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
