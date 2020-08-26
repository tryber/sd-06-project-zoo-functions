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
  const animalsSearch = ids
    .map(animalID => animals
      .find(animal => animal.id === animalID));

  return animalsSearch;
}

function animalsOlderThan(animalName, animalAge) {
  const animalsOlderThanAge = animals
    .find(animal => animalName === animal.name).residents
    .every(resident => resident.age >= animalAge);

  return animalsOlderThanAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};

  const findEmployeeByName = employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);

  return findEmployeeByName;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const isManagerID = employees.some(({ managers }) => managers.includes(id));

  return isManagerID;
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

  const entrantskeys = Object.keys(entrants);
  const sumPrices = (acc, key) => acc + (entrants[key] * prices[key]);

  return entrantskeys.reduce(sumPrices, 0);
}

const getSpeciesPerLocation = (directions) => {
  const speciesLocation = {};

  directions
    .forEach((direction) => {
      speciesLocation[direction] = animals
      .filter(animal => animal.location === direction)
      .map(animal => animal.name);
    });

  return speciesLocation;
};

const getNamesPerLocations = (directions, sorted, sex) => {
  const speciesLocation = {};

  directions.forEach((direction) => {
    speciesLocation[direction] = animals
      .filter(animal => animal.location === direction)
      .map((animal) => {
        const key = animal.name;
        const value = animal.residents
          .filter(resident => (sex ? resident.sex === sex : true))
          .map(resident => resident.name);

        if (sorted) value.sort();

        return { [key]: value };
      });
  });

  return speciesLocation;
};

function animalMap(options) {
  const directions = ['NE', 'NW', 'SE', 'SW'];

  if (!options) return getSpeciesPerLocation(directions);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return getSpeciesPerLocation(directions);

  return getNamesPerLocations(directions, sorted, sex);
}

function schedule(dayName) {
  const timetable = {};
  const days = Object.keys(hours);

  days.forEach((day) => {
    const openHour = hours[day].open;
    const closeHour = hours[day].close - 12;

    if (day !== 'Monday') {
      timetable[day] = `Open from ${openHour}am until ${closeHour}pm`;
    } else timetable[day] = 'CLOSED';
  });

  if (!dayName) return timetable;

  return { [dayName]: timetable[dayName] };
}

function oldestFromFirstSpecies(id) {
  const specieID = employees.find(employee => employee.id === id).responsibleFor[0];
  const specieResidents = animals.find(animal => animal.id === specieID).residents;
  const getOldest = (acc, resident) => {
    if (resident.age > acc.age) return resident;
    return acc;
  };
  const oldestAnimal = specieResidents.reduce(getOldest);

  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const pricesKeys = Object.keys(prices);

  pricesKeys.forEach((key) => {
    prices[key] = Math.round((prices[key] * (1 + (percentage / 100))) * 100) / 100;
  });

  return prices;
}

const getEmployeeCoverage = () => {
  const employeesResponsibleFor = {};
  const getAnimalSpecies = responsibleFor => responsibleFor
    .map(id => animals
      .find(animal => animal.id === id).name);

  employees.forEach(({ firstName, lastName, responsibleFor }) => {
    const fullName = `${firstName} ${lastName}`;
    employeesResponsibleFor[fullName] = getAnimalSpecies(responsibleFor);
  });

  return employeesResponsibleFor;
};

function employeeCoverage(idOrName) {
  let coverage = {};

  if (!idOrName) {
    coverage = getEmployeeCoverage();
    return coverage;
  }

  const employeeByID = employees.find(employee => employee.id === idOrName);
  const employeeByFirstName = employees.find(employee => employee.firstName === idOrName);
  const employeeByLastName = employees.find(employee => employee.lastName === idOrName);
  let fullName;

  if (employeeByID) fullName = `${employeeByID.firstName} ${employeeByID.lastName}`;

  if (employeeByFirstName) fullName = `${idOrName} ${employeeByFirstName.lastName}`;

  if (employeeByLastName) fullName = `${employeeByLastName.firstName} ${idOrName}`;

  coverage[fullName] = getEmployeeCoverage()[fullName];

  return coverage;
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
