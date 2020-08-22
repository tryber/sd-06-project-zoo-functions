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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  if (typeof ids !== null) {
    return data.animals
      .filter(element => element.id === ids[0])
      .concat(data.animals.filter(element => element.id === ids[1]));
  }
  return [];
}
function animalsOlderThan(animalName, age) {
  return animals
    .filter(animal => animal.name === animalName)[0]
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  return (
    employees.filter(
      employee =>
        employee.firstName === employeeName ||
        employee.lastName === employeeName,
    )[0] || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  const employee = {};
  return Object.assign(employee, personalInfo, associatedWith);
}

function isManager(employeeId) {
  return employees
    .flatMap(employee => employee.managers)
    .some(managerId => managerId === employeeId);
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species = animals.map(animal => animal.name)) {
  if (typeof species === 'string') {
    return animals
      .filter(animal => animal.name === species)
      .map(animal => animal.residents.length)
      .toString();
  }
  const animalsCounted = {};
  animals.filter(animal => species.some(eachAnimalName => eachAnimalName === animal.name))
  .forEach(function (animalName) { animalsCounted[animalName.name] = animalName.residents.length; });
  return animalsCounted;
}

function entryCalculator(entrants) {

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
  Object.entries(prices).forEach((entries) => {
    prices[entries[0]] =
      Math.ceil(entries[1] * (1 + (percentage / 100)) * 100) / 100;
  });
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
