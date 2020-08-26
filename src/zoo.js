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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(specie => specie.name === animal).residents
      .every(specieAge => specieAge.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(infoId => infoId === id));
}

// pelo objeto ter chaves iguais aos param, não precisei declarar as chaves com :
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
  employees.push(lastEmployee);
}

function animalCount(species) {
  const allAnimals = {};
  if (!species) {
    animals.forEach(animal => allAnimals[animal.name] = animal.residents.length);
    return allAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  return Object.keys(prices).reduce((accumulator, currentValue) => accumulator + (prices[currentValue] * entrants[currentValue]), 0);
}

// Line 75 to 140 implemented by Gabriel Olíva at the guided lesson!
function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const species = animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);

      if (species.length !== 0) animalsPerLocation[location] = species;
  });
  return animalsPerLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsPerLocationWithName = {};

  locations.forEach((location) => { // location assume NE depois NW depo...
    const species = animals
      .filter(animal => animal.location === location)
      .map(animal => {
        const nameKey = animal.name;
        const nameValues = animal.residents
          .filter(resident => {
            const isFilteringSex = sex !== undefined;
            return isFilteringSex ? resident.sex === sex : true;
          })
          .map(resident => resident.name);

        if (sorted) nameValues.sort();

        return { [nameKey]: nameValues };
      });
      animalsPerLocationWithName[location] = species;
  });

  return animalsPerLocationWithName;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) {
    return retrieveAnimalsPerLocation(locations)
  }
  const { includeNames, sorted, sex } = options;

  if (!includeNames)  return retrieveAnimalsPerLocation(locations);

  return retrieveAnimals(locations, sorted, sex);
}

function schedule(dayName) {
  const allDays = Object.keys(hours);
  const schedule = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      schedule[day] = 'CLOSED';
    } else {
      const openHour = hours[day].open;
      const closeHour = hours[day].close - 12;
      schedule[day] = `Open from ${openHour}am until ${closeHour}pm`;
    }
  });
  if (dayName === undefined) return schedule;
  return { [dayName]: schedule[dayName] };
}
// _________________________Guided lesson ends_________________________

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
