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
  const idsAnimals = [];
  ids.forEach((animalId) => {
    idsAnimals.push(animals.find(animal => animal.id === animalId));
  });
  return idsAnimals;
}

function animalsOlderThan(animal, age) {
  const find = animals.find(nameAnimal => nameAnimal.name === animal);
  const residents = find.residents;
  return residents.every(ageAnimal => ageAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return employees.find(employe =>
    employe.firstName === employeeName || employe.lastName === employeeName);
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
  return employees.some(person => person.managers
    .includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  const specificAnimal = animals.find(animal => animal.name === species);
  const allAnimals = animals.reduce((atual, { name, residents }) => {
    atual[name] = residents.length;
    return atual;
  }, {});

  return (!species) ? allAnimals : specificAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || !Object.keys(entrants)) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
}

function animalMap(options) {

}

function schedule(dayName) {
  const dates = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };

  if (!dayName) return dates;

  const day = {};
  day[dayName] = dates[dayName];
  return day;
}

function oldestFromFirstSpecies(id) {
  const animal = employees.find(employee => employee.id === id).responsibleFor[0];
  const group = animals.find(item => item.id === animal).residents;
  const { name, sex, age } = group.reduce((prev, current) =>
  (prev.age >= current.age ? prev : current));
  return [name, sex, age];
}

function increasePrices(percentage) {
  return Object.keys(prices).forEach((value) => {
    prices[value] = Math.round((prices[value] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
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
