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
// const { hours } = require('./data');
// const { employees } = require('./data');
// const { prices } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return undefined;
  }
  return data.animals.filter(specAnimalId => ids.includes(specAnimalId.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(pickAnimal => pickAnimal.name === animal)
  .residents.every(yearsOld => yearsOld.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees
  .find(personName => personName
    .firstName === employeeName || personName.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(theEmployee => theEmployee.managers
    .find(theManager => theManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees// must have all keys from employees
  .push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const objAnimals = {};
    data.animals.forEach((animal) => {
      const key = animal.name;
      const value = animal.residents.length;
      objAnimals[key] = value;
    });
    return objAnimals;
  }
  const animalFound = data.animals.find(animal => animal.name === species);
  return animalFound.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants)
  .reduce((total, ticketPrice) =>
    total + (entrants[ticketPrice] * data.prices[ticketPrice]), 0);
}

// function retrieveAnimalsPerLocation(locations) {
//   const animalsPerLocation = {};

//   locations.forEach((location) => {
//     const animals = data.animals
//     .filter(animal => animal.location === location)
//     .map(animal => animal.name);

//     if (animals.length !==0) animalsPerLocation(location) = animals;
//   });
//   return animalsPerLocation;

function animalMap(options) {
//   const locations = ['NE', 'NW', 'SE', 'SW'];
//   if (!options) return retrieveAnimalsPerLocation(locations);
//   const includeNames = options.includeNames;
//   if (includeNames) {
//     //  pegar animais por loc e nome
//   }
// }
}

function schedule(dayName) {
  // const objHour = {};
  // if (!dayName) {
  //   Object.keys(data.hours).forEach(hour => response(hour, objHour));
  // } else {
  //   response(dayName, objHour);
  // }
  // return obj;
}

function oldestFromFirstSpecies(id) {
  const animal1 = data
  .employees.find(element => element.id === id).responsibleFor[0];
  const toAnimal = data
  .animals.find(animal => animal.id === animal1).residents;
  const oldestAnimal = toAnimal.reduce((acc, animalAge) =>
    (acc.age > animalAge.age ? acc : animalAge), []);
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const perc = extNumber => Math
  .round((extNumber + (extNumber * percentage * 0.01)) * 100) / 100;
  Object.keys(data.prices).forEach((price) => {
    data.prices[price] = perc(data.prices[price]);
  });
}

function employeeCoverage(idOrName) {
  const result = {};
  let filteredEmployees;
  if (!idOrName) {
    filteredEmployees = data.employees;
  } else {
    // [{}]
    filteredEmployees = data.employees
    .filter(employee =>
      employee
      .id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  }
  filteredEmployees.forEach((employee) => {
    const mappedAnimals = employee.responsibleFor
    .map((animalIdResponsableFor) => {
      const foundAnimalName = data.animals
      .find(animal => animal.id === animalIdResponsableFor).name;
      return foundAnimalName;
    });
    result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
  });
  return result;
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
