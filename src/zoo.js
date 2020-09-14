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
  if (employeeName === undefined) return objUnder;
  const returnEmployee = employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return returnEmployee;
}
function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
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
  if (id === undefined) return createInfo;
  createInfo = employees.map(item => item.managers)
    .map(element => element.includes(id))
    .some(item2 => item2 === true);
  return createInfo;
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
  const objAnimal = { };
  if (!species) {
    data.animals.forEach((animal) => { objAnimal[animal.name] = animal.residents.length; });
    return objAnimal;
  }
  const numnimal = animals.find(animal => animal.name === species);
  return numnimal.residents.length;
}

function entryCalculator(entrants) {
  const result = 0;
  if (entrants === undefined) return result;
  const keys = Object.keys(entrants);
  const price = keys.reduce((cc, current) => cc + (entrants[current] * prices[current]), 0);
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
    .filter(animalBys => animalBys.location === location)
    .map((animalBys) => {
      const animalKey = animalBys.name;
      const animalValue = animalBys.residents
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
  if (!options) return retrieveAnimalPerLocation(locations);
  const { includeNames, sorted, sex } = options;
  if (includeNames === undefined) return retrieveAnimalPerLocation(locations);
  if (includeNames) return retrieveAnimalByLocationWithName(locations, sorted, sex);
  return retrieveAnimalByLocationWithName;
}
function schedule(dayName) {

}
function oldestFromFirstSpecies(id) {

}
function increasePrices(percentage) {
  const result = 0;
  const keys = Object.keys(prices)
  console.log(keys);
  keys.forEach(chave => {
    const priceValue = prices[chave]
    const perceValue = priceValue * (percentage / 100 + 1)
    prices[chave] = (Math.round(perceValue * 100)) / 100
  })
}

function employeeCoverage(idOrName) {
  const employeeName = {};
  if (!idOrName) {
    employees.forEach(employee => {
      const keys = `${employee.firstName} ${employee.lastName}`;
      const animalByEmployee = employee.responsibleFor
        .map(animalId => animals
        .find(animal => animal.id === animalId).name)
      employeeName[keys] = animalByEmployee
    })
    return employeeName;
  } else {
    const idOrNameFilter = employees.find(employee =>
      employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
    const responsibles = idOrNameFilter.responsibleFor
      .map(animalId => animals
      .find(animal => animal.id === animalId).name)
      const keys = `${idOrNameFilter.firstName} ${idOrNameFilter.lastName}`;
      employeeName[keys] = responsibles;
       console.log(employeeName);
    return (employeeName);
  }
}
/* console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad')); */



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
