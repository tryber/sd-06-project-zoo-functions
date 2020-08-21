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
  if (ids.length === 0) { return ids; }
  const thisAnimals = [];
  ids.forEach((id) => {
    animals.filter((animal) => {
      if (animal.id === id) {
        thisAnimals.push(animal);
      }
      return undefined;
    });
  });
  return thisAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalAges = [];
  animals.filter((animalFromAnimals) => {
    if (animalFromAnimals.name === animal) {
      animalFromAnimals.residents.forEach(thisAnimal => animalAges.push(thisAnimal.age));
    } return undefined;
  });
  return animalAges.every(thisAge => thisAge > age);
}

function employeeByName(...employeeName) {
  // seu código aqui
  var foundEmployee = {};
  employeeName.forEach((thisEmployee) => {
    employees.filter((employee) => {
      if (employee.firstName === thisEmployee || employee.lastName === thisEmployee) {
        foundEmployee = employee;
      }
    });
  })
  return foundEmployee;
}

console.log(employeeByName())

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
