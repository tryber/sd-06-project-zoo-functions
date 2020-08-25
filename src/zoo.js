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
  return ids.map(animalID => animals.find(animal => animal.id === animalID));
}

function animalsOlderThan(animalName, animalAge) {
  return animals.find(animal => animalName === animal.name).residents
  .every(resident => resident.age >= animalAge);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const getAnimalsNumber = () => {
  const animalsNum = {};
  animals.forEach(({ name, residents }) => { animalsNum[name] = residents.length; });
  return animalsNum;
};

function animalCount(species) {
  const allSpeciesNumber = getAnimalsNumber();
  if (!species) return allSpeciesNumber;
  return allSpeciesNumber[species];
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const keys = Object.keys(entrants);
  const sumPrices = (acc, key) => acc + (entrants[key] * prices[key]);
  return keys.reduce(sumPrices, 0);
}

const getSpeciesPerLocation = () => {
  const speciesLocation = {};
  const directions = ['NE', 'NW', 'SE', 'SW'];
  directions.forEach((direction) => {
    speciesLocation[direction] = animals
      .filter(animal => animal.location === direction).map(animal => animal.name);
  });
  return speciesLocation;
};

const getNamesPerLocations = (options = {}) => {
  const { includeNames = false, sorted = false, sex = null } = options;
  if (!includeNames) return getSpeciesPerLocation();
  const speciesLocation = {};
  const directions = ['NE', 'NW', 'SE', 'SW'];
  directions.forEach((direction) => {
    speciesLocation[direction] = animals
    .filter(animal => animal.location === direction).map((animal) => {
      const key = animal.name;
      const value = animal.residents;
      if (includeNames && sorted && sex) {
        return { [key]: value.filter(resident => resident.sex === sex)
          .map(resident => resident.name).sort() };
      }
      if (includeNames && sorted) return { [key]: value.map(resident => resident.name).sort() };
      if (includeNames && sex) {
        return { [key]: value.filter(resident => resident.sex === sex)
          .map(resident => resident.name) };
      }
      return { [key]: value.map(resident => resident.name) };
    });
  });
  return speciesLocation;
};

function animalMap(options) {
  if (!options) return getSpeciesPerLocation();
  return getNamesPerLocations(options);
}

function schedule(dayName) {
  const schedule = {};
  const days = Object.keys(hours);
  days.forEach(day => {
    let openHour = hours[day].open;
    let closeHour = hours[day].close;
    if(openHour > 12) openHour -= 12;
    if(closeHour > 12) closeHour -= 12;
    if (day !== 'Monday') {
      schedule[day] = `Open from ${openHour}am until ${closeHour}pm`;
    } else schedule[day] = `CLOSED`;
  })
  if(!dayName) return schedule;
  return { [dayName]: schedule[dayName] };
}

console.log(schedule('Tuesday'));

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
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
