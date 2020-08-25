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

function retrieveAnimalsPerLocation(locations) {
  const animalLocationObject = {};
  locations.forEach((location) => {
    const animalsPerLocation = animalsObject
      .filter(animalsLocation => animalsLocation.location === location)
      .map(name => name.name);
    animalLocationObject[location] = animalsPerLocation;
  });
  return animalLocationObject;
}

function includeName(locations, sorted, sex) {
  const animalLocationObject = {};
  locations.forEach((location) => {
    const animalKey = animalsObject
      .filter(loc => loc.location === location)
      .map((name) => {
        const nameKey = name.name;
        const namevalue = name.residents
          .filter((gender) => {
            if (sex) return gender.sex === sex;
            return true;
          })
          .map(item => item.name);

        if (sorted) namevalue.sort();

        return { [nameKey]: namevalue };
      });
    animalLocationObject[location] = animalKey;
  });
  return animalLocationObject;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames, sorted, sex } = options;
  if (!includeNames) return retrieveAnimalsPerLocation(locations);
  return includeName(locations, sorted, sex);
}

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
  const allAnimals = {};
  let filteredEmployee;

  if (!idOrName) {
    filteredEmployee = employees;
  } else {
    filteredEmployee = employees
      .filter(idAndName => idAndName.id === idOrName ||
        idAndName.firstName === idOrName || idAndName.lastName === idOrName,
      );
  }
  filteredEmployee.forEach((employer) => {
    const mappedAnimal = employer.responsibleFor.map(animalId =>
      animalsObject.find(item => item.id === animalId).name,
    );
    allAnimals[`${employer.firstName} ${employer.lastName}`] = mappedAnimal;
  });
  return allAnimals;
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
