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

// const data = require('./data');
const {
  animals,
  employees,
} = require('./data');
const data = require('./data');
// const { TestScheduler } = require('jest');

function animalsByIds(...ids) {
  // seu código aqui..
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
    .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { 
    return {};
  } return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.flatMap(element => element.managers).some(idManager => idManager === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  
}

function animalCount(species) {
  // seu código aqui
  // if (species === undefined) {
  //   console.log (animals.flatMap(animal => ({[animal.name]: animal.residents.length})))
  // } console.log(animals.map(animal => animal.residents.length))
  let animais = [];
  animals.forEach(element => {
    animais.push({[element.name]: element.residents.length})
  }); console.log(animais.reduce())
  }

  console.log(animalCount())
 
function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
//   // seu código aqui
//   const locations = ['NE', 'NW', 'SE', 'SW'];
//   if (!options) {
//     const animalsPerLocation = {};

//     locations.forEach((location) => {
//       //filtrar por localização
//   //     const animals = data.animals
//   //     .filter((animal => animal.location === location)
//   //     .map(animal => animal.name);
//   //   })
//   // } 


}
// console.log(animals.filter(animal => animal.location === 'NE').map(nome => nome.name))

function schedule(dayName) {
  //   // seu código aqui
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
