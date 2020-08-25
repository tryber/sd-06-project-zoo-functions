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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  const arr = [];
  if (ids === undefined) {
    return arr;
  }
  ids.map(id => arr.push(animals.find(animal => animal.id === id)));
  return arr;
}

// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem
// a idade mínima especificada

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalsName = animals.find(animalName => animalName.name === animal);
  const checkAge = animalsName.residents.every(residentAge => age < residentAge.age);
  return checkAge;
}

/* Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
Quando provido o último nome do funcionário, retorna o objeto do funcionário
Sem parâmetros, retorna um objeto vazio */

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) { return {}; }
  const findEmployee = employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName);
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
  }
  const animalsCount = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  return animalsCount;
}

// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));


// Com a opção `includeNames: true` especificada, retorna nomes de animais
// Com a opção `sorted: true` especificada, retorna nomes de animais ordenados
// Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada,
// retorna somente nomes de animais macho/fêmea
// Com a opção `sex: \'female\'` ou `sex: \'male\'`
// especificada e a opção `sort: true` especificada,
// retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada
// Sem parâmetros, retorna animais categorizados por localização

function animalMap(...options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

// Passado o id de um funcionário,
// encontra a primeira espécie de animal gerenciado pelo funcionário,
// e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeResponsibleFor = employees.find(employee => employee.id === id).responsibleFor[0];

  const animalsManaged = animals.find(animal => animal.id === employeeResponsibleFor)
  .residents.sort((a, b) => b.age - a.age)[0];
  return [animalsManaged.name, animalsManaged.sex, animalsManaged.age];
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach((price) => {
    prices[price] = Math.round((prices[price] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
  return prices;
}
// console.log(increasePrices(50));

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
