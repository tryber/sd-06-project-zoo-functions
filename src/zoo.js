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


const { animals, employees } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals
  .filter(animal => animal.id === ids || ids.includes(animal.id));


const animalsOlderThan = (animal, age) => {
  const species = animals.find(an => an.name === animal);
  return species.residents.every(resident => resident.age >= age);
};


const employeeByName = (employeeName) => {
  if (employeeName) {
    return employees.find(nameEmploy => nameEmploy.firstName === employeeName
      || nameEmploy.lastName === employeeName);
  }
  return {};
};
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => {
  let resultado = false;
  const idManagers = employees.map(managers => managers.managers);
  idManagers.forEach((element) => {
    if (element.some(item => item === id)) {
      resultado = true;
    }
  });
  return resultado;
};

const addEmployee = (id, firstName, lastName, managers, responsibleFor) => {
  // seu código aqui
};

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
