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
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.filter(element => animal === element.name)[0].residents
    .every(item => item.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} :
    employees.find(employee =>
      employee.firstName.includes(employeeName) || employee.lastName.includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const employee2 = Object.assign({}, personalInfo, associatedWith);
  return employee2;
}

function isManager(id) {
  return employees
    .some(inPut => inPut.managers
      .find(inPutTwo => inPutTwo === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployer = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployer);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, { name, residents }) =>
      Object.assign(acc, {
        [name]: residents.length,
      }), {},
    );
  }
  return animals.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  let priceTotal = 0;
  if (entrants.Adult) priceTotal += (data.prices.Adult * entrants.Adult);
  if (entrants.Child) priceTotal += (data.prices.Child * entrants.Child);
  if (entrants.Senior) priceTotal += (data.prices.Senior * entrants.Senior);
  return priceTotal;
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
  prices.Adult = parseFloat((prices.Adult * (1 + (percentage / 100))) + 0.005).toFixed(2);
  prices.Senior = parseFloat((prices.Senior * (1 + (percentage / 100))) + 0.005).toFixed(2);
  prices.Child = parseFloat((prices.Child * (1 + (percentage / 100))) + 0.005).toFixed(2);
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
