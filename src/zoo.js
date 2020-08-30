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

function animalsByIds(...ids) {
  const agoraVaiEmNomeDoPai = ids
    .map(idAtual => data.animals
      .find(animal => animal.id === idAtual));
  return agoraVaiEmNomeDoPai;
}

function animalsOlderThan(animal, age) {
  const ageOfAnimals = data.animals
    .filter(species => species.name === animal)[0].residents
      .every(animalAge => animalAge.age >= age);
  return ageOfAnimals;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const employees = data.employees
    .find(Element => Element.firstName === employeeName || Element.lastName === employeeName);
  return employees;
}

function createEmployee(personalInfo, associatedWith) {
  const create = Object.assign(personalInfo, associatedWith);
  return create;
}

function isManager(id) {
  const arr = [];
  data.employees
    .forEach(Element => (arr.push(Element.managers)));

  const newArray = arr
    .reduce((acc, sub) => acc.concat(sub), []);

  const managerCheck = newArray
  .some(Element => Element === id);

  return managerCheck;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!managers) {
    managers = [];
  }

  if (!responsibleFor) {
    responsibleFor = [];
  }

  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);

  return data.employees;
}

function getAnimalCount(specie) {
  return data.animals.filter(el => el.name === specie)[0].residents.length;
}

function animalCount(species) {
  if (!species) {
    const animalsList = {};
    data.animals
      .forEach(el => (animalsList[el.name] = getAnimalCount(el.name)));
    return animalsList;
  }

  return getAnimalCount(species);
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }

  let total = 0;
  const getKeys = Object.keys(entrants);
  const getValues = Object.values(entrants);

  getKeys.forEach((el, index) => { total += data.prices[el] * getValues[index]; });

  return total;
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);

    if (animals.length !== 0) animalsPerLocation[location] = animals;
  });

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
          return isFilteringSex ? resident.sex === sex : true;
        })
        .map(resident => resident.name);

        if (sorted) nameValues.sort();

        return { [nameKey]: nameValues };
      });

    animalsPerLocationWithName[location] = animals;
  });

  return animalsPerLocationWithName;
}

function animalMap(options) { // Resolução Guiada
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return retrieveAnimalsPerLocation(locations);

  return retrieveAnimals(locations, sorted, sex);
}

function schedule(dayName) { // Resolução Guiada
  const allDays = Object.keys(data.hours);
  const objSchedule = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      objSchedule[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      objSchedule[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });

  if (!dayName) return objSchedule;
  return { [dayName]: objSchedule[dayName] };
}

function oldestFromFirstSpecies(id) {
  const getFirstSpecie = data.employees
    .find(Element => Element.id === id).responsibleFor[0];

  const AnimalsAge = [];

  data.animals
    .find(Element => Element.id === getFirstSpecie).residents
    .forEach((Element) => {
      AnimalsAge.push(Element.age);
    });

  const getIndexOf = AnimalsAge.indexOf(Math.max.apply(null, AnimalsAge));

  const getOldest = data.animals
    .find(Element => Element.id === getFirstSpecie).residents[getIndexOf];

  return [getOldest.name, getOldest.sex, getOldest.age];
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
