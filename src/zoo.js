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
    const output = {};

    // had the idea, learned how to do it in here:
    // https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays
    for (let index = 0; index < animals.length; index += 1) {
      output[animals[index]] = count[index];
    }
    return output;
  }
  const speciesCount = data.animals
  .filter(animal => animal.name === species)
  .map(animal => animal.residents.length);
  return speciesCount[0];
}

// got the keys to be able to use length
function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const keys = Object.keys(entrants);
  const values = Object.values(entrants);
  let totalSum = 0;
  for (let index = 0; index < keys.length; index += 1) {
    switch (keys[index]) {
      case 'Adult':
        totalSum += (data.prices.Adult * values[index]);
        break;
      case 'Senior':
        totalSum += (data.prices.Senior * values[index]);
        break;
      case 'Child':
        totalSum += (data.prices.Child * values[index]);
        break;
      default:
        break;
    }
  }
  return totalSum;
}

const defaultMap = () => {
  const locationArr = ['NE', 'NW', 'SE', 'SW'];
  const output = {};
  for (let index = 0; index < locationArr.length; index += 1) {
    output[locationArr[index]] = data.animals
    .filter(animal => animal.location === locationArr[index])
    .map(animal => animal.name);
  }
  return output;
};

const females = (animalsArr) => {
  const output = [];
  for (let index = 0; index < animalsArr.length; index += 1) {
    if (animalsArr[index].sex === 'female') {
      output.push(animalsArr[index].name);
    }
  }
  return output;
};

// console.log(females('lions', 'NE'));

const animalNames = (options, animalsArr) => {
  const keys = Object.keys(options);
  const values = Object.values(options);
  const output = [];
  for (let index = 0; index < animalsArr.length; index += 1) {
    output.push(animalsArr[index].name);
  }
  for (let index = 0; index < keys.length; index += 1) {
    if (keys[index] === 'sorted' && values[index]) {
      output.sort();
    }
  }
  return output;
};

// console.log(animalNames('lions', 'NE', { sex: 'female' }));

const animalObject = (species, location, options) => {
  const keys = Object.keys(options);
  const values = Object.values(options);
  const output = {};
  const animalsArr = data.animals.filter(animal => animal.location === location)
  .filter(animal => animal.name === species)
  .flatMap(animal => animal.residents);
  for (let index = 0; index < keys.length; index += 1) {
    if (keys[index] === 'sex' && values[index] === 'female') {
      output[species] = females(animalsArr);
    } else {
      output[species] = animalNames(options, animalsArr);
    }
  }
  return output;
};

// console.log(animalObject('lions', 'NE', { sex: 'female' }));

const mapLocation = (location, options) => {
  const output = {};
  output[location] = [];
  const animalsArr = data.animals
  .filter(animal => animal.location === location)
  .map(animal => animal.name);
  for (let index = 0; index < animalsArr.length; index += 1) {
    output[location].push(animalObject(animalsArr[index], location, options));
  }
  return output;
};

// console.log(mapLocation());

function animalMap(options) {
  if (options === undefined) {
    return defaultMap();
  }
  const output = {};
  const keys = Object.keys(options);
  const values = Object.values(options);
  for (let index = 0; index < keys.length; index += 1) {
    if (keys[index] === 'includeNames' && values[index]) {
      Object.assign(output, mapLocation('NE', options));
      Object.assign(output, mapLocation('NW', options));
      Object.assign(output, mapLocation('SE', options));
      Object.assign(output, mapLocation('SW', options));
    }
  }
  return output;
}

console.log(animalMap({ includeNames: true, sex: 'female' }));

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
