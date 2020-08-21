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

const animals = data.animals;
const employees = data.employees;


function animalsByIds(...ids) {
  if (ids.length === 0) {
    console.log('teste 0 ids');
    return [];
  } else if (ids.length === 1) {
    const uniqueId = ids[0];
    console.log('----------');
    console.log(`teste 1 ID: ${ids}`);
    return animals.filter(element => element.id === uniqueId);
  } else if (ids.length > 1) {
    console.log('----------');
    console.log(`teste +1 ID: ${ids}`);
    const output = [];
    animals.forEach((animal) => {
      ids.forEach((id) => {
        if (animal.id === id) {
          output.push(animal);
        }
      });
    });
    return output;
  }
  return [];
}

console.log(animalsByIds());
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));
console.log('-----2------');

function animalsOlderThan(animal, age) {
  const testedAnimals = animals.find(element => element.name === animal);
  const testedResidents = testedAnimals.residents;
  const checkAnimalsAge = testedResidents.every(element => element.age > age);
  return checkAnimalsAge;
}

console.log(animalsOlderThan('otters', 7));
console.log('-----3------');

function employeeByName(employee) {
  const employeesFirstName = employees.map(element => element.firstName);
  const employeesLastName = employees.map(element => element.lastName);
  if (!employee) {
    return {};
  } else if (employeesFirstName.includes(employee)) {
    return employees.find(element => element.firstName === employee);
  } else if (employeesLastName.includes(employee)) {
    return employees.find(element => element.lastName === employee);
  }
  return {};
}

console.log(employeeByName());
console.log(employeeByName('Nigel'));
console.log(employeeByName('Wishart'));
console.log('-----4------');


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

function createEmployee(personal, associated) {
  const newEmployee = Object.assign(personal);
  Object.assign(newEmployee, associated);
  return newEmployee;
}

console.log(createEmployee(personalInfo, associatedWith));

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
  // seu código aquis
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
