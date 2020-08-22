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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
  .filter(element => animal === element.name)[0].residents
  .every(item => item.age >= age);
}

function employeeByName(employeeName) {
  let result = employees
  .find(person => person.firstName === employeeName || person.lastName === employeeName);
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers
    .some(number => number === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newobject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newobject);
}

function animalCount(species) {
  let result = {};
  if (species === undefined) {
    animals.forEach((element) => {
      const { name, residents } = element;
      result[name] = residents.length;
    });
  } else {
    result = animals.find(animal => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants = 0) {
  let sum = 0;
  Object.keys(entrants).forEach((element, index) => {
    sum += prices[element] * Object.values(entrants)[index];
  });
  return sum;
}
const animalSearch = region => animals.filter(animal => animal.location === region)
.map(element => element.name);
const nameSearch = animalName => animals.find(animal => animal.name === animalName)
.residents.map(element => element.name);
const sexSearch = (gender, animalName) => animals.find(animal => animal.name === animalName)
.residents.filter(element => element.sex === gender)
.map(item => item.name);
const locals = ['NE', 'NW', 'SE', 'SW'];
const result = {};
function animalMap(options) {
  locals.forEach((coor) => {
    result[coor] = [];
    if (options === undefined) {
      result[coor] = animalSearch(coor);
    } else if (options.includeNames === true && (options.sex === 'male' || options.sex === 'female') && options.sorted === true) {
      animalSearch(coor).forEach((specie) => {
        result[coor].push({ [specie]: sexSearch(options.sex, specie).sort() });
      });
    } else if (options.includeNames === true && options.sorted === true) {
      animalSearch(coor).forEach((specie) => {
        result[coor].push({ [specie]: nameSearch(specie).sort() });
      });
    } else if (options.includeNames === true && (options.sex === 'male' || options.sex === 'female')) {
      animalSearch(coor).forEach((specie) => {
        result[coor].push({ [specie]: sexSearch(options.sex, specie) });
      });
    } else if (options.includeNames === true) {
      animalSearch(coor).forEach((specie) => {
        result[coor].push({ [specie]: nameSearch(specie) });
      });
    } else if (options.sex === 'male' || options.sex === 'female') {
      result[coor] = animalSearch(coor);
    }
  });
  return result;
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
