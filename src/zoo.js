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

// const data = require('./data');
const {
  animals,
  employees,
  prices,
  hours,
} = require('./data');
const data = require('./data');
// const { TestScheduler } = require('jest');

function animalsByIds(...ids) {
  // seu código aqui..
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
    .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.flatMap(element => element.managers).some(idManager => idManager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  let lastEmployee = {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
  }
  return employees.push(lastEmployee)
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const animais = {};
    animals.forEach(function (element) {
      animais[element.name] = element.residents.length;
    });
    return animais;
  }
  const animalsTotal = animals.filter(element => element.name === species).map(element => element.residents.length);
  return animalsTotal[0];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants == undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const totalValue = Object.keys(entrants).map(element => entrants[element] * prices[element]).reduce((prev, next) => prev + next);
  return totalValue;
};

function animalMap(options) {
const locations = ['NE', 'NW', 'SE', 'SW'];

if (!options) {
  animalsPerLocation = {};

  locations.forEach((location) => {
    const animals = data.animals.filter(animal => animal.location === location).map(animal => animal.name);

    if (animals.length !== 0) animalsPerLocation[location] = animals;
  });
  return animalsPerLocation;
} 

}
// console.log(animals.filter(animal => animal.location === 'NE').map(nome => nome.name))

function schedule(dayName) {
  const allWeek = {};
  const allDays = Object.keys(hours);
  const allZooDays = allDays.map(element => element !== 'Monday' ? allWeek[element] = `Open from ${hours[element].open}am until ${hours[element].close-12}pm` : allWeek[element] = `CLOSED`);
  if (!dayName) {
    return allWeek;
  } const newActual = {[dayName]: allWeek[dayName]};
    return newActual
};

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  const result = {};
  employees.forEach((employee) => {
  const mappedAnimals = employee.responsibleFor.map(
    (animalIdResponsibleFor) => {
      const foundAnimalName = animals.find((animal) => animal.id === animalIdResponsibleFor).name;
      return foundAnimalName;
    })
      result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
    });

  return result;
  }
// console.log(employeeCoverage('c1f50212-35a6-4ecd-8223-f835538526c2'))

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