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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return ids;
  }
  return animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const animalType = animals
    .find(currentAnimal => currentAnimal.name === animal);

  return animalType.residents
    .every(currentResident => currentResident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};

  return employees
    .find(employee => (
      employee.firstName === employeeName || employee.lastName === employeeName
    ));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  const countReport = {};
  animals.forEach(animal => {
    countReport[animal.name] = animal.residents.length; 
  });

  if (species === undefined) {
    return countReport;
  }
  return countReport[species];
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;

  const entrantsTypes = Object.keys(entrants);
  return entrantsTypes
  .reduce((acc, entrantType) => {
    return acc += prices[entrantType] * entrants[entrantType];
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  // Sem parâmetros, retorna um cronograma legível para humanos
  // Se um único dia for passado, retorna somente este dia em um formato legível // // para humanos
  // ver conversão de hora PM ====> hora24 - 12
  const week = {
    'Tuesday': `Open from ${hours.open}am until ${hours.close - 12}pm`,
    'Wednesday': `Open from ${hours.open}am until ${hours.close - 12}pm`,
    'Thursday': `Open from ${hours.open}am until ${hours.close - 12}pm`,
    'Friday': `Open from ${hours.open}am until ${hours.close - 12}pm`,
    'Saturday': `Open from ${hours.open}am until ${hours.close - 12}pm`,
    'Sunday': `Open from ${hours.open}am until ${hours.close - 12}pm`,
    'Monday': `CLOSED`,
  };
  


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
