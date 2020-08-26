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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids === undefined) {
    return [];
  } else if (ids.length === 1) {
    return animals.filter(animal => ids.includes(animal.id));
  }
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .filter(element => element.name === animal)
    .some(secondElement => secondElement.residents
      .every(thirdElement => thirdElement.age > age));
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  return employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, an) => ({ ...acc, [an.name]: an.residents.length }), {});
  }
  return animals.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  let total = 0;
  if (!entrants) return 0;
  if (entrants.Adult) {
    total += entrants.Adult * prices.Adult;
  }
  if (entrants.Senior) {
    total += entrants.Senior * prices.Senior;
  }
  if (entrants.Child) {
    total += entrants.Child * prices.Child;
  }
  return total;
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const brandNewAnimals = animals.filter(animal => animal.location === location)
      .map(animal => animal.name);
    if (brandNewAnimals.length !== 0) animalsPerLocation[location] = brandNewAnimals;
  });
  return animalsPerLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsPerLocationWithName = {};
  locations.forEach((location) => {
    const newAnimals = animals.filter(animal => animal.location === location)
      .map((animal) => {
        const nameKey = animal.name;
        const nameValues = animal.residents
        .filter((resident) => {
          const isFilteringSex = sex !== undefined;
          return isFilteringSex ? resident.sex === sex : true;
        })
        .map(resident => resident.name);
        if (sorted) nameValues.sort();
        return { [nameKey]: nameValues };
      });
    animalsPerLocationWithName[location] = newAnimals;
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
  // seu código aqui
  if (!dayName) {
    return Object.keys(hours).reduce((result, day) => {
      const { open, close } = hours[day];
      let monday = `Open from ${open}am until ${close - 12}pm`;
      if (day === 'Monday') {
        monday = 'CLOSED';
      }
      return { ...result, [day]: monday };
    }, {});
  } else if (dayName === 'Monday') {
    return { [dayName]: 'CLOSED' };
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const animalSpecie = employees.find(employee => employee.id === id).responsibleFor[0];
  const specieResidents = animals.find(animal => animal.id === animalSpecie).residents;
  const finalAnimal = specieResidents
    .reduce((acc, { name, sex, age }) => (age > acc.age ? [name, sex, age] : acc));
  return finalAnimal;
}

function increasePrices(percentage) {
  // seu código aqui
  const addPrice = percentage / 100;
  const newArray = ['Adult', 'Senior', 'Child'];
  for (let i = 0; i < newArray.length; i += 1) {
    data.prices[newArray[i]] =
    Math.round((prices[newArray[i]] + (prices[newArray[i]] * addPrice)) * 100) / 100;
  }
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
