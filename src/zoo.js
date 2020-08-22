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

function animalsByIds(...ids) {
  // seu código aqui
  // Verificar se o parâmetro é vazio, se for retorna um array vazio
  // Se receber um único parâmetro retorna o animal com o id recebido
  // Se receber mais de um parâmetro retorna todos os animais com os ids
  const result = [];
  if (ids === undefined) return result;
  ids.forEach((id) => {
    result.push(animals.find(animal => animal.id === id));
  });
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Recebe uma espécie e uma idade
  // Se todos os animais de uma espécie tiverem acima da idade especificada
  // retorna true
  // Caso contrário retorna false
  const species = animals.find(specie => specie.name === animal);
  const animalsAge = species.residents.every(specie => specie.age >= age);
  return animalsAge;
}

function employeeByName(employeeName) {
  // seu código aqui
  const result = {};
  if (employeeName === undefined) return result;
  const firstNameEmployee = employees.find(firstName => firstName.firstName === employeeName);
  const lastNameEmployee = employees.find(lastName => lastName.lastName === employeeName);
  if (firstNameEmployee) {
    return firstNameEmployee;
  }
  return lastNameEmployee;
}
employeeByName('Emery');


function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
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
