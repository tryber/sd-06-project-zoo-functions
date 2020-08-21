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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return (
    data
      .animals
      .find(anim => anim.name === animal)
      .residents
      .every(resident => resident.age >= age)
  );
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  return (
    data
      .employees
      .find(emp => emp.firstName === employeeName || emp.lastName === employeeName)
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, lastName, id } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return (
    data
      .employees
      .some(employee => employee.managers.includes(id))
  );
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees = [...data.employees, newEmployee];
}

function animalCount(species) {
  if (species) {
    return (
      data
        .animals
        .find(animal => animal.name === species)
        .residents
        .length
    );
  }

  return (
    data
      .animals
      .reduce((start, next) => {
        const specie = next.name;
        const count = next.residents.length;
        start[specie] = count;
        return start;
      }, {})
  );
}

function entryCalculator(entrants = 0) {
  const possible = ['Adult', 'Senior', 'Child'];

  return (
    possible
      .reduce((start, next) => start + (data.prices[next] * (entrants[next] || 0)), 0)
  );
}

function buildStructure() {
  return (
    data
      .animals
      .reduce((start, next) => {
        const loc = next.location;
        const locObj = {};
        locObj[loc] = [];
        start = { ...start, ...locObj }
        return start;
      }, {})
  )
}

function animalMap(options = {}) {
  const { includeNames, sorted, sex } = options;
  // builds structure
  const possibleLocs = buildStructure();

  return (
    data
      .animals
      .reduce((locations, next) => {
        if (!includeNames) {
          locations[next.location].push(next.name);
          return locations;
        }

        const objAnimal = {};
        const animal = next.name;
        objAnimal[animal] = (
          next
            .residents
            .filter(res => (sex) ? (res.sex === sex) : true)
            .map(res => res.name)
        );

        if (sorted) {
          objAnimal[animal].sort();
        }

        locations[next.location].push(objAnimal);
        return locations;
      }, possibleLocs)
  );
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
