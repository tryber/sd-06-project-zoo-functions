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

const { animals } = data;


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
  animals.find(verifyAge => verifyAge.name === animal)
    .residents.every(ageMin => ageMin.age > age);

console.log(animalsOlderThan('penguins', 5));


function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
// }

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
  // addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
