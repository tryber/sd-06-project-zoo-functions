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
//rest agrupa o objeto em um ARRAY
function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(paramFound => paramFound === animal.id))
}

function animalsOlderThan(animal, age) {
  return animals.find(doubutsu => doubutsu.name === animal).residents.every(allAge => allAge.age >= age)
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } else {
    return employees.find(kaishyain => kaishyain.firstName === employeeName || kaishyain.lastName === employeeName)
  }
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

const { animals, employees } = require('./data');
function isManager(id) {
  return employees.find(kaishyain => kaishyain.id === id)
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'))

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}


function animalCount(species) {
  if(species.length === 0)
  return animals.forEach(animal => `${animals.name}: ${animals.residents}`) 
}
  
console.log(animalCount());

return animals.find(doubutsu => doubutsu.name === species).residents.length
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
