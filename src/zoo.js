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

const animalsByIds = (...ids) => ids.map(e => data.animals.find(animalId => animalId.id === e));

const animalsOlderThan = (animal, age) => data.animals.filter(e =>
  e.name === animal)[0].residents.every(pet => pet.age > age);

// const employeeByName = (employeeName => )
function employeeByName(employeeName) {
  let result = {};
  if (employeeName) {
    result = data.employees.filter(employeesList => employeesList.firstName === employeeName)[0];
    if (!result) {
      result = data.employees.filter(employees =>
        employees.lastName === employeeName)[0];
    }
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return ({ firstName: personalInfo.firstName,
    id: personalInfo.id,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  });
}

const isManager = (id) => {
  const ALL = data.employees.map(e => e.managers.some(managerId => managerId === id));
  return ALL.some(e => e === true);
};

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}
const animalCount = (species) => {
  if (!species) {
    return data.animals.reduce((acc, current) =>
    ({ ...acc, [current.name]: current.residents.length }), {});
  }
  return data.animals.find(e => (e.name === species)).residents.length;
};

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, current) =>
  acc + (data.prices[current] * entrants[current]), 0);
}

function animalMap(options) {
  const RESULT = {};
  if (!options) {
    data.animals.map((e) => {
      if (e.location in RESULT) {
        RESULT[e.location].push(e.name);
      } else {
        RESULT[e.location] = [e.name];
      }
    });
    return RESULT;
  }
}

function schedule(dayName) {
  const QUERY = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  if (!dayName) {
    return {
      'Tuesday': 'Open from 8am until 6pm',
      'Wednesday': 'Open from 8am until 6pm',
      'Thursday': 'Open from 10am until 8pm',
      'Friday': 'Open from 10am until 8pm',
      'Saturday': 'Open from 8am until 10pm',
      'Sunday': 'Open from 8am until 8pm',
      'Monday': 'CLOSED'
    };
  } else if (dayName === 'Monday') {
    return { "Monday": "CLOSED" };
  } 
  return { [dayName]: QUERY };
    /* const RESULT = {};
    for (const [key, value] of Object.entries(data.hours)) {
      if () {

      } else {

      }
      console.log(`${key}: Open from ${value.open}am until ${value.close}pm`);
    } */
  //console.log(Object.entries(data.hours).map(e => e.keys))
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
