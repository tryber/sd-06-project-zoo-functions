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

function animalsByIds(...entrada) {
  // referencia icaro corporation do Brasil
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/contains
  /* usando o filtro para selecionar os id que estão incluidos no paramentro */
  return data.animals.filter((resposta) => entrada.includes(resposta.id));
}

function animalsOlderThan(animal, age) {
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  return animals.find((nome) => nome.name === animal).residents
    .every((resultado) => resultado.age >= age);
}

function employeeByName(employeeName) {
  const achei = data.employees.find((funcionario) => funcionario.firstName === employeeName
    || funcionario.lastName === employeeName);
  return achei || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employe) => employe.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id, firstName, lastName, managers, responsibleFor,
  });
}

function animalCount(species) {
  // https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/
  const contandoPrimos = (nome, meuArray) => ({
    ...nome,
    [meuArray.name]: meuArray.residents.length,
  });
  if (!species) {
    return data.animals.reduce(contandoPrimos, {});
  } else {  
    return (data.animals.find((meuArray) => meuArray.name === species)
      .residents.length);
  }    
}

function entryCalculator(entrants) {
  const somarEntradas = (soma, pessoas) => soma + (data.prices[pessoas] * entrants[pessoas]);
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  } else {
     Object.keys(entrants).reduce(somarEntradas, 0);
  }
}

function animalMap(options) {
}

function schedule(dayName) {

}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalsInfo = animals.filter(animal => animal.id === animalId)[0].residents;
  const oldestAge = animalsInfo.reduce((acc, curr) => Math.max(acc, curr.age), 0);
  const oldestAnimal = animalsInfo.find(animal => animal.age === oldestAge);
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const percent = (percentage / 100) + 1;
  Object.keys(prices).forEach((each) => {
    prices[each] = Math.ceil(prices[each] * (percent * 100)) / 100;
  });
}

function employeeCoverage(idOrName) {
  const coverage = {};
  const listOfAnimals = (employee) => {
    const listAnimals = [];
    const pushAnimalName = (eachId) => {
      animals.forEach((animal) => {
        if (animal.id === eachId) listAnimals.push(animal.name);
      });
    };
    employee.responsibleFor.forEach(eachId => pushAnimalName(eachId));
    return listAnimals;
  }  
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
