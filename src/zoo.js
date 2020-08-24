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
const { animals, employees, hours, prices } = require('./data');

const { Adult, Senior, Child } = prices;

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.filter(animalGroup =>
  animalGroup.name === animal)[0].residents.every(eachAnimal => eachAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
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
  return employees.some((employee, index) => employee.managers[index] === id);
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  return animals.reduce((animalsList, eachAnimal) =>
    ({ ...animalsList, [eachAnimal.name]: eachAnimal.residents.length })
  , {});
}

function entryCalculator(entrants) {
  if (entrants === {} || entrants === undefined) {
    return 0;
  }

  const { Adult: quantAdult = 0, Senior: quantSenior = 0, Child: quantChild = 0 } = entrants;

  return (Adult * quantAdult) + (Senior * quantSenior) + (Child * quantChild);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  hours.forEach();
}

function oldestFromFirstSpecies(id) {
  const employeeById = employees.filter(emp => emp.id === id);
  const animalByEmp = animals.filter(animal => animal.id === employeeById[0].responsibleFor[0]);
  const oldestAnimal = animalByEmp[0].residents.reduce((oldAnimal, currentAnimal) =>
  (oldAnimal.age > currentAnimal.age ? oldAnimal : currentAnimal));
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const currentPercentage = (percentage / 100) + 1;
  Object.entries(prices)
  .forEach(([key, value]) => {
    prices[key] = Math.round(value * currentPercentage * 100) / 100;
  });
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
