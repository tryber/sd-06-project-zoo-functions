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
  // seu código aqui
  if (ids.length === 0) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const result = animals.find(element => element.name === animal);
  return result.residents.every(element => element.age >= age);
}

function employeeByName(employeeName = '') {
  // seu código aqui
  if (employeeName === '') return {};
  return employees.find(element =>
    element.firstName === employeeName || element.lastName === employeeName);
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
  const obj = {};
  if (!species) {
    animals.forEach(element => (obj[element.name] = element.residents.length));
    return obj;
  }
  return animals.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const entrantKeys = Object.keys(entrants);
  return entrantKeys.reduce((acc, current, index) => {
    const aux = prices[current] * Object.values(entrants)[index];
    return acc + aux;
  }, 0);
}

function retrieveAnimalsByLocation(locations) {
  const animalsByLocation = {};
  locations.forEach((location) => {
    const animalLocation = animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);
    if (animalLocation.length !== 0) animalsByLocation[location] = animalLocation;
  });
  return animalsByLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsByLocationWithName = {};

  locations.forEach((location) => {
    const animalLocation = animals
      .filter(animal => animal.location === location)
      .map((animal) => {
        const nameKey = animal.name;
        const nameValues = animal.residents
          .filter((resident) => {
            const isFilteringSex = sex != undefined;
            return isFilteringSex ? resident.sex === sex : true;
          })
          .map(resident => resident.name);

        if (sorted) nameValues.sort();

        return { [nameKey]: nameValues };
      });
  animalsByLocationWithName[location] = animalLocation;
  });
  return animalsByLocationWithName;
}

function animalMap(options) {
  // seu código aqui
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retrieveAnimalsByLocation(locations);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return retrieveAnimalsByLocation(locations);

  return retrieveAnimals(locations, sorted, sex);
}

function schedule(dayName) {
  // seu código aqui
  const obj = {};
  const days = Object.keys(hours);
  const scheduleValue = Object.values(hours);
  days.forEach((element, index) => {
    if (scheduleValue[index].open === 0) {
      obj[element] = 'CLOSED';
    } else {
      obj[element] = `Open from ${scheduleValue[index].open}am until ${scheduleValue[index].close - 12}pm`;
    }
  });
  if (!dayName) {
    return obj;
  }
  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstIdAnimal = employees.find(element => element.id === id).responsibleFor[0];
  const dataAnimal = animals.find(animal => animal.id === firstIdAnimal);
  let older = 0;
  const olderAnimal = dataAnimal.residents.reduce((acc, curr) => {
    if (curr.age > older) {
      older = curr.age;
      acc = curr;
    }
    return acc;
  });
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  const aliquot = (percentage / 100) + 1;
  prices.Adult = Math.round(prices.Adult * aliquot * 100) / 100;
  prices.Senior = Math.round(prices.Senior * aliquot * 100) / 100;
  prices.Child = Math.round(prices.Child * aliquot * 100) / 100;
  return prices;
}

function employeeCoverage(idOrName) {
  // seu código aqui


  const fullList = {};
  let animalsAux = [];
  employees.forEach((element) => {
    element.responsibleFor.forEach((id) => {
      const objAnimal = animals.find(curr => curr.id === id);
      animalsAux.push(objAnimal.name);
    });
    fullList[`${element.firstName} ${element.lastName}`] = animalsAux;
    animalsAux = [];
  });
  if (!idOrName) {
    return fullList;
  }
  const employeeData = employees.find(element =>
    element.id === idOrName ||
    element.firstName === idOrName ||
    element.lastName === idOrName);
  const fullName = `${employeeData.firstName} ${employeeData.lastName}`;
  return { [fullName]: fullList[fullName] };
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
