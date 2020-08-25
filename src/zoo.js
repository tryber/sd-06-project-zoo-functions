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
const { animals, employees, hours, prices } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) { return ids; }
  const thisAnimals = [];
  ids.forEach((id) => {
    animals.filter((animal) => {
      if (animal.id === id) {
        thisAnimals.push(animal);
      }
      return undefined;
    });
  });
  return thisAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalAges = [];
  animals.filter((animalFromAnimals) => {
    if (animalFromAnimals.name === animal) {
      animalFromAnimals.residents.forEach(thisAnimal => animalAges.push(thisAnimal.age));
    } return undefined;
  });
  return animalAges.every(thisAge => thisAge > age);
}

function employeeByName(...employeeName) {
  // seu código aqui
  let foundEmployee = {};
  employeeName.forEach((thisEmployee) => {
    employees.filter((employee) => {
      if (employee.firstName === thisEmployee || employee.lastName === thisEmployee) {
        foundEmployee = employee;
      } return undefined;
    });
  });
  return foundEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  const total = {};
  const myAnimals = [];
  const animalAmount = [];
  animals.forEach(animal => myAnimals.push(animal.name));
  animals.forEach(animal => animalAmount.push(animal.residents.length));
  myAnimals.forEach(function (animal, index) {
    total[animal] = animalAmount[index];
  });
  if (species != null) {
    const thisAnimal = animals.find(animal => animal.name === species);
    return thisAnimal.residents.length;
  } return total;
}

function entryCalculator(entrants) {
  // seu código aqui
  let total = 0;
  if (entrants == null || entrants === 0) { return total; }
  if (entrants.Adult) { total += (entrants.Adult * 49.99); }
  if (entrants.Child) { total += (entrants.Child * 20.99); }
  if (entrants.Senior) { total += (entrants.Senior * 24.99); }
  return total;
}

function animalMap(...options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const calendar = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (!dayName) { return calendar; }
  const isOpen = { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
  if (dayName == null) { return 'teste'; }
  if (dayName === 'Monday') {
    isOpen[dayName] = 'CLOSED';
  }
  return isOpen;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const thisAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const thisResidents = animals.find(animal => animal.id === thisAnimal).residents;
  thisResidents.sort((a, b) => {
    if (a.age < b.age) { return 1; }
    if (a.age > b.age) { return -1; } return 0;
  });
  return Object.values(thisResidents[0]);
}

function increasePrices(percentage) {
  // seu código aqui
  const addPercentage = function (actual) { 
    return actual += (actual / 100) * percentage;
  }
  prices.Adult = Math.round(addPercentage(prices.Adult)* 100)/ 100;
  prices.Senior = Math.round(addPercentage(prices.Senior) * 100) / 100;
  prices.Child = Math.round(addPercentage(prices.Child) * 100) / 100;
  return prices;
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
