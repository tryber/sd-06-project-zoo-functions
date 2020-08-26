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
const data = require('./data.js');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const arr = [];
  if (ids === undefined) {
    return arr;
  }
  ids.map(id => arr.push(animals.find(animal => animal.id === id)));
  return arr;
}

function animalsOlderThan(animal, age) {
  const animalsName = animals.find(animalName => animalName.name === animal);
  const checkAge = animalsName.residents.every(residentAge => age < residentAge.age);
  return checkAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const findEmployee = employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName);
  return findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const findManager = employees.some(employee => employee.managers.includes(id));
  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    const animalsName = animals.find(animal => animal.name === species);
    return animalsName.residents.length;
  }
  const animalsCount = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  return animalsCount;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(...options) {
  // seu código aqui
}

function schedule(dayName) {
  const scheduleFormated = {};
  const daysOfWeek = Object.keys(hours);
  daysOfWeek.forEach((day) => {
    if (day === 'Monday') {
      scheduleFormated[day] = 'CLOSED';
    } else {
      scheduleFormated[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });

  if (!dayName) {
    return scheduleFormated;
  }

  return { [dayName]: scheduleFormated[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employeeResponsibleFor = employees.find(employee => employee.id === id).responsibleFor[0];

  const animalsManaged = animals.find(animal => animal.id === employeeResponsibleFor)
  .residents.sort((a, b) => b.age - a.age)[0];
  return [animalsManaged.name, animalsManaged.sex, animalsManaged.age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((price) => {
    prices[price] = Math.round((prices[price] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  const result = {};
  let filteredEmployees;

  if (!idOrName) {
    filteredEmployees = employees;
  } else {
    filteredEmployees = employees.filter(
      employee => employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName);
  }

  filteredEmployees.forEach((employee) => {
    const mappedAnimals = employee.responsibleFor.map((animalIdResponsibleFor) => {
      const findAnimalName = animals.find(animal => animal.id === animalIdResponsibleFor).name;
      return findAnimalName;
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
