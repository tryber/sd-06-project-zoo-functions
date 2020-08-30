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
  return ({
    firstName: personalInfo.firstName,
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
    data.animals.forEach(function (e) {
      if (e.location in RESULT) {
        RESULT[e.location].push(e.name);
      } else {
        RESULT[e.location] = [e.name];
      }
    });
  }
  return RESULT;
}

function schedule(dayName) {
  if (!dayName) {
    /* const QUERY = ({ data.hours.map(e => `Open from ${e.open}am until ${e.close - 12}pm`);
    };
    Object.entries(data.hours).reduce((acc, current) =>
      Object.keys(current) `Open from ${current.open}am until ${current.close - 12}pm`);
    */
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  } else if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return {
    [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`,
  };
}

function oldestFromFirstSpecies(id) {
  const ANIMALS = data.employees.find(e => (e.id === id)).responsibleFor;
  const ANIMALOBJ = data.animals.find(element => element.id === ANIMALS[0]);
  return ANIMALOBJ.residents.reduce((acc, { name, sex, age }) =>
    (age > acc.age ? [name, sex, age] : acc));
}

function increasePrices(percentage) {
  if (percentage) {
    return Object.keys(data.prices).forEach(((e) => {
      data.prices[e] = (Math.round((data.prices[e] * ((percentage / 100) + 1)) * 100)) / 100;
    }
    ));
  }
  return null;
}

function employeeCoverage(idOrName) {
  const { animals, employees } = data;
  const GET_FULL_NAME = (work => `${work.firstName} ${work.lastName}`);
  if (!idOrName) {
    return employees.reduce((workerList, worker) => ({
      ...workerList,
      [GET_FULL_NAME(worker)]:
      worker.responsibleFor.map(petId => animals.find(animal => animal.id === petId).name),
    }), {});
  }
  const { firstName, lastName, responsibleFor } = employees.find(employee =>
    Object.values(employee).includes(idOrName));
  return {
    [`${firstName} ${lastName}`]:
    responsibleFor.map(beastId => animals.find(beast => beast.id === beastId).name),
  };
}
/* //console.log(employeeCoverage());
//console.log(employeeCoverage('9e7d4524-363c-416a-8759-8aa7e50c0992'))
console.log(employeeCoverage('Stephanie'));
console.log(employeeCoverage('Orloff')); */

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
