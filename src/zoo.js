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
const { animals, prices, employees } = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(animale => animale.name === animal)
  .residents.every(animalee => animalee.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(name =>
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(idManeger => idManeger.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeeAdd = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(employeeAdd);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, currValor) => {
      acc[currValor.name] = currValor.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.values(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
}

function animalMap(options) {
  // const locations = ['NE', 'NW', 'SE', 'SW'];

  // if (options === undefined) {
  //   const animalsLocation = {};
  //   locations.forEach((location) => {
  //     const animals = data.animals
  //     .filter(animal => animal.location === location)
  //     .map(animal => animal.name);

  //    if(animals.length !== 0) animalsLocation[location] = animals;
  //   });
  //   return animalsLocation;
  // }
}

function schedule(dayName) {
  const allDays = Object.keys(data.hours);
  const workDay = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      workDay[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      workDay[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });
  if (dayName === undefined) return workDay;
  return { [dayName]: workDay[dayName] };
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  return Object.values(animals.find(animal => animal.id === animalId).residents
    .reduce((older, animal) => (older.age > animal.age ? older : animal)));
}

function increasePrices(percentage) {
}

function employeeCoverage(idOrName) {
  // resolução no plantão
  const result = {};
  let filteredEmployees;
  if (!idOrName) {
    filteredEmployees = data.employees;
  } else {
    filteredEmployees = data.employees.filter(
      employee => employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName,
    );
  }
  filteredEmployees.forEach((employee) => { // em vez de replicar trocou o data.emp. por filtered
    const mappedAnimals = employee.responsibleFor.map(
      (animalIdResponsibleFor) => {
        const foundAnimalName = data.animals.find(
          animal => animal.id === animalIdResponsibleFor).name;
        return foundAnimalName;
      });
    result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
  });
  return result;
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
