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
  return (ids.length === 0) ? [] : animals.filter(array => ids.includes(array.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalName => animalName.name === animal).residents
    .every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} : employees
    .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

// console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  // Object.assign copia todas as propriedade de um ou mais objetos para outro objeto de destino
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(manager => manager.managers.includes(id));
}

// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const object = {};
  if (!species) {
    animals.forEach((specie) => {
      object[specie.name] = specie.residents.length;
    });
    return object;
  }
  return animals.find(specie => specie.name === species).residents.length;
}

// console.log(animalCount())

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
}

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

function animalMap(options) {
  // const locations = ['NE', 'NW', 'SE', 'SW'];
  // if (!options) {
  //   const animalsPerLocation = {};

  //   locations.forEach((location) => {
  //     const animalsLocation = animals
  //     .filter(animal => animal.location === location)
  //     .map(animal => animal.name);

  //     if (animals.length !== 0) animalsPerLocation[location] = animalsLocation;
  //   });
  //   return animalsPerLocation;
  // }
}

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;

  const daysWeek = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };

  if (!dayName) return daysWeek;

  const weekDay = Object.keys(daysWeek).find(day => day === dayName);
  return { [weekDay]: daysWeek[weekDay] };
}

// console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  const findEmploye = employees.find(employee => employee.id === id).responsibleFor[0];
  const findAnimal = Object.values(animals
    .find(animal => animal.id === findEmploye).residents
    .reduce((acumulator, animal) => (acumulator.age > animal.age ? acumulator : animal)));
  return findAnimal;
}

// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  const percentageValue = percentage / 100;

  const percentageOfValues = Object.keys(prices)
    .forEach((value) => {
      prices[value] = Math.round(
        (prices[value] + (prices[value] * percentageValue)) * 100) / 100;
    });
  return percentageOfValues;
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
