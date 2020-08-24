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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  if (!ids) return [];
  const animalsByIdList = [];
  ids.forEach(value =>
  animalsByIdList.push(animals.find(animal => animal.id === value)));
  return animalsByIdList;
}

function animalsOlderThan(animal, age) {
  return animals
  .find(names => names.name === animal).residents
  .every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(person =>
    person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id: otherId, firstName: otherFirstName, lastName: otherLastName } = personalInfo;
  const { managers: otherManagers, responsibleFor: otherResponsibleFor } = associatedWith;
  return {
    id: otherId,
    firstName: otherFirstName,
    lastName: otherLastName,
    managers: otherManagers,
    responsibleFor: otherResponsibleFor,
  };
}

function isManager(id) {
  return employees.some(value => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(newEmployee);
}

function animalCount(species) {
  const animalsList = {};
  animals.forEach(value => (animalsList[value.name] = value.residents.length));
  if (!species) return animalsList;
  return animalsList[species];
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  let price = 0;
  price += Adult * prices.Adult;
  price += Senior * prices.Senior;
  price += Child * prices.Child;
  return price;
}

function animalMap(options) {
  const locationList = {};
  const initialList = {};
  const locationOption = ['NE', 'NW', 'SE', 'SW'];
  locationOption.forEach((index) => {
    initialList[index] = animals
    .filter(value => value.location === index).map(animal => animal.name);
  });
  if (!options || !options.includeNames) return initialList; // Resolvendo problema teste 06/06
  locationOption.forEach((index) => {
    locationList[index] = animals
    .filter(value => value.location === index).map((animal) => {
      const newObject = {};
      newObject[animal.name] = animal.residents;
      if (options.sex === 'female' || options.sex === 'male') {
        newObject[animal.name] = newObject[animal.name].filter(theSex =>
        theSex.sex === options.sex);
      }
      if (options.includeNames === true) {
        newObject[animal.name] = newObject[animal.name].map(theName => theName.name);
      }
      if (options.sorted === true) newObject[animal.name].sort();
      return newObject;
    });
  });
  return locationList;
}

function schedule(dayName) {
  const scheduleWeek = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open !== 0) {
      scheduleWeek[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      scheduleWeek[day] = 'CLOSED';
    }
  });
  if (dayName) return { [dayName]: scheduleWeek[dayName] };
  return scheduleWeek;
}

function oldestFromFirstSpecies(id) {
  const theAnimalId = employees.find(value => value.id.includes(id)).responsibleFor[0];
  const theAnimalList = animalsByIds(theAnimalId)[0].residents;
  const theOldestOne = theAnimalList.map(age => age.age).sort((a, b) => b - a)[0];
  return Object.values(theAnimalList.find(element => element.age === theOldestOne));
}

function increasePrices(percentage) {
  Object.keys(prices).forEach(value => {
    prices[value] = Math.round((prices[value] * 100) * (1 + (percentage / 100))).toFixed(2) / 100
  });
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
