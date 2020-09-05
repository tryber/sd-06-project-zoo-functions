/*
eslint no-unused-vars: [
  "erro",
  {
    "args": "nenhum",
    "vars": "local",
    "varsIgnorePattern": "dados"
  }
]
 */
const data = require('./data.js');
const { employees, animals, prices } = require('./data.js');

function animalsByIds(...ids) {
  const animalId = data.animals.filter(ident => ids.includes(ident.id));
  return animalId;
}
function animalsOlderThan(animal, age) {
  return data.animals.find(animalThan => animalThan.name === animal)
  .residents.every(ageThan => ageThan.age >= age);
}
function employeeByName(employeeName) {
  const objUnder = {};
  if (employeeName === undefined) { return objUnder};
  const returnEmployee = employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return returnEmployee;
}
function createEmployee({id, firstName, lastName}, {managers, responsibleFor}) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  let createInfo = {};
  if (id === undefined) { return createInfo };
  createInfo = employees.map(item => item.managers)
    .map(element => element.includes(id))
    .some(item2 => item2 === true);
  return createInfo
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  let objAnimal= {};
  if(!species) {
    data.animals.forEach((animal) => objAnimal[animal.name] = animal.residents.length)
    return objAnimal;
  }
  let numnimal = animals.find(animal => animal.name === species)
  return numnimal.residents.length;
}

function entryCalculator(entrants) {
 const result = 0;
  if (entrants === undefined) {
    return result };
  const keys = Object.keys(entrants);
  const price = keys.reduce((cc, current) => cc+(entrants[current] * prices[current]), 0);
  return price;
}

function retrieveAnimalPerLocation(locations) {
  const animalPerLocation = {};
  locations.forEach((location) => {
    const animal = data.animals
      .filter(animalLoc => animalLoc.location === location)
      .map(animalLoc => animalLoc.name);
    if (animal.length !== 0) animalPerLocation[location] = animal;
  });
  return animalPerLocation;
}
function retrieveAnimalByLocationWithName(locations, sorted, sex) {
  const animalByLocationWithName = {};
  locations.forEach((location) => {
    const animalBy = data.animals
      .filter(animalBy => animalBy.location === location)
      .map((animalBy) => {
        const animalKey = animalBy.name;
        const animalValue = animalBy.residents
          .filter((resident) => {
            const isFilteringSex = sex !== undefined;
            return isFilteringSex ? resident.sex === sex : true;
          })
          .map(resident => resident.name);
        if (sorted) animalValue.sort();
        return { [animalKey]: animalValue };
      });
    animalByLocationWithName[location] = animalBy;
  });
  return animalByLocationWithName;
}
function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) { return retrieveAnimalPerLocation(locations); }
  const { includeNames, sorted, sex } = options;
  if (includeNames === undefined) { return retrieveAnimalPerLocation(locations); }
  if (includeNames) { return retrieveAnimalByLocationWithName(locations, sorted, sex); }
  return retrieveAnimalByLocationWithName;
}

function schedule(dayName) {
  const day = 0;
}

function oldestFromFirstSpecies(id) {
  const odest = 0;
}

function increasePrices(percentage) {
  const increase = 0;
}

function employeeCoverage(idOrName) {
 const objCoverage = {};
 employees.map((employee) => {
   employee.animalList = employee.responsibleFor
   .map(animalId => animals
   .find(animal.id ===animalId).name);
 })
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
