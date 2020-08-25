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
const { employees, animals } = require('./data');

function animalsByIds(...params) {
  return data.animals.filter(animal => params.includes(animal.id));
}

function animalsOlderThan(animalName, animalAge) {
  const animalFinded = data.animals.find(animal => animalName === animal.name);
  return animalFinded.residents.every(resident => resident.age >= animalAge);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employe =>
    employe.firstName === employeeName || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(idManager) {
  const manager = data.employees.flatMap(employee => employee.managers);
  return manager.includes(idManager);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
}

function animalCount(species) {
  if (species === undefined) {
    const objAnimals = {};
    animals.forEach((_, indice) => {
      const speciesAnimal = animals[indice].name;
      const qtdAnimal = animals[indice].residents.length;
      objAnimals[speciesAnimal] = qtdAnimal;
    });
    return objAnimals;
  }
  const animalFinded = data.animals.find(animal => species === animal.name);
  return animalFinded.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let sum = 0;
  const arrEntries = Object.entries(entrants);
  arrEntries.forEach(element => (sum += (data.prices[element[0]] * element[1])));
  return sum;
}

// Código do Plantão do Oliva ->
function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const animalss = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);

    if (animalss.length !== 0) animalsPerLocation[location] = animalss;
  });

  return animalsPerLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsPerLocationWithName = {};

  locations.forEach((location) => {
    const animalss = data.animals
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

    animalsPerLocationWithName[location] = animalss;
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
// <- Código do Planto do Oliva

function schedule(dayName) {
  const allDays = Object.keys(data.hours);
  const schedulee = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      schedulee[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      schedulee[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });

  if (dayName === undefined) return schedule;
  return { [dayName]: schedule[dayName] };
}

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
