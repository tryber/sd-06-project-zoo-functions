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

function animalsByIds(...ids) {
  return data.animals.filter(idAnimal => ids.includes(idAnimal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(nameAnimal => nameAnimal.name === animal)
  .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  return !employeeName ? {} : data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return Object.fromEntries(data.animals.map(animal => [animal.name, animal.residents.length]));
  }
  return data.animals.find(nameSpecies => nameSpecies.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * data.prices[curr]), 0);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

    locations.forEach((location) => {
      const animals = data.animals
        .filter(animal => animal.location === location)
        .map(animal => animal.name);

        if (animals.length !== 0) animalsPerLocation[location] = animals;
    });

  return animalsPerLocation;
}

function retrieveAnimalsByLocationWithName(locations, sorted) {
  const animalsPerLocationWithName = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => {
        const nameKey = animal.name;
        const nameValues = animal.residents.map(resident => resident.name);
        if (sorted) nameValues.sort();
        return { [nameKey]: nameValues };
      });

      animalsPerLocationWithName[location] = animals;
  });
  
  return animalsPerLocationWithName;
}

function animalMap(options) {
  const locations =['NE', 'NW', 'SE', 'SW'];

  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames, sorted } = options;
  if (includeNames) return retrieveAnimalsByLocationWithName(locations, sorted);
    
}

function schedule(dayName) {
  const openingHours = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  return !dayName ? openingHours : Object.fromEntries([[dayName, openingHours[dayName]]]);
}

function oldestFromFirstSpecies(id) {
  let old = 0;
  let result;
  const firstAnimal = data.employees.find(name => name.id === id).responsibleFor[0];
  data.animals.find(name => name.id === firstAnimal).residents.forEach((animal) => {
    if (animal.age > old) {
      old = animal.age;
      result = animal;
    }
  });
  const oldestAnimal = [result.name, result.sex, result.age];
  return oldestAnimal;
}

function increasePrices(percentage) {
  const valuePercentage = percentage / 100;
  Object.keys(data.prices).forEach((valor) => {
    data.prices[valor] = Math
    .round((data.prices[valor] + (data.prices[valor] * valuePercentage)) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  const result = {};
  let filteredEmployees;
  if (!idOrName) {
    filteredEmployees = data.employees;
  } else {
    filteredEmployees = data.employees.filter(
      employee => employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName,
    );
  }
  filteredEmployees.forEach((employee) => {
    const mappedAnimals = employee.responsibleFor.map(
      (animalIdResponsibleFor) => {
        const foundAnimalName = data.animals.find(
          animal => animal.id === animalIdResponsibleFor).name;
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
