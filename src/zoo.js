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

const { animals: animalsObject, employees, prices } = data;

function animalsByIds(...ids) {
  return animalsObject.filter(item => ids.includes(item.id));
}

function animalsOlderThan(animal, age) {
  const animalAnswer = animalsObject.filter(item => item.name === animal);
  return animalAnswer.every(element => element.residents.every(ageAnimal => ageAnimal.age > age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(element =>
    element.firstName === employeeName || element.lastName === employeeName,
  );
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.map(element => element.managers)
    .map(item => item.includes(id))
    .some(finder => finder === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const objAdd = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(objAdd);
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    const resp = animalsObject.map((element) => {
      obj[element.name] = element.residents.length;
      return obj;
    });
    return resp[0];
  }
  return animalsObject.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (!Object.keys(entrants)) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
}

function animalMap(options) {
  const { includeNames } = options;
  
  let fieldNE = animalsObject.filter(element => element.location === 'NE');
  let fieldNW = animalsObject.filter(element => element.location === 'NW');
  let fieldSE = animalsObject.filter(element => element.location === 'SE');
  let fieldSW = animalsObject.filter(element => element.location === 'SW');
  const ne = fieldNE.map(item => item.name);
  const nw = fieldNW.map(item => item.name);
  const se = fieldSE.map(item => item.name);
  const sw = fieldSW.map(item => item.name);
  if (!options) {
    return {
      NE: ne,
      NW: nw,
      SE: se,
      SW: sw,
    }
  }
  



}


console.log(animalMap());

function schedule(dayName) {
  const scheduleObj = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  const scheduleDay = {};
  if (!dayName) return scheduleObj;
  scheduleDay[dayName] = scheduleObj[dayName];
  return scheduleDay;
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.find(element => element.id === id).responsibleFor[0];
  const oldestAnimal = animalsObject
    .find(item => item.id === firstAnimal).residents
    .reduce((acc, current) => {
      if (current.age > acc.age) {
        return current;
      }
      return acc;
    });
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const percAdult = (Math.round(prices.Adult * (1 + (percentage / 100)) * 100)) / 100;
  const percChild = (Math.round(prices.Child * (1 + (percentage / 100)) * 100)) / 100;
  const percSenior = (Math.round(prices.Senior * (1 + (percentage / 100)) * 100)) / 100;
  prices.Adult = percAdult;
  prices.Child = percChild;
  prices.Senior = percSenior;
}

function employeeCoverage(idOrName) {
  let list = {};
  let arrAnimals = [];
  const listEmployees = employees.map(element => {
    list[`${element.firstName} ${element.lastName}`] = element.responsibleFor
    return list;
  });
  listEmployees[0];
}

// console.log(employeeCoverage());

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
