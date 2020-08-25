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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalOfZoo => animal === animalOfZoo.name).residents
    .every(animalOfZoo => animalOfZoo.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(addNewEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals
      .reduce((acc, current) => ({ ...acc, [current.name]: current.residents.length }), {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const [adultPrice, seniorPrice, childPrice] = Object.values(prices);
  const sumOfPrices = (Adult * adultPrice) + (Senior * seniorPrice) + (Child * childPrice);
  return sumOfPrices;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const scheduleDays = Object.entries(hours);
  if (!dayName) {
    return scheduleDays
      .reduce((accDay, [day, { open, close }]) => ({ ...accDay, [day]: (day === 'Monday') ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm` }), {});
  }
  return {
    [dayName]: (dayName === 'Monday') ? 'CLOSED' : `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`,
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
