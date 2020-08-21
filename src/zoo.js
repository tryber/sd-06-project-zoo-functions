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
const { animals } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  const result = [];
  if (ids === undefined) {
    return [];
  }

  for (let i = 0; i < ids.length; i += 1) {
    const animalsMap = animals.filter(animal => animal.id === ids[i]);
    result[i] = animalsMap[0];
  }
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const myAnimal = animals.find(species => species.name === animal);
  return myAnimal.residents.every(one => one.age >= 7);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined || employeeName === '') {
    return {};
  }
  // supondo que não tem pessoas com o mesmo primeiro nome né
  const myEmployee = data.employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return myEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  // data.employees.push(newEmployee);
  return newEmployee;
}

const personalInfo = {
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
};

const associatedWith = {
  managers: [
    'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992'
  ],
  responsibleFor: [
    '0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'
  ]
};

// data.employees.push({ newEmployee });
console.log(data.employees);
// console.log(createEmployee(personalInfo, associatedWith));

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
