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
const { animals } = require('./data');

function animalsByIds(...ids) {
  return ids
  .flatMap(idIndex => animals
  .filter(animal => animal.id === idIndex));
}

function animalsOlderThan(animal, age) {
  return animals
  .filter(animalOfList => animalOfList.name === animal)
  .flatMap(filteredAnimal => filteredAnimal.residents)
  .every(residentAnimals => residentAnimals.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName) ? data.employees
  .find((employee) => {
    const { firstName, lastName } = employee;
    return firstName === employeeName || lastName === employeeName;
  }) : {};
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
  const { employees } = data;
  const managers = employees.reduce((managerLi, curr) => managerLi.concat(curr.managers), []);
  return managers.some(managerId => managerId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species = 'allOfThem') {
  if (species === 'allOfThem') {
    const animalList = {};
    animals
    .forEach((animal) => {
      const { name, residents } = animal;
      animalList[`${name}`] = residents.length;
    });
    return animalList;
  }
  return animals.filter(animal => animal.name === species)[0].residents.length;
}

function verifyPrices(type) {
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = data.prices;
  let rightPrice = 0;
  if (type === 'Adult') rightPrice = adultPrice;
  if (type === 'Senior') rightPrice = seniorPrice;
  if (type === 'Child') rightPrice = childPrice;
  return rightPrice;
}

function entryCalculator(entrants = 0) {
  if (entrants.length === 0 || entrants === 0) return 0;
  return Object.keys(entrants)
  .reduce((acc, curr, index) => acc + (Object.values(entrants)[index] * verifyPrices(curr)), 0);
}

function createAnimalListByLocation(location) {
  return animals
  .filter(animal => animal.location === location)
  .flatMap(filteredAnimal => filteredAnimal.name);
}

function createAnimalResidentsList (location) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .map(resident => resident.name);
    return animalObject;
  });
}

function createSortedAnimalResidentsList(location) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .map(resident => resident.name).sort();
    return animalObject;
  });
}

function createAnimalResidentsListBySex(location, sex) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .filter(resident => resident.sex === sex)
    .map(resident => resident.name);
    return animalObject;
  });
}

function createSortedAnimalResidentsListBySex(location, sex) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .filter(resident => resident.sex === sex)
    .map(resident => resident.name).sort();
    return animalObject;
  });
}

function parameterChecker(options) {
  if (options === undefined) options = {};
  if (options.includeNames === undefined) options.includeNames = false;
  if (options.sorted === undefined) options.sorted = false;
  if (options.sex === undefined) options.sex = 'any';
  return options;
}

function structurer(paramFn, sex) {
  const structuredResult = {};
  structuredResult['NE'] = paramFn('NE', sex);
  structuredResult['NW'] = paramFn('NW', sex);
  structuredResult['SE'] = paramFn('SE', sex);
  structuredResult['SW'] = paramFn('SW', sex);
  return structuredResult;
}

function animalMap(options) {
  const { includeNames, sorted, sex } = parameterChecker(options);
  let result = {};

  if (includeNames && sorted && sex === 'any') {
    result = structurer(createSortedAnimalResidentsList, sex);
  } else if (includeNames && sex !== 'any' && sorted) {
    result = structurer(createSortedAnimalResidentsListBySex, sex);
  } else if (includeNames && sex !== 'any') {
    result = structurer(createAnimalResidentsListBySex, sex);
  } else if (includeNames) {
    result = structurer(createAnimalResidentsList);
  } else {
    result = structurer(createAnimalListByLocation);
  }
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
