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
const { employees, animals } = require('./data');

// função animalsByIds implementada com a ajuda do Ícaro no plantão
function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return data.animals.filter(animal => ids.includes(animal.id));
}

// fui ajudada pelo Ícaro novamente para desenvolver o raciocínio inicial
function animalsOlderThan(animalName, age) {
  // primeiro encontrar os animais com o nome passado em animalName
  // depois verificar se esses animais tem a idade mínima de age
  return data.animals.find(animal => animal.name === animalName)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(idNumber) {
  return data
    .employees.some((employee, index) =>
      employee.managers[index] === idNumber);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (species === undefined)
    return data.animals.map(animal =>
      `${animal.name}: ${animal.residents.length},`);
      // RETORNA UM ARRAY E NÃO UM OBJETO
  return data.animals.filter(animal => animal.residents.length);
}

// console.log(animalCount('lions'));

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
