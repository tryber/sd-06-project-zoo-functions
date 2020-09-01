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

// build function using spread operator;
function animalsByIds(...ids) {
  // create const to represent all animals
  // const animals = data.animals;
  // const to receive data from filter. I decided use filter after trying many times using if's, with .maps. I read the mozilla documentation on .filter () and identified that the return of this function did exactly what I needed, completely. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  const animalById = animals.filter(({ id }, index) => id === ids[index]);
  return animalById;
}


function animalsOlderThan(animalName, animalAge) {
  const animalByNameAndAge = animals
    .find(({ name }) => name === animalName)
    .residents.every(({ age }) => age >= animalAge);
  return animalByNameAndAge;
}

function employeeByName(employeeName) {
  // condition to test if have parameter in function;
  if (!employeeName) {
    return {};
  }
  // create const to receive function to find name by first or last name.
  // It was necessary to use find because the return needed to be an object;
  const employeeByFirstOrLastName = employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);

  return employeeByFirstOrLastName;
}

function createEmployee(personalInfo, associatedWith) {
  // using spread operator to copy data and create a new object;
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // necessary use .flatmap to transform all data in just one array;
  // Using .map the result is a Array of arrays;
  const findManager = employees
    .flatMap(employee => employee.managers)
    .some(manager => manager === id);

  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // cretaing object using parameters;
  const addNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  // adding object in employees array;
  const newEmployeeAdded = employees.push(addNewEmployee);
  return newEmployeeAdded;
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
