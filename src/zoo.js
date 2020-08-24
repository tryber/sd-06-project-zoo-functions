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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
  .filter(element => animal === element.name)[0].residents
  .every(item => item.age >= age);
}

function employeeByName(employeeName) {
  const result = employees.find((person) => {
    const { firstName, lastName } = person;
    return (firstName === employeeName || lastName === employeeName);
  });
  return Object.assign({}, result);
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
  return employees.some(employee => employee.managers
    .some(number => number === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newobject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newobject);
}

function animalCount(species) {
  let result = {};
  if (!species) {
    animals.forEach((element) => {
      const { name, residents } = element;
      result[name] = residents.length;
    });
  } else {
    result = animals.find(animal => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants = 0) {
  let sum = 0;
  Object.keys(entrants).forEach((element, index) => {
    sum += prices[element] * Object.values(entrants)[index];
  });
  return sum;
}

function animalMap(options) {
  const searchByLocation = region => animals
  .filter(animal => animal.location === region)
  .map(element => element.name);

  const search = (gender, animalName) => animals
    .find(animal => animal.name === animalName).residents
    .filter(element => element.sex === gender || !gender)
    .map(item => item.name);

  const locals = ['NE', 'NW', 'SE', 'SW'];
  const result = {};
  const { includeNames, sorted, sex } = options || {};

  locals.forEach((local) => {
    result[local] = [];
    searchByLocation(local).forEach((specie) => {
      if (includeNames !== true) {
        result[local].push(specie);
      } else if (sorted === true) {
        result[local].push({ [specie]: search(sex, specie).sort() });
      } else {
        result[local].push({ [specie]: search(sex, specie) });
      }
    });
  });

  return result;
}
const amPm = (time) => {
  let moment = time;
  if (time > 12) {
    moment -= 12;
  }
  return moment;
};

const response = (day, object) => {
  const { open, close } = hours[day];
  if (open === 0 && close === 0) {
    object[day] = 'CLOSED';
  } else {
    object[day] = `Open from ${amPm(open)}am until ${amPm(close)}pm`;
  }
  return object;
};

function schedule(dayName) {
  const result = {};
  if (!dayName) {
    Object.keys(hours).forEach(element => response(element, result));
  } else {
    response(dayName, result);
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees
    .find(employee => employee.id === id).responsibleFor[0];
  const oldAnimal = animals
    .find(animal => animal.id === animalId).residents
    .reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(oldAnimal);
}

function increasePrices(percentage) {
  const percent = number => Math.round((number + (number * percentage * 0.01)) * 100) / 100;
  Object.keys(prices).forEach((element) => {
    prices[element] = percent(prices[element]);
  });
}

function employeeCoverage(idOrName) {
  const findAnimal = obj => obj.responsibleFor
  .map(animalId => animals.find(animal => animal.id === animalId).name);

  const findPerson = search => employees.find((person) => {
    const { firstName, lastName, id } = person;
    return (firstName === search || lastName === search || id === search);
  });

  const printLine = (staff, object) => {
    object[`${staff.firstName} ${staff.lastName}`] = findAnimal(staff);
  };
  const result = {};
  if (!idOrName) {
    employees.forEach(employee => printLine(employee, result));
  } else {
    printLine(findPerson(idOrName), result);
  }
  return result;
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
