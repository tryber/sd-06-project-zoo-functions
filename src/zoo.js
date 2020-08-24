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
  const result = [];

  animals.map((animal) => {
    const { id } = animal;
    for (const element of ids) {
      if (element === id) {
        result.push(animal);
      }
    }
    return result;
  });
  return result;
}

function animalsOlderThan(animal, ages) {
  const filterType = animals.filter(({ name }) => name === animal)
  .map(({ residents }) => residents.every(({ age }) => age > ages));
  return filterType[0];
}

function employeeByName(employeeName) {
  let result = {};

  employees.find((employee) => {
    const { firstName, lastName } = employee;
    if (employeeName === firstName || employeeName === lastName){
      result = employee;
      return result;
    }
  });
  return result;
}

// console.log(employeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  const result = {...personalInfo, ...associatedWith}
  return result;
}

// console.log(createEmployee(personalInfo, associatedWith));

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
