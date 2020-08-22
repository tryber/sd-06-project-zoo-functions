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

// destructuring to verify ids, spread to receive n number of arrays
function animalsByIds(...ids) {
  return data.animals.filter(({ id }, index) => id === ids[index]);
}

// filter for the animals, MAGIC flatMap to access residents and every to test age
function animalsOlderThan(animal, age) {
  return data.animals
  .filter(item => item.name === animal)
  .flatMap(item => item.residents)
  .every(item => item.age > age);
}


function employeeByName(employeeName) {
  let employee = {};

  // filter the employee, returns the object within the array or the empty obj
  // returns only the first, gotta check this later, too specific
  const employeeObject = data.employees
  .filter(({ firstName, lastName }) => (firstName === employeeName || lastName === employeeName));
  if (employeeObject.length !== 0) {
    employee = employeeObject[0];
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;

  // data.employees.push(newEmployee);
  return newEmployee;
}

// get the manager ids and filters it
function isManager(id) {
  return data.employees
  .flatMap(employee => employee.managers)
  .some(item => item === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = { id: '', firstName: '', lastName: '', managers: [], responsibleFor: [] };
  if (id !== '') { newEmployee.id = id; }
  if (firstName !== '') { newEmployee.firstName = firstName; }
  if (lastName !== '') { newEmployee.lastName = lastName; }

  // had to check if they were array
  if (Array.isArray(managers)) { newEmployee.managers = managers; }
  if (Array.isArray(responsibleFor)) { newEmployee.responsibleFor = responsibleFor; }
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animals = data.animals.map(animal => animal.name);
    const count = data.animals.map(animal => animal.residents.length);
    let output = {};

    // had the idea, learned how to do it in here:
    // https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays
    animals.forEach((animal, index) => output[animal] = count[index]);
    return output;
  }
  const speciesCount = data.animals
  .filter(animal => animal.name === species)
  .map(animal => animal.residents.length);
  return speciesCount[0];
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
