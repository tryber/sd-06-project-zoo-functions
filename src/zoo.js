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

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((elem, i) => elem.id === ids[i]);
}

function animalsOlderThan(animal, ages) {
  // seu código aqui
  const datas = animals
    .filter(elem => elem.name === animal)
    .flatMap(elem => elem.residents)
    .every(elem => elem.age >= ages);
  return datas;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  const employee = data.employees
    .filter(elem => elem.firstName === employeeName || elem.lastName === employeeName)
    .reduce((acc, curr) => acc + curr);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((elem, i) => elem.managers[i] === id);
}

function addEmployee(...info) {
  // seu código aqui
  const newEmp = {
    id: info[0],
    firstName: info[1],
    lastName: info[2],
    managers: (info.length >= 4) ? info[3] : [],
    responsibleFor: (info.length >= 5) ? info[4] : [],
  };
  data.employees.push(newEmp);
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    const obj = {};
    for (let i = 0; i < animals.length; i += 1) {
      const { name, residents } = animals[i];
      obj[name] = residents.length;
    }
    return obj;
  }
  const animal = animals
    .filter(elem => elem.name === species)
    .map(elem => elem.residents.length);
  const [first] = animal;
  return first;
}

function entryCalculator(entrants = 0) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult, Child, Senior } = data.prices;
  let result = 0;
  if(Object.keys(entrants).includes('Adult')) {
    result += Adult * entrants.Adult;
  }
  if (Object.keys(entrants).includes('Child')) {
    result += Child * entrants.Child;
  }
  if (Object.keys(entrants).includes('Senior')) {
    result += Senior * entrants.Senior;
  }
  return result;
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
