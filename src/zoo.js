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
  const result = [];
  if (ids === undefined) return result;
  return ids.map(animal => animals.id === animal.id);
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  const animalsAge = species.residents.every(specie => specie.age >= age);
  return animalsAge;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  const firstNameEmployee = employees.find(firstName => firstName.firstName === employeeName);
  const lastNameEmployee = employees.find(lastName => lastName.lastName === employeeName);
  if(firstNameEmployee) return firstNameEmployee;
  return lastNameEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith};
}

function isManager(id) {
  // seu código aqui
  const managers = employees.some(manager => manager.managers.includes(id) === true);
  return managers;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const quantity = animals.find(({ name }) => name === species);
  const allAnimals = animals.reduce((accumulator, { name, residents }) => {
    accumulator[name] = residents.length;
    return accumulator;
  }, {});
  return species ? quantity.residents.length : allAnimals;
}


function entryCalculator(...entrants) {
  // seu código aqui
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants[0];
  return (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const openHours = {};
  const daysOfWeek = Object.keys(hours);
  daysOfWeek.forEach((day) => {
    if (day === 'Monday') {
      openHours[day] = 'CLOSED';
    } else {
      openHours[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: openHours[dayName] };
  }
  return openHours;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const idAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const { name, sex, age } = animals
  .find(animal => animal.id === idAnimal)
  .residents.sort((value1, value2) => value2.age - value1.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const entrancePrice = Object.keys(prices);
  entrancePrice.forEach((price) => {
    prices[price] = Math.round((prices[price] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
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
