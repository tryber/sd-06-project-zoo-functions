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
const { animals, hours, prices } = require('./data');
const { employees } = require('./data');

//  requisito1 - ok
function animalsByIds(...ids) {
  const listOfAnimals = animals.filter(animal => ids.filter(id => id === animal.id).length > 0);
  return listOfAnimals;
}


//  requisito2 - ok
function animalsOlderThan(specie, age) {
  const list = animals.filter(animal => animal.name === specie);
  const residents = list.filter(zoo => zoo.residents.every(resident => resident.age > age));
  return (residents.length > 0);
}


//  requisito3 - ok
function employeeByName(employeeName) {
  if (employeeName == null) {
    return {};
  }
  const employee = employees.find(emp =>
  (emp.firstName === employeeName) || (emp.lastName === employeeName));

  return employee;
}


//  requisito4 - ok
function createEmployee(personalInfo, associatedWith) {
  const employee = {
    ...personalInfo,
    ...associatedWith,
  };
  return employee;
}


//  requisito5 - ok
function isManager(id) {
  const teste = employees.filter(empregado => empregado.managers.some(manager => manager === id));
  return (teste.length > 0);
}


//  requisito6 - ok
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


//  requisito7 - ok
function animalCount(specie) {
  if (specie == null) {
    const grupoAnimais = {};
    animals.forEach((animal) => { grupoAnimais[animal.name] = animal.residents.length; });
    return grupoAnimais;
  }
  const quantSpecie = animals.find(animal => animal.name === specie).residents;
  return quantSpecie.length;
}


//  requisito8 - fonte: https://medium.com/cleytonbrasil/javascript-como-saber-se-um-objeto-est%C3%A1-vazio-a6a153f4f81f - https://docs.w3cub.com/javascript/global_objects/object/entries/ (aplicar foreach)
function entryCalculator(entrants) {
  let result = 0;
  if ((entrants == null) || (Object.entries(entrants).length === 0)) {
    return result;
  }
  Object.entries(entrants).forEach(([key, value]) => {
    result += prices[key] * value;
  });
  return result;
}


//  requisito9 -
function animalMap(options) {
  // seu código aqui
}

//  requisito10 -
function schedule(dayName) {
  /* const result = 0;
  if ((dayName == null) || (Object.entries(dayName).length === 0)) {
    let completeSchedule = {};
    Object.entries(hours).forEach(([key, value]) => {
      completeSchedule += `${key}: Open from ${value.open} until ${value.close} pm`;
    });
    return completeSchedule;
  }
  return result; */
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
