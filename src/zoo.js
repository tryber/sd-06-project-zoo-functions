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
  if (ids === undefined) {
    return [];
  }
  return animals.filter(getById => ids.includes(getById.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.find(findedAnimal => findedAnimal.name === animal);
  return getAnimal.residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(name => name.lastName === employeeName || name.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(managerId => managerId.managers.includes(id));
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
  if (species === undefined) {
    return Object.fromEntries(animals
      .map(allAnimals => [allAnimals.name, allAnimals.residents.length]));
  }
  return animals
    .find(countAnimal => countAnimal.name === species)
    .residents.length;
}


function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const keys = Object.keys(entrants);
  const totalPrice = keys
    .reduce((sum, currentValue) => sum + (entrants[currentValue] * prices[currentValue]), 0);
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalSpecie = animals.find(specie => specie.id === animalId).residents;
  const ordedSpecie = animalSpecie.sort((a, b) => b.age - a.age);
  return [`${ordedSpecie[0].name}`, `${ordedSpecie[0].sex}`, `${ordedSpecie[0].age}`];
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  const increase = 1 + (percentage / 100);
  keys.forEach((key) => { prices[key] = Math.round(prices[key] * increase * 100) / 100; });
}

function employeeCoverage(idOrName) {
  const response = {};
  const getResponseByParam = (param) => {
    const employee = employees.find(employ => employ[param] === idOrName);
    const listAnimalByEployeeId = [];
    employee.responsibleFor.forEach((animalByEployeeId) => {
      listAnimalByEployeeId.push(animals
        .find(animalName => animalByEployeeId === animalName.id).name);
    });
    response[`${employee.firstName} ${employee.lastName}`] = listAnimalByEployeeId;
  };
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      const getAnimal = employee.responsibleFor;
      const listAnimal = [];
      getAnimal.forEach((animal) => {
        listAnimal.push(animals.find(animalName => animal === animalName.id).name);
      });
      response[`${employee.firstName} ${employee.lastName}`] = listAnimal;
    });
  } else if (employees.some(employee => employee.id === idOrName)) {
    getResponseByParam('id');
  } else if (employees.some(employeeName => employeeName.firstName === idOrName)) {
    getResponseByParam('firstName');
  } else if (employees.some(employeeName => employeeName.lastName === idOrName)) {
    getResponseByParam('lastName');
  }
  return response;
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
