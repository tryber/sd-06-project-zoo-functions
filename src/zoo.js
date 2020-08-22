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
  return animals.filter(elemento => elemento.id === ids || ids.includes(elemento.id));
}
// usar includes
function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(nome => nome.name === animal).residents.every(idade => idade.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return employees.find(ele => ele.firstName === employeeName || ele.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const dadosPesoais = {
    id: 'c5b83dy3-a451-49e2-tr38-ff3f54hxe7l1',
      firstName: 'Leonardo',
      lastName: 'Benedito',
  }
  const gerenciamento = {
    managers: ['b0dc644a-5335-489b-8a2c-4e086c7819a2',
        '4b40a139-d4dc-4f09-822d-ec25e819a5ad'],
      responsibleFor: ['01422318-ca2d-46b8-b66c-3e9e188244ed',
        '78460a91-f4da-4dea-a469-86fd2b8ccc84']
  }
  const newEmployeee =  employees.map(novo => {
    novo.Object.assign(dadosPesoais, gerenciamento)
    
  })
  return newEmployeee;
}///
console.log(createEmployee())
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
