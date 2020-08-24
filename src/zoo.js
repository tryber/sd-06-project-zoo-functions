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
const { animals}= require('./data.js');
function animalsByIds(ids) {
  const animalId = animals
  .filter (ident =>  ident.id === ids  );
  //.map(ident => ident.name );

  return(animalId);
}
 
 let resp = animalsByIds( );

 function animalsOlderThan(animal, age) {
//Ao passar o nome de uma espécie e uma idade,
//testa se todos os animais desta espécie possuem a idade mínima especificada animal, age }
 return animals.find(anima, age);
}

function employeeByName(employeeName) {
  // seu código aqui -Cria um novo colaborador a partir de objetos contendo informações pessoais,
  //gerentes e animais gerenciados
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui -Sem parâmetros, retorna um objeto vazio
}

function isManager(id) {
  // seu código aqui - Testa se o id passado é de um gerente
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui  - Adiciona um funcionário no fim da lista'
}

function animalCount(species) {
  // seu código aqui - Sem parâmetros, retorna animais e suas quantidades
}

function entryCalculator(entrants) {
  // seu código aqui - 'Retorna 0 se nenhum argumento for passado
  // Retorna 0 se um objeto vazio for passado
  //Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
}

function animalMap(options) {
  // seu código aqui -Sem parâmetros, retorna animais categorizados por localização
}

function schedule(dayName) {
  // seu código aqui - Sem parâmetros, retorna um cronograma legível para humanos
}

function oldestFromFirstSpecies(id) {
  // seu código aqui - 'Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado
  // pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
}

function increasePrices(percentage) {
  // seu código aqui - 'Ao passar uma porcentagem, incrementa todos os preços, arrendondados em
  //duas casas decimais
}

function employeeCoverage(idOrName) {
  // seu código aqui - 'Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
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
