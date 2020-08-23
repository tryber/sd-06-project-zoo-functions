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

const { employees, animals, prices } = require('./data');
/*
function animalsByIds(...ids) {
  if (typeof ids != null){
    return animals
    .filter(animal => animal.id === ids[0])
    .concat(animals.filter(animal => animal.id === ids[1]));
  }
  return [];
}
*/
function animalsOlderThan(animalName, age) {
  return animals.every(animal => animal.name === animalName && animal.age > age);
}


function employeeByName(employeeName) {
  return employees
  .filter(worker => worker.firstName === employeeName ||
  worker.lastName === employeeName)[0] || {};
}
/*
function createEmployee(personalInfo, associatedWith) {
  return {
    personalInfo,
    associatedWith,
  };

}
const personalInfo = employees
.map(worker =>{
  const id = worker.id;
  const firstName = worker.firstName;
  const lastName = worker.lastName;

  return {
    firstName: firstName,
    id: id,
    lastName: lastName,
  };
})

const associatedWith = employees
.map(worker =>{
  const managers = worker.managers;
  const responsibleFor = worker.responsibleFor;

  return {
    managers: [managers],
    responsibleFor: [responsibleFor],
  };
})
*/
function isManager(id) {
  return employees.some(worker => worker.managers[0] === id)
}
/*
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newObject = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: managers,
    responsibleFor: responsibleFor,
  };
  const toArray = Object.keys(newObject)
  return Object.keys(employees).push(toArray);
}
*/
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
/*
function increasePrices(percentage) {
  Object.entries(prices).forEach((price)=>{
    prices[price[0]] = (price[1]*(1 + percentage/100));
  })
} 

*/
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
