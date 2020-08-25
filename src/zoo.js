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
  return ids.map(item => animals.find(animal => animal.id === item));
}

function animalsOlderThan(animal, age) {
  const animalName = animals.find(parmAnimal => parmAnimal.name === animal);
  const minimumAge = animalName.residents.map(animalObject => animalObject.age > age);
  const ageFalse = minimumAge.find(parmAge => parmAge === false);
  if (ageFalse === false) {
    return false;
  }
  return true;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const firstName = employees
    .find(employeeFirstName => employeeFirstName.firstName === employeeName);
  const lastName = employees
    .find(employeeLastName => employeeLastName.lastName === employeeName);
  return firstName || lastName;
}

function createEmployee(personalInfo, associatedWith) {
  const addInformation = Object.assign(personalInfo, associatedWith);
  employees.push(addInformation);
  return addInformation;
}

function isManager(id) {
  const resultEmployee = data.employees.map((employee, index) => employee.managers[index] === id);
  if (resultEmployee.find(value => value === true)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
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
