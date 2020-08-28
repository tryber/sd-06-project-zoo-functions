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

// const data = require('./data');
const {
  animals,
  employees,
  prices,
  hours,
} = require('./data');
const data = require('./data');
// const { isArray } = require('util');
// const { TestScheduler } = require('jest');

function animalsByIds(...ids) {
  // seu código aqui..
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
    .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.flatMap(element => element.managers).some(idManager => idManager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(lastEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const animais = {};
    animals.forEach(element => (animais[element.name] = element.residents.length));
    return animais;
  }
  const animalsTotal = animals.filter(element => element.name === species);
  const residentAnimals = animalsTotal.map(element => element.residents.length);
  return residentAnimals[0];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const totalValue = Object.keys(entrants).map(element => entrants[element] * prices[element]);
  const calc = totalValue.reduce((prev, next) => prev + next);
  return calc;
}

function animalMap(options) {}

function schedule(dayName) {
  const allWeek = {};
  const allDays = Object.keys(hours);
  allDays.map((element) => {
    if (element === 'Monday') {
      allWeek[element] = 'CLOSED';
      return allWeek;
    }
    allWeek[element] = `Open from ${hours[element].open}am until ${hours[element].close - 12}pm`;
    return allWeek;
  });
  if (!dayName) {
    return allWeek;
  }
  const newActual = {
    [dayName]: allWeek[dayName],
  };
  return newActual;
}

function oldestFromFirstSpecies(id) {
  const findEmployeeId = employees.find(employee => employee.id === id).responsibleFor[0];
  const thisAnimal = animals.find(animal => animal.id === findEmployeeId).residents;
  const olderAnimal = thisAnimal.sort((a, b) => {
    if (a.age < b.age) {
      return 1;
    }
    if (a.age > b.age) {
      return -1;
    }
    return 0;
  });
  return Object.values(olderAnimal[0]);
}

function increasePrices(percentage) {
  const increase = (percentage / 100) + 1;
  prices.Adult = (Math.round(prices.Adult * increase * 100) / 100);
  prices.Senior = (Math.round(prices.Senior * increase * 100) / 100);
  prices.Child = (Math.round(prices.Child * increase * 100) / 100);
  return prices;
}

function employeeCoverage(idOrName) {
  // const employeeName = {};
  // employees.forEach(employee => {
  //   employeeName[`${employee.firstName}
  // ${employee.lastName}`] = employee.responsibleFor.map(animalId
  //  => animals.find(animal => animal.id === animalId).name)
  // })
  // if (!idOrName){
  //   return employeeName;
  // }
  //   // id or firstName or lastName of employee:
  //   // retorna o nome do employee e os respectivos animais
  //   Object.keys(employeeName).
  // find(employee => idOrName === employee.id ||
  // idOrName === employee.firstName.firstName || idOrName === employee.lastName)
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
