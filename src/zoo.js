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

const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  if (animalsByIds.arguments.length === 0) {
    return [];
  } else if (ids.length === 1) {
    const animal = animals.find(animalGroup => animalGroup.id === ids[0]);

    return [animal];
  }

  return animals.filter((animalGroup, index) => animalGroup.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals.find(animalGroup => animalGroup.name === animal)
    .residents
    .every(specificAnimal => specificAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeByName.arguments.length === 0) {
    return {};
  }

  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return employees
    .flatMap(employee => employee.managers)
    .some(managerId => managerId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);

  return data.employees;
}

function animalCount(species) {
  if (animalCount.arguments.length === 0) {
    const allAnimals = {};
    animals.forEach((animalGroup) => {
      allAnimals[animalGroup.name] = animalGroup.residents.length;
    });

    return allAnimals;
  }

  return animals.find(animalGroup => animalGroup.name === species).residents.length;
}

// Checking for empty object as seen on: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object

function entryCalculator(entrants) {
  const noArguments = entryCalculator.arguments.length === 0;
  const emptyObject = noArguments ? undefined : Object.keys(entrants).length === 0 && entrants.constructor === Object;

  if (noArguments || emptyObject) {
    return 0;
  }
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
