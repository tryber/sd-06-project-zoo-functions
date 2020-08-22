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
const { animals, employees, } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter(animalId => ids.includes(animalId.id));
}

function animalsOlderThan(animal, age) {
  const filteringAnimals = animals.find(targetAnimal => targetAnimal.name === animal);
  const checkingAge = filteringAnimals.residents.every(animalAges => animalAges.age > age);
  return checkingAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const findingEmployees = employees
  .find((employeeNames =>
  (employeeNames.firstName === employeeName || employeeNames.lastName === employeeName)));
  return findingEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  const creatingEmployee = Object.assign(personalInfo, associatedWith);
  return creatingEmployee;
}

function isManager(id) {
  const manager1 = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
  const manager2 = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
  if (id === manager1 || id === manager2) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers: managers === undefined ? [] : managers,
    responsibleFor: responsibleFor === undefined ? [] : responsibleFor,
  };
  return employees.push(lastEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals
    .reduce((previousValue, currentValue) => ({
      ...previousValue, [currentValue.name]: currentValue.residents.length,
    }), {});
  }
  const targetAnimal = animals.find((animal => species === animal.name));
  return targetAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
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
  const updatedPrices = data.prices;
  const pricesKeys = Object.keys(updatedPrices);
  const pricesValues = Object.values(updatedPrices);
  const multiplier = (1 + percentage) / 100;
  pricesValues.forEach((key, index) => {
    updatedPrices[pricesKeys[index]] = Math.round((key * multiplier) * 100) / 100;
  });
  data.prices = updatedPrices;
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
