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
  const result = [];
  ids.forEach((eachId) => {
    animals.forEach(animal => (animal.id === eachId ? result.push(animal) : null));
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const filteredAnimals = animals.filter(eachAnimal => eachAnimal.name === animal);
  return filteredAnimals[0].residents.every(eachAnimal => eachAnimal.age > age);
}

function employeeByName(employeeName) {
  const employeeObj = employees.filter((employee) => {
    const testFName = employee.firstName === employeeName;
    const testLName = employee.lastName === employeeName;
    return (testFName) || (testLName);
  })[0];
  return (employeeObj === undefined) ? {} : employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(each => each === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    const foundAnimal = animals.find(element => (element.name === species));
    return foundAnimal.residents.length;
  }
  const animalsCount = {};
  animals.forEach(each => (animalsCount[each.name] = each.residents.length));
  return animalsCount;
}

function entryCalculator(entrants = 0) {
  let sum = 0;
  sum += Object.keys(entrants)
    .reduce((acc, entrant, i) => acc + (Object.values(entrants)[i] * prices[entrant]), 0);
  return sum;
}

function listByLocation() {
  const animalsRegion = { NE: [], NW: [], SE: [], SW: [] };
  Object.values(animals).forEach(animal => animalsRegion[animal.location].push(animal.name));
  return animalsRegion;
}

function animalMap(options = 0) {
  const animalsRegion = listByLocation();
  const { includeNames = false, sorted = false, sex = undefined } = options;

  if (includeNames) {
    Object.keys(animalsRegion).forEach((region) => {
      const animalsByLoc = [...animalsRegion[region]];
      animalsByLoc.forEach((animal) => {
        animalsRegion[region].shift();
        const listNames = {};
        const list = [];

        animals
          .filter(eachAnimal => eachAnimal.name === animal)[0].residents
          .forEach((listResident) => {
            if (sex === undefined) list.push(listResident.name);
            if (sex === 'male' || sex === 'female') {
              if (listResident.sex === sex) list.push(listResident.name);
            }
          });
        if (sorted) list.sort();
        listNames[animal] = list;
        animalsRegion[region].push(listNames);
      });
    });
  }
  return animalsRegion;
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
