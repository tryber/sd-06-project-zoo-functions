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
  // seu código aqui
  const findAnimals = (array, animalId) => {
    array.push(data.animals.find(animalObj => animalObj.id === animalId));
    return array;
  };
  return (ids.length)
    ? ids.reduce(findAnimals, [])
    : [];
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const getResidentsAge = (array, resident) => {
    array.push(resident.age);
    return array;
  };
  const ageArray = data.animals
    .find(element => element.name === animal)
    .residents.reduce(getResidentsAge, []);
  return ageArray.every(residentAge => residentAge >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  return (employeeName)
    ? data.employees
      .find(person => person.firstName === employeeName
        || person.lastName === employeeName)
    : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  // seu código aqui
  let idIsManager = false;
  data.employees
    .forEach((person) => {
      if (person.managers
        .find(managerId => managerId === id)
        ) {
        idIsManager = true;
      } else {
        return idIsManager;
      }
      return idIsManager;
    });
  return idIsManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  // SOURCE: encontrei dicas sensacionais de uso do reduce em https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/
  const countAnimals = (obj, current) => ({ ...obj, [current.name]: current.residents.length });

  if (!species) {
    return data.animals.reduce(countAnimals, {});
  }
  return (data.animals
    .find(animal => animal.name === species)
      .residents.length);
}

function entryCalculator(entrants) {
  // seu código aqui
  const prices = Object.assign({}, data.prices);
  const sumEntries = (sum, current) => sum + (prices[current] * entrants[current]);
  return (!entrants || Object.keys(entrants).length === 0)
    ? 0
    : Object.keys(entrants).reduce(sumEntries, 0);
}

function animalMap({ includeNames = false, sex = '', sorted = false } = {}) {
  // seu código aqui
  const getLocations = data.animals
    .reduce((array, element) => [...array, element.location], []);
  const locations = [...new Set(getLocations)];
  const result = locations
    .reduce((acc, element) => ({ ...acc, [element]: [] }), {});
  const getSpeciesByLocation = (currLocation) => {
    result[currLocation] = data.animals
      .filter(species => species.location === currLocation)
      .map(speciesObj => speciesObj.name);
  };
  locations.forEach(getSpeciesByLocation);
  if (includeNames) {
    // .map method to get animals' names
    const getAnimalSex = currResident => !sex || sex === currResident.sex;
    // Method to get species and names into results
    const getSpeciesAndNames = (location) => {
      result[location] = result[location]
        .flatMap(species => ({
          [species]: data.animals
            .find(animalObj => animalObj.name === species)
            .residents.filter(getAnimalSex)
            .flatMap(resident => resident.name),
        }));
    };
    locations.forEach(getSpeciesAndNames);
  }
  // what to do if option sorted is triggered
  if (sorted && includeNames) {
    locations.forEach(
      location => result[location].forEach(
        (species, index) => Object.keys(species)
          .forEach(element => result[location][index][element]
            .sort(),
          ),
      ),
    );
  }
  return result;
}

function schedule(dayName = 'all') {
  // seu código aqui
  const allDays = {};
  Object.keys(data.hours).forEach((day) => { allDays[day] = data.hours[day] });

  let result = {};

  const genMessage = day => {
    if (allDays[day].open === 0) {
      return "CLOSED"
    } else {
      return `Open from ${allDays[day].open}am until ${allDays[day].close - 12}pm`;
    }
  }

  switch(dayName) {
    case 'all':
      Object.keys(allDays).forEach(day => result[day] = genMessage([day]));
      break;
    default:
      result[dayName] = genMessage(dayName);
      break;
  }
  return result;
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
