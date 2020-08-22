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
  .map(animal => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .map(resident => resident.name);
    return animalObject;  
  });
}

function createSortedAnimalResidentsList (location) {
  return animals
  .filter(animal => animal.location === location)
  .map(animal => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .map(resident => resident.name).sort();
    return animalObject;  
  });
}

function createAnimalResidentsListBySex (location, sex) {
  return animals
  .filter(animal => animal.location === location)
  .map(animal => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .filter(resident => resident.sex === sex)
    .map(resident => resident.name);
    return animalObject;  
  });
}

function createSortedAnimalResidentsListBySex (location, sex) {
  return animals
  .filter(animal => animal.location === location)
  .map(animal => {
    const animalObject = {};
    animalObject[`${animal.name}`] = animal.residents
    .filter(resident => resident.sex === sex)
    .map(resident => resident.name).sort();
    return animalObject;  
  });
}

function animalMap(options) {
  if (options === undefined) options = {};
  if (options.includeNames === undefined) options.includeNames = false;
  if (options.sorted === undefined) options.sorted = false;
  if (options.sex === undefined) options.sex = 'any';

  const { includeNames, sorted, sex } = options;
  const result = {};

  if (includeNames && sorted && sex === 'any') {
    result['NE'] = createSortedAnimalResidentsList('NE');
    result['NW'] = createSortedAnimalResidentsList('NW');
    result['SE'] = createSortedAnimalResidentsList('SE');
    result['SW'] = createSortedAnimalResidentsList('SW');
  } else if (includeNames && sex === 'female' && sorted) {
    result['NE'] = createSortedAnimalResidentsListBySex('NE', sex);
    result['NW'] = createSortedAnimalResidentsListBySex('NW', sex);
    result['SE'] = createSortedAnimalResidentsListBySex('SE', sex);
    result['SW'] = createSortedAnimalResidentsListBySex('SW', sex);
  } else if (includeNames && sex === 'male' && sorted) {
    result['NE'] = createSortedAnimalResidentsListBySex('NE', sex);
    result['NW'] = createSortedAnimalResidentsListBySex('NW', sex);
    result['SE'] = createSortedAnimalResidentsListBySex('SE', sex);
    result['SW'] = createSortedAnimalResidentsListBySex('SW', sex);
  } else if (includeNames && sex === 'female') {
    result['NE'] = createAnimalResidentsListBySex('NE', sex);
    result['NW'] = createAnimalResidentsListBySex('NW', sex);
    result['SE'] = createAnimalResidentsListBySex('SE', sex);
    result['SW'] = createAnimalResidentsListBySex('SW', sex);
  } else if (includeNames && sex === 'male') {
    result['NE'] = createAnimalResidentsListBySex('NE', sex);
    result['NW'] = createAnimalResidentsListBySex('NW', sex);
    result['SE'] = createAnimalResidentsListBySex('SE', sex);
    result['SW'] = createAnimalResidentsListBySex('SW', sex);
  } else if (includeNames) {
    result['NE'] = createAnimalResidentsList('NE');
    result['NW'] = createAnimalResidentsList('NW');
    result['SE'] = createAnimalResidentsList('SE');
    result['SW'] = createAnimalResidentsList('SW');
  } else {
    result['NE'] = createAnimalListByLocation('NE');
    result['NW'] = createAnimalListByLocation('NW');
    result['SE'] = createAnimalListByLocation('SE');
    result['SW'] = createAnimalListByLocation('SW');
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
