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
const { animals } = require('./data.js');

function animalsByIds(...ids) {
animalId = animals.filter(ident => ids.includes(ident.id));
return animalId;
}
const rest = animalsByIds();

function animalsOlderThan(animal, age) {

  let animalAge2 = animals.some(ident => animals.includes(ident.name, ident.residents).age);
  return animalAge2;
}
animalAge = animalsOlderThan('lions', 4);
console.log(animalAge);
function employeeByName(employeeName) {
  // seu código aqui
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
  // seu código aqui
}

function retrieveAnimalPerLocation(locations){
  const animalPerLocation = {};
  locations.forEach((location) => {
    const animal =  animals
    .filter(animal => animal.location === location)
    .map(animal => animal.name);
    console.log(animal);
    if (animal.length !== 0) animalPerLocation[location] = animal;
  });
  return  animalPerLocation;
}
function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW' ];
  if(!options){return retrieveAnimalPerLocation(locations);}
const includeName = options.includeName;
if (includeName) {

}
}

function schedule(dayName) {
  // seu código aqui - Sem parâmetros, retorna um cronograma legível para humanos
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
}

function employeeCoverage(idOrName) {
  //nomes e sobrenomes dos funcionarios sem parametros
if (!id.name) {
  //juntar nome e sobrenome e usar como propriedade (chave ) do objeto de retorno

 }
  //com o id
  // com o nome
  // com o sobrenome
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
