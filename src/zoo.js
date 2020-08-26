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
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, ageInput) {
  return animals
  .filter(item => item.name === animal)
  .map(obj => obj.residents)
  .every((creature, index) => creature[index].age > ageInput);
}

function employeeByName(employeeName) {
  const obj = employees.find((person) => {
    const found = (person.firstName === employeeName ||
    person.lastName === employeeName);
    return found;
  });
  if (obj === undefined) {
    return {};
  }
  return obj;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees
  .some(person => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined && responsibleFor === undefined) {
    managers = [];
    responsibleFor = [];
    employees.push({ id, firstName, lastName, managers, responsibleFor });
  } else {
    employees.push({ id, firstName, lastName, managers, responsibleFor });
  }
}

function animalCount(species) {
  const animalObj = {};
  if (species !== undefined) {
    return animals
    .find(animal => animal.name === species)
    .residents.length;
  }
  animals
  .filter(animal => animal)
  .forEach((obj) => {
    const number = obj.residents.length;
    const name = obj.name;
    animalObj[name] = number;
  });
  return animalObj;
}

function entryCalculator(entrants = 0) {
  let sum = 0;
  const { Adult, Child, Senior } = prices;
  Object.keys(entrants).forEach((person, index) => {
    const numberOfTickets = Object.values(entrants)[index];
    if (person === 'Adult') {
      sum += numberOfTickets * Adult;
    } else if (person === 'Child') {
      sum += numberOfTickets * Child;
    } else if (person === 'Senior') {
      sum += numberOfTickets * Senior;
    }
  });
  return sum;
}

function getAnimalsPerLocation(locationArr) {
  const locationObj = {};

  locationArr.forEach((location) => {
    const animalSpecies = animals
    .filter(animal => animal.location === location)
    .map(animal => animal.name);

    if (animalSpecies.length !== 0) locationObj[location] = animalSpecies;
  });
  return locationObj;
}

function getAnimalsByLocationAndNames(locationArr, sorted, sex) {
  const locationAndNames = {};

  locationArr.forEach((location) => {
    const animalsSpecies = animals
    .filter(animal => animal.location === location)
    .map((animal) => {
      const nameKey = animal.name;
      let nameValue = animal.residents.map(resident => resident.name);

      if (sex) {
        nameValue = animal.residents
        .filter(resident => resident.sex === sex)
        .map(animalName => animalName.name);
      }

      if (sorted) nameValue.sort();

      return { [nameKey]: nameValue };
    });
    locationAndNames[location] = animalsSpecies;
  });

  return locationAndNames;
}

function animalMap(options) {
  const locationArr = ['NE', 'NW', 'SE', 'SW'];

  if (!options) return getAnimalsPerLocation(locationArr);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return getAnimalsPerLocation(locationArr);

  return getAnimalsByLocationAndNames(locationArr, sorted, sex);
}


function schedule(dayName = 0) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;

  const tueWed = `Open from ${Tuesday.open}am until ${Wednesday.close - 12}pm`;
  const thuFri = `Open from ${Thursday.open}am until ${Friday.close - 12}pm`;
  const satu = `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`;
  const sund = `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`;

  const mySchedule = {
    Tuesday: tueWed,
    Wednesday: tueWed,
    Thursday: thuFri,
    Friday: thuFri,
    Saturday: satu,
    Sunday: sund,
    Monday: 'CLOSED' };

  if (dayName === 0) {
    return mySchedule;
  }
  const daySchedule = { [dayName]: mySchedule[dayName] };
  return daySchedule;
}

function oldestFromFirstSpecies(id) {
  const getIds = employees
  .filter(person => person.id === id)
  .map(items => items.responsibleFor[0]);

  const oldestAnimal = animals
  .find(animal => animal.id === getIds[0])
  .residents
  .reduce((acc, curr) => {
    if (acc.age > curr.age) {
      return acc;
    }
    return curr;
  }, 0);

  const { name, sex, age } = oldestAnimal;
  const returnArr = [name, sex, age];

  return returnArr;
}

function increasePrices(percentage) {
  const percent = (percentage / 100) + 1;
  const { Adult, Senior, Child } = prices;

  prices.Adult = ((Adult * percent) + 0.005).toFixed(2);
  prices.Senior = ((Senior * percent) + 0.005).toFixed(2);
  prices.Child = ((Child * percent) + 0.0005).toFixed(2);
  return prices;
}

function employeeCoverage(idOrName = 0) {
  // getting names
  const names = employees.map(person => `${person.firstName} ${person.lastName}`);

  // Get animals from employees ID
  const resposibleForId = employees
  .map(person => person.responsibleFor
  .map(id => animals.find(animal => (animal.id === id))));

  // Create new array with animal names
  const animalArr = [];
  resposibleForId.forEach((item, index) => {
    animalArr.push(resposibleForId[index].map(animal => animal.name));
  });

  // Create new object name + animal
  const myObject = {};
  names.forEach((name, index) => {
    myObject[name] = animalArr[index];
  });

  // Getting person fullName using firstName lastName and ID.
  let fullName;
  employees.forEach((person) => {
    if (person.firstName === idOrName || person.lastName === idOrName || person.id === idOrName) {
      fullName = `${person.firstName} ${person.lastName}`;
    }
  });

  // Filtering what to return based on user input.
  const objToReturn = {};
  if (idOrName === 0) {
    return myObject;
  }
  objToReturn[fullName] = myObject[fullName];
  return objToReturn;
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
