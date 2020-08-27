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
// const { employees } = require('./data');
// const { animals } = require('./data');
// const { animals } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(getAnimalName => getAnimalName.name === animal)
    .residents.every(ageAnimal => ageAnimal.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(name =>
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(lastEmployee);
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((objectAnimals, current) => {
      objectAnimals[current.name] = current.residents.length;
      return objectAnimals;
    }, {});
  }
  return data.animals.find(getAnimal => getAnimal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((totalPrice, ticket) =>
    totalPrice + (entrants[ticket] * data.prices[ticket]), 0);
}

function getAnimalByLocation(locations) {
  const objectAnimals = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animalName => animalName.name);

    if (animals.length !== 0) objectAnimals[location] = animals;
  });
  return objectAnimals;
}

function retrieveAnimal(locations, sorted, sex) {
  const objectAnimalsWithNames = {};

  locations.forEach((location) => {
    const animals = data.animals
    .filter(animal => animal.location === location)
    .map((animalName) => {
      const animalKey = animalName.name;
      const animalResidents = animalName.residents
      .filter((resident) => {
        const isFiltering = sex !== undefined;
        return isFiltering ? resident.sex === sex : true;
      })
      .map(resident => resident.name);

      if (sorted) animalResidents.sort();

      return { [animalKey]: animalResidents };
    });

    objectAnimalsWithNames[location] = animals;
  });

  return objectAnimalsWithNames;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return getAnimalByLocation(locations);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return getAnimalByLocation(locations);

  return retrieveAnimal(locations, sorted, sex);
}

const openingHours = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};
function schedule(dayName) {
  if (!dayName) return openingHours;
  const key = Object.keys(openingHours).find(day => day === dayName);
  return { [key]: openingHours[key] };
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const whichAnimal = data.animals.find(animal => animal.id === firstAnimal).residents;
  const oldestAnimal = whichAnimal.reduce((accumulator, animalAge) =>
    (accumulator.age > animalAge.age ? accumulator : animalAge), []);
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const result = Object.keys(data.prices).reduce((newPrices, price) => {
    newPrices[price] = Number((data.prices[price] * (1.00001 + (percentage / 100))).toFixed(2));
    return newPrices;
  }, {});
  return Object.assign(data.prices, result);
}

function findAnimal(array) {
  return array.map(id => data.animals.find(animal => animal.id === id).name);
}

function findEmployee(employeeData) {
  const employeeInfo = data.employees.find(item =>
    item.id === employeeData ||
    item.firstName === employeeData ||
    item.lastName === employeeData,
  );
  return employeeInfo;
}

function employeeCoverage(idOrName) {
  const result = data.employees
    .reduce((employeeResponsible, { firstName, lastName, responsibleFor }) => {
      employeeResponsible[`${firstName} ${lastName}`] = findAnimal(responsibleFor);
      return employeeResponsible;
    }, {});
  if (!idOrName) return result;

  const objectEmployee = {};
  const { firstName, lastName, responsibleFor } = findEmployee(idOrName);
  objectEmployee[`${firstName} ${lastName}`] = findAnimal(responsibleFor);
  return objectEmployee;
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
