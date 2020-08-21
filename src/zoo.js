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
  // seu código aqui..
  return animals.filter((animal) => ids.includes(animal.id)); 
 }

function animalsOlderThan(animalName, age) {
  // seu código aqui
  // SE AGE FOR MAIOR QUE 7, RETORNA O NOME DA ESPÉCIE SE TODOS O ANIMAIS TIVEREM MAIS DE 7 ANOS 
  // return animals.filter(animal => animal.residents.age > age  && animal.name === animalName);percorrer o array
}
console.log(animalsOlderThan('lions',12))
function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // 'Cria um novo colaborador a partir de objetos contendo informações pessoais, gerentes e animais gerenciados'
  // personalInfo = employees.id
  // SE FOR GERENTE DIZER POR QUAIS EMPREGADOS ELE É RESPONSÁVEL
}

function isManager(id) {
  // seu código aqui
  employees.filter(idManager => idManager)
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
