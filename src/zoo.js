/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  const animalsGroup = [];
  if (ids.length === 0) {
    return animalsGroup;
  }
  ids.forEach(id =>
    animals.filter((animal) => {
      if (animal.id === id) {
        animalsGroup.push(animal);
      }
      return 'error';
    }),
  );
  return animalsGroup;
  // console.log(id);
}
// id == animals.id ? animals : [])
function animalsOlderThan(animal, age) {
  return animals
    .filter(oneAnimal => animal === oneAnimal.name)[0]
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees
  .filter(employee => employee
    .firstName === employeeName ||
      employee.lastName === employeeName)[0]
};

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith)
};

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id))
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
