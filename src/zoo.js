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
const data = require('./data.js');

const { animals, employees } = data;

function animalsByIds(...ids) {
  const arr = [];
  if (ids === undefined) {
    return arr;
  }
  ids.map((id) => {return arr.push(animals.find(animal => animal.id === id))});
  return arr;
}

// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem
// a idade mínima especificada

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalName = animals.find(animalName => animalName.name === animal);
  const checkAge = animalName.residents.every(residentAge => age < residentAge.age);
  return checkAge;
}

/* Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
Quando provido o último nome do funcionário, retorna o objeto do funcionário
Sem parâmetros, retorna um objeto vazio */

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {return {}}
  const findEmployee = employees.find((employee) =>
  employee.firstName === employeeName || employee.lastName === employeeName
  );
  return findEmployee;
}
/* Cria um novo colaborador a partir de objetos contendo informações pessoais,
gerentes e animais gerenciados */
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

// Testa se o id passado é de um gerente
function isManager(id) {
  // seu código aqui
  const findManager = employees.some(employee => employee.managers.includes(id));
  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species !== undefined) {
    const animalsName = animals.find(animal => animal.name === species);
    return animalsName.residents.length;
  } else {
    const animalsCount = animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
    return animalsCount;
  }
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
