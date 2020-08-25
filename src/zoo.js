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
  const animalID = [];
  ids.forEach(id => animalID.push(animals.find(animal => animal.id === id)));
  return animalID;
}

function animalsOlderThan(animal, age) {
  const creatures = animals.find(creature => creature.name === animal).residents;
  const arrayOfAges = [];

  creatures.forEach(element => arrayOfAges.push(element.age));

  return arrayOfAges.every(old => old >= age);
}

function employeeByName(employeeName) {
  const person = {};
  if (employeeName !== '') {
    Object.assign(person, employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName));
  }
  return person;
}

function createEmployee(personalInfo, associatedWith) {
  const person = {};
  Object.assign(person, personalInfo);
  Object.assign(person, associatedWith);

  return person;
}

function isManager(id) {
  const arrayOfIds = employees.flatMap(employee => employee.managers);

  return arrayOfIds.some(person => person === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const person = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(person);
}

function animalCount(species = '') {
  const animalList = {};
  if (species === '') {
    animals.forEach((animal) => {
      animalList[animal.name] = animal.residents.length;
    });
  } else {
    return animals.find(animal => animal.name === species).residents.length;
  }
  return animalList;
}

function entryCalculator(entrants = '') {
  let sum = 0;

  Object.keys(entrants).forEach((element) => {
    if (element in prices) {
      sum += prices[element] * entrants[element];
    }
  });

  return sum;
}

const emptyOption = () => {
  const array = {};
  animals.forEach((animal) => {
    array[animal.location] = animals.filter(creature => creature.location === animal.location)
      .map(element => element.name);
  });
  return array;
};

const nameOption = ({ includeNames = '', sorted = '' }) => {
  let array = {};

  animals.forEach((animal) => {
    array[animal.location] = animals.filter(creature => creature.location === animal.location)
    .map((pet) => {
      const obj = {};
      if (includeNames === true) {
        if (sorted === '') {
          obj[pet.name] = pet.residents.map(element => element.name);
        } else {
          obj[pet.name] = pet.residents.map(element => element.name).sort();
        }
      } else {
        array = emptyOption();
      }
      return obj;
    });
  });
  return array;
};

const sexOption = ({ sex = '', sorted = '' }) => {
  const array = {};

  animals.forEach((animal) => {
    array[animal.location] = animals.filter(creature => creature.location === animal.location)
      .map((pet) => {
        const obj = {};
        if (sorted === '') {
          obj[pet.name] = pet.residents.filter(item => item.sex === sex)
            .map(element => element.name);
        }
        if (sorted === true) {
          obj[pet.name] = pet.residents.filter(item => item.sex === sex)
            .map(element => element.name).sort();
        }
        return obj;
      });
  });
  return array;
};

function animalMap(options = '') {
  let animalList = {};
  const { includeNames, sex, sorted } = options;
  if (options === '') {
    animalList = emptyOption();
  }
  if (includeNames === true && sex) {
    animalList = sexOption({ sex, sorted });
  } else {
    animalList = nameOption({ includeNames, sorted });
  }
  return animalList;
}

function schedule(dayName) {
  const currentSchedule = {};
  const daysArray = (dayName !== '' && dayName !== undefined) ? [dayName] : Object.keys(data.hours);
  daysArray.forEach((day) => {
    const status = (data.hours[day].open !== 0 || data.hours[day].close !== 0) ?
      `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm` : 'CLOSED';
    currentSchedule[day] = status;
  });
  return currentSchedule;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(person => person.id === id);
  const animal = animals.find(pet => pet.id === employee.responsibleFor[0]);
  const oldestAnimal = animal.residents
    .reduce(((older, currentAnimal) => (older.age > currentAnimal.age ? older : currentAnimal)), 0);
  const { name, sex, age } = oldestAnimal;

  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(data.prices)
    .forEach((price) => {
      data.prices[price] = Math.round(data.prices[price] * ((percentage / 100) + 1) * 100) / 100;
    });
  return data.prices;
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
