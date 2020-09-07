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
    .filter(kind => (kind.name === animal))[0]
    .residents.every(animalAge => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(employee => employee.firstName === employeeName ||
      employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.map(employee => employee.managers[0])
  .some(employee => employee === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees
  .push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const qtdAnimals = {};
    animals.forEach(animal => (qtdAnimals[animal.name] = animal.residents.length));
    return qtdAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants)
  .reduce((sum, individual) => sum + (entrants[individual] * prices[individual]), 0);
}

function animalMap(options) {
  //
}

function calender(day, openingHours) {
  const { open, close } = hours[day];
  if (open === 0) {
    openingHours[day] = 'CLOSED';
  } else {
    openingHours[day] = `Open from ${open}am until ${close - 12}pm`;
  }
  return openingHours;
}

function schedule(dayName) {
  const openingHours = {};
  if (!dayName) {
    Object.keys(hours).forEach(elem => calender(elem, openingHours));
  } else {
    calender(dayName, openingHours);
  }
  return openingHours;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  return Object.values(animals.find(animal => animal.id === animalId).residents
    .reduce((older, animal) => (older.age > animal.age ? older : animal)));
}

function increasePrices(percentage) {
  const finalPrices = prices;
  Object.keys(prices)
    .forEach(individual => finalPrices[individual] =
      Math.round(prices[individual] * (1 + (percentage / 100)) * 100) / 100);
  return finalPrices;
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
