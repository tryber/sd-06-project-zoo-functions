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
// const assert = require('assert');
const data = require('./data');
const { animals } = require('./data');
const { hours } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');

function animalsByIds(...ids) {
  // rest parameter inserido para que pudessem ser utilizados quantos parametros necessarios
  const searchAnimalsById = animals
  .filter(animal => ids.includes(animal.id));
  // filter para filtrar valores
  return searchAnimalsById;
}

function animalsOlderThan(animal, age) {
  const ageComparator = animals
.find(creature => creature.name === animal)
// encontrar os animais através do nome usando find
.residents.every(ageOf => ageOf.age >= age);
// utilizando every comparar as idades de todos(every) os elementos dentro de residents
  return ageComparator;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const nameOfTheEmployee = employees
    .find(theEmployee => theEmployee.firstName === employeeName
      || theEmployee.lastName === employeeName);
  /* usar find para encontrar o funcionario e suas properties para o
  primeiro nome OU para o ultimo nome e tirar do array */
  return nameOfTheEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newArray = Object.assign(personalInfo, associatedWith);
  // object.assign para atribuir objetos dentro de um array
  return newArray;
}

function isManager(id) {
  const areYouAManager = employees
  .some(checkingEmployee => checkingEmployee.managers.includes(id));
  // checando se algum (some) funcionario tem o id repetido dentro de managers;

  return areYouAManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // caracterizar managers e responsibleFor como array
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
// usar o push para EMPURRAR os objetos dentro do array employees
}

function animalCount(species) {
  if (species === undefined) {
    const countingAnimals = {};
    // definir como objeto vazio
    animals.forEach((countedAnimals) => {
      // iterar sobre cada elemento do array animals
      countingAnimals[countedAnimals.name] = countedAnimals.residents.length;
      // passar o valor dos residents para cada chave dos nomes dos animais
      // (key value) dentro do objeto
    });
    return countingAnimals;
  }
  const countingAnimals = animals
  .find(numericAnimals => numericAnimals.name === species)
// encontrar os animais através do nome usando find
  .residents.length;
// imprimir o length dos residents de acordo com o nome da species
  return countingAnimals;
}

function entryCalculator(entrants) {
  // atribuir as variavel a chave
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    // se as informaçoes forem indefinidas ou objeto vazio retornar 0
    return 0;
  }
  const ticket = Object.keys(entrants);
  const entrancePrice = ticket
  .reduce((totalPriceTicket, key) => totalPriceTicket + (prices[key] * entrants[key]), 0);
//  somar o valor total dos tickets atribuindo totalPriceTicket ao somatorio e as chaves
// do prices e das entradas inicias.
  return entrancePrice;
}

function animalMap(options) {

}

function schedule(dayName) {
  const daysOfTheWeek = Object.keys(hours);
  const readebleDate = {};
  // inicializando duas constantes para utilização no forEach
  daysOfTheWeek.forEach((specifiedDay) => {
    // forEach vai iterar em cada elemento para aplicar a função para melhor leitura
    if (specifiedDay === 'Monday') {
      // Se monday a função retorna closed como valor
      readebleDate[specifiedDay] = 'CLOSED';
    } else {
      // os outros dias da semana retorna a frase legível
      readebleDate[specifiedDay] = `Open from ${hours[specifiedDay].open}am until ${hours[specifiedDay].close - 12}pm`
      // utilizando template literals para concatenar as variaveis na frase
    }
  });
  if (dayName === undefined) {
    return readebleDate;
  }
  return {
    [dayName]: readebleDate[dayName],
  };
  // codigo baseado na resolução do fechamento
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
