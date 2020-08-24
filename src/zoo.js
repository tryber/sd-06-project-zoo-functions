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
  const getLocations = [];
  data.animals.forEach(element => getLocations.push(element.location));
  const locations = [...new Set(getLocations)];
  const result = {};
  locations.forEach(element => {
    result[element] = []
  });
  const getAnimals = (array, animal) => [ ...array, animal.name ];
  Object.keys(result)
    .forEach((currLocation) => {
      result[currLocation] = data.animals
      .filter(animal => animal.location === currLocation)
      .reduce(getAnimals, []);
    });
  if (includeNames) {
    // reduce method to get each resident animal´s name
    const animalNames = (currResident) => {
      if (!sex) {
        return currResident.name;
      }
      if (sex === currResident.sex) {
        return currResident.name;
      }
    };
    // start of main code to populate result
    locations.forEach(
      (location) => {
        result[location]
          .forEach((species, index) => {
            result[location][index] = ({
              [species]: data.animals
              .find(element => element.name === species)
                .residents
                  .filter(animalNames)
                    .map(element => element.name) });
          });
      }
    );
  }
  // what to do if option sorted is triggered
  if (sorted || (sorted && sex && includeNames)) {
    locations.forEach(
      location => result[location].forEach(
        (species, index) => Object.keys(species)
          .forEach(element => result[location][index][element].sort())
      )
    );
  }
  return result;
}

function schedule(dayName) {
  // seu código aqui
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
