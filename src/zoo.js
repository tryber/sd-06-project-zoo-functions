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

function animalsByIds(...ids) {
  // seu código aqui
  const findAnimals = (array, animalId) => {
    array.push(
      data.animals.find(
        animalObj => animalObj.id === animalId
      )
    );
    return array;
  };
  return (ids.length)
    ? ids.reduce(findAnimals, [])
    : [] ;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const getResidentsAge = (array, resident) => {
    array.push(resident.age);
    return array;
  };
  const ageArray = data.animals
    .find(element => element.name === animal)
    .residents.reduce(getResidentsAge, []);
  return ageArray.every(residentAge => residentAge >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  return (employeeName)
  ? data.employees.find(person => (
    person.firstName === employeeName || person.lastName === employeeName)
    )
  : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let employee = { ...personalInfo, ...associatedWith };
  return employee;
}

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
