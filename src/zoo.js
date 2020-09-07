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
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .filter(allAnimals => allAnimals.name === animal)[0]
    .residents.every(animalAge => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(element => element.firstName === employeeName ||
    element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .map(element => element.managers[0])
    .some(element => element === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
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
  if (!entrants || Object.values(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((val, cal) => val + (entrants[cal] * prices[cal]), 0);
}

function animalMap(options) {}

function quadrohumanos(dia, quadroDehorarios) {
  const { open, close } = hours[dia];
  if (open === 0) {
    quadroDehorarios[dia] = 'CLOSED';
  } else {
    quadroDehorarios[dia] = `Open from ${open}am until ${close - 12}pm`;
  }
  return quadroDehorarios;
}

function schedule(dayName) {
  const quadroDehorarios = {};
  if (!dayName) {
    Object.keys(hours).forEach(element => quadrohumanos(element, quadroDehorarios));
  } else {
    quadrohumanos(dayName, quadroDehorarios);
  }
  return quadroDehorarios;
}

function oldestFromFirstSpecies(id) {
  const idAnimals = employees
    .filter(element => element.id === id)[0].responsibleFor[0];
  const oldAnimal = animals
    .filter(element => element.id === idAnimals)[0].residents
    .sort((a, b) => b.age - a.age)[0];
  return Object.values(oldAnimal);
}

function increasePrices(percentage) {
  Object.entries(data.prices).forEach((entrance) => {
    data.prices[entrance[0]] = Math.ceil(entrance[1] * (1 + (percentage / 100)) * 100) / 100;
  });
}
function employeeList(list) {
  return data.employees
    .find((employee) => {
      const { firstName, lastName, id } = employee;
      return (firstName === list || lastName === list || id === list);
    });
}

function animalList(animal) {
  return animal.responsibleFor
    .map(animalId => data.animals
      .find(animals1 => animals1.id === animalId).name);
}

function returnObject(employee, object) {
  object[`${employee.firstName} ${employee.lastName}`] = animalList(employee);
  return object;
}

function employeeCoverage(idOrName) {
  const result = {};
  if (idOrName) {
    returnObject(employeeList(idOrName), result);
  } else {
    data.employees.forEach(employee => returnObject(employee, result));
  }
  return result;
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
