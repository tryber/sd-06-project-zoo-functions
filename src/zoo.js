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
const { employees, animals, hours } = require('./data');

// função animalsByIds implementada com a ajuda do Ícaro no plantão
function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(animal => ids.includes(animal.id));
}

// fui ajudada pelo Ícaro novamente para desenvolver o raciocínio inicial
// primeiro encontrar os animais com o nome passado em animalName
// depois verificar se esses animais tem a idade mínima de age
function animalsOlderThan(animalName, age) {
  return data.animals.find(animal => animal.name === animalName)
    .residents.every(resident => resident.age >= age);
}

// consegui implementar sozinha mas precisei de ver no slack o
// parâmetro undefined para solucionar uma das partes do problema
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

// plantão com a Letícia, uso do spread operator
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// consegui implementar sozinha mas tive uma dificuldade em perceber
// que precisava utilizar o index de managers para acessar corretamente
// um funcionário por vez para a comparação
function isManager(idNumber) {
  return data
    .employees.some((employee, index) =>
      employee.managers[index] === idNumber);
}

// estava com erro ao chamar a função no console, e tive ajuda do Flávio Sugano, inclusive
// no uso de uma função mais adequada para a função, (push e não concat)
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees
    .push({ id, firstName, lastName, managers, responsibleFor });
}

// animalCount: plantão com Oliva para ajudar na implementação da função
// mais adequada (reduce) e acessar corretamente as chaves e valor
function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(animal => animal.name === species)
    .residents.length;
}


function entryCalculator(entrants) {
  if (entrants === undefined ||
    Object.keys(entrants).length === 0) return 0;
  // keys são as chaves passadas no obj como param
  // const keys = Object.keys(entrants);
  const values = Object.values(entrants);
  // retornar o preço total a cobrar, conforme n de pessoas
  // console.log(`entrantes.keys ${keys}`);
  return values;
}

// console.log(entryCalculator({ 'Adult': 1, 'Child': 3, 'Senior': 1}));

entryCalculator({ Adult: 2 });

function animalMap(options) {
  // seu código aqui
}

// assisti a gravação do plantão para conseguir concluir
function schedule(dayName) {
  if (dayName === undefined) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  } else if (dayName === 'Monday') return { Monday: 'CLOSED' };
  return (
    { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` }
  );
}

/* - Passado o id de um funcionário, encontra a primeira espécie de animal
gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do
animal mais velho dessa espécie */

function oldestFromFirstSpecies(idFunc) {
  // primeiro encontrar qual o é funcionário pelo id
  // pegaId é um objeto com todas as informações de employee
  const infoEmployee = employees.find(employee => employee.id === idFunc);
  const primeiroId = infoEmployee.responsibleFor[0];
  const objBicho = animals.find(animal => animal.id === primeiroId);
  const maisVelho = objBicho.residents
    .reduce((acc, current) => (acc.age > current.age ? acc : current));
  const dadosAnimal = Object.values(maisVelho);
  return dadosAnimal;
}


/* .responsibleFor.find(element => {
      element.match(element[0]).filter(animal => {
        data.animals.id === element
      }).find(animal => )
    }) */

oldestFromFirstSpecies('0e7b460e-acf4-4e17-bcb3-ee472265db83');


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
