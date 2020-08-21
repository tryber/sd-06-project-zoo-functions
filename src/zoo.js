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
    ? data.employees.find(person => person.firstName === employeeName || person.lastName === employeeName)
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
  const countAnimals = (obj, current) => {
    return ({ ...obj, [current.name]: current.residents.length });
  };

  if (!species) {
    return data.animals.reduce(countAnimals, {});
  }
  return (data.animals
    .find(animal => animal.name === species)
      .residents.length);
}

function entryCalculator(entrants) {
  // seu código aqui
  const { Adult: priceAdult, Senior: priceSenior, child: priceChild } = data.prices;
  let totalCost = 0;
  (!entrants || Object.keys(entrants).length === 0)
    ? totalCost
    : totalCost = entrants.reduce((sum, element) => {
        switch (element) {
          case 'Adult' || 'adult':
            return (sum + (priceAdult * entrants[element].value));
          case 'Senior' || 'senior':
            return (sum + (priceSenior * entrants[element].value));
          case 'Child' || 'child':
            return (sum + (priceChild * entrants[element].value));
          default:
            break;
        }
        return sum;
    });
  return totalCost;
}

function animalMap(options) {
  // seu código aqui
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
