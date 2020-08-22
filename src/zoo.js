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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  return ids.map(item => animals.find(animal => animal.id === item));
}

function animalsOlderThan(animal, age) {
  return animals.some(item => (
    item.name === animal && item.residents.every(item2 => item2.age >= age)
  ));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(item => item.firstName === employeeName || item.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(obj => obj.managers.some(item => item === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers: [].concat(managers),
    responsibleFor: [].concat(responsibleFor),
  });
}

function animalCount(species = animals) {
  if (species !== animals) {
    const { residents } = animals.find(item => item.name === species);
    return residents.length;
  }
  return species.reduce((acc, { name, residents }) =>
    (Object.assign(acc, { [name]: residents.length })), {});
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;

  return Object.entries(entrants).reduce((total, entry) => {
    const [key, value] = entry;
    return total + (data.prices[key] * value);
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (dayName !== undefined) {
    const dayFiltered = Object.entries(hours).find(item => item[0] === dayName);
    const [day, obj] = dayFiltered;
    const { open, close } = obj;
    let msg = `Open from ${open}am until ${close - 12}pm`;

    if (day === 'Monday') {
      msg = 'CLOSED';
    }

    return { [day]: msg };
  }

  return Object.entries(hours).reduce((obj, entry) => {
    const [key, value] = entry;
    const { open, close } = value;
    let msg = `Open from ${open}am until ${close - 12}pm`;

    if (key === 'Monday') {
      msg = 'CLOSED';
    }

    return Object.assign(obj, { [key]: msg });
  }, {});
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(entry => {
    const [key, value] = entry;
    key = Math.round(value * ((percentage / 100) + 1) * 100) / 100;
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
