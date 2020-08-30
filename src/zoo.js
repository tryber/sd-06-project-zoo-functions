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

const { animals, employees, prices } = data;


// 1- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
const animalsByIds = (...ids) => {
  const emptyArray = [];
  if (ids) {
    return animals.filter(compare =>
      ids.find(idt => idt === compare.id));
  }
  return emptyArray;
};

// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a idade mínima especificada
const animalsOlderThan = (animal, age) =>
  animals.find(verifyName => verifyName.name === animal)
    .residents.every(ageMin => ageMin.age > age);


// 3- Implemente a função employeeByName:
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário
const employeeByName = (employeeName) => {
  const emptyObject = {};
  if (employeeName) {
    return employees.find(verifyEmployeeName =>
      (verifyEmployeeName.firstName === employeeName) ||
      (verifyEmployeeName.lastName === employeeName));
  }
  return emptyObject;
};

// 4- Implemente a função createEmployee:
// Cria um novo colaborador a partir de objetos
// contendo informações pessoais e gerentes e animais gerenciados.
const createEmployee = (personalInfo, associatedWith) =>
  ({ ...personalInfo, ...associatedWith });

// 5- Implemente a função isManager:
// Testa se o id passado é de um gerente
const isManager = id => employees
  .some(({ managers }) => managers
    .some(idManager => idManager === id));

  // const managerId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
  // return employees.some(idManager => idManager.managers === managerId);
  // if (id === managerId) {
  // return true;
  // }
  // return false;

// 6- Implemente a função addEmployee:
// Adiciona um funcionário no fim da lista
const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
};

// 7- Implemente a função animalCount:
// - Sem parâmetros, retorna animais e suas quantidades
// - Com o nome de uma espécie de animal, retorna somente a quantidade
const animalCount = (species) => {
  if (!species) {
    const newObject = { };
    animals.forEach((dataSpecies) => {
      newObject[dataSpecies.name] = dataSpecies.residents.length;
    });
    return newObject;
  }
  return animals.find(speciesQtd =>
    speciesQtd.name === species).residents.length;
};

// 8- Implemente a função entryCalculator:
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
const entryCalculator = (entrants) => {
  let sum = 0;
  const { Adult, Child, Senior } = { ...entrants };
  if (Adult) {
    sum += Adult * prices.Adult;
  }
  if (Child) {
    sum += Child * prices.Child;
  }
  if (Senior) {
    sum += Senior * prices.Senior;
  }
  return sum;
};

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
