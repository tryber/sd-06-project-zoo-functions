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
const { employees } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids === undefined) return [];
  return ids.map(index => data.animals.find(animal => animal.id === index));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Ao passar o nome de uma espécie e uma idade,
  // testa se todos os animais desta espécie possuem a idade mínima especificada
  return animals.find(index => index.name === animal)
  .residents.every(i => i.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (employeeName === undefined) return {};
  return employees
  .find(index => index.firstName === employeeName || index.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // Cria um novo colaborador a partir de objetos (contendo informações pessoais)
  // e (gerentes e animais gerenciados)
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  // Testa se o id passado é de um gerente
  return employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  // Adiciona um funcionário no fim da list
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  // Sem parâmetros, retorna animais e suas quantidades
  // Com o nome de uma espécie de animal, retorna somente a quantidade
  const animalFind = animals.find(index => index.name === species);
  const countanimal = animals
  .reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {},
  );
  if (species === undefined) return countanimal;
  return animalFind.residents.length;
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
