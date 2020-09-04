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
const { employees } = require('./data.js');

function animalsByIds(...ids) {
  const animalId = data.animals.filter(ident => ids.includes(ident.id));
  return animalId;
}
animalsByIds();

function animalsOlderThan(animal, age) {
  const animalsOd = data.animals.find(animalThan => animalThan.name === animal);
  return animalsOd.residents.every(ageThan => ageThan.age >= age);
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
  const animalsSpecie = 0;
}

function entryCalculator(entrants) {
  const contCalculator = 0;
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
 if(idOrName === undefined ) {
  const nameList = data.employees.map((name) => `${name.firstName} ${name.lastName }` .responsibleFor)
  return nameList
 }
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
