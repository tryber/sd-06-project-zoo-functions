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
const { prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return undefined;
  }
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(olderAnimal => olderAnimal.name === animal)
  .residents.every(animalAge => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find(name => name.firstName === employeeName ||
    name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const theAnimals = {};
    data.animals.forEach((animal) => {
      const nameKey = animal.name;
      const nameValue = animal.residents.length;
      theAnimals[nameKey] = nameValue;
    });
    return theAnimals;
  }
  const lookingForMyAnimal = data.animals.find(animal => animal.name === species);
  return lookingForMyAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  let totalPrice = 0;
  if (entrants.Adult) {
    totalPrice += (entrants.Adult * prices.Adult);
  }
  if (entrants.Senior) {
    totalPrice += (entrants.Senior * prices.Senior);
  }
  if (entrants.Child) {
    totalPrice += (entrants.Child * prices.Child);
  }
  return totalPrice;
}


function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const animals = data.animals
    .filter(animal => animal.location === location)// quais animais tem a determinada loc
    .map(animal => animal.name);// retorna apena o nome dos animais
    if (animals.length !== 0) animalsPerLocation[location] = animals;
  });
// se o tamnho do array for diferente do 0 adiciona a localizacao cada animal
  return animalsPerLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsPerLocationWithName = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map((animal) => {
        const nameKey = animal.name;
        const nameValues = animal.residents
        .filter((resident) => {
          const isFilteringSex = sex !== undefined;
          return isFilteringSex ? resident.sex === sex : true; // se o parametro existir vai filtrar
        })
        .map(resident => resident.name); // acessa dentro do objeto o nome do residente
        if (sorted) nameValues.sort();
        return { [nameKey]: nameValues };
  // a chave serve para identificar qual chave seria[lion: valores]
      });
    animalsPerLocationWithName[location] = animals;
  });
  return animalsPerLocationWithName;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return retrieveAnimalsPerLocation(locations);

  return retrieveAnimals(locations, sorted, sex);
}

function schedule(dayName) {
  const cronogram = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED'
  };
  if (!dayName) return cronogram;
  const hoursByDays = Object.keys(cronogram).find(days => days === dayName);
  return { [hoursByDays]: cronogram[hoursByDays] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const addDecimals = percentage / 100;
  prices.Adult = Math.round((prices.Adult + (prices.Adult * addDecimals)) * 100) / 100;
  prices.Senior = Math.round((prices.Senior + (prices.Senior * addDecimals)) * 100) / 100;
  prices.Child = Math.round((prices.Child + (prices.Child * addDecimals)) * 100) / 100;
  // code Climate nao deixou colocar data.prices, entao tive que declarar no inicio do codigo
}

function employeeCoverage(idOrName) {
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
