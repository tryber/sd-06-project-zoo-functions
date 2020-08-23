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

const { animals } = data;
const { employees } = data;
const { hours } = data;
const { prices: fees } = data;

function animalsByIds(...ids) {
  if (animalsByIds.arguments.length === 0) {
    return [];
  } else if (ids.length === 1) {
    const animal = animals.find(animalGroup => animalGroup.id === ids[0]);

    return [animal];
  }

  return animals.filter((animalGroup, index) => animalGroup.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals.find(animalGroup => animalGroup.name === animal)
    .residents
    .every(specificAnimal => specificAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeByName.arguments.length === 0) {
    return {};
  }

  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .flatMap(employee => employee.managers)
    .some(managerId => managerId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);

  return data.employees;
}

function animalCount(species) {
  if (animalCount.arguments.length === 0) {
    const allAnimals = {};
    animals.forEach((animalGroup) => {
      allAnimals[animalGroup.name] = animalGroup.residents.length;
    });

    return allAnimals;
  }

  return animals.find(animalGroup => animalGroup.name === species).residents.length;
}

// Checking for empty object as seen on: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object

function entryCalculator(entrants) {
  const noArguments = entryCalculator.arguments.length === 0;
  const emptyObject = noArguments ?
    undefined :
    Object.keys(entrants).length === 0 && entrants.constructor === Object;

  if (noArguments || emptyObject) {
    return 0;
  }

  return null;
}

function animalMap(options) {
  // seu código aqui
}

const formatWorkingHours = (day) => {
  const closed = 'CLOSED';
  const openingTime = day[1].open;

  if (openingTime === 0) {
    return closed;
  }

  const closingTime = day[1].close - 12;

  return `Open from ${openingTime}am until ${closingTime}pm`;
};

function schedule(dayName) {
  const scheduleObject = {};
  const scheduleEntries = Object.entries(hours);
  let workingHours;

  if (schedule.arguments.length === 0) {
    workingHours = scheduleEntries.map(entry => formatWorkingHours(entry));

    scheduleEntries.forEach((daySchedule, index) => {
      scheduleObject[daySchedule[0]] = workingHours[index];
    });
  } else {
    const toBeFormattedDay = scheduleEntries.find(day => day[0] === dayName);
    workingHours = formatWorkingHours(toBeFormattedDay);
    scheduleObject[toBeFormattedDay[0]] = workingHours;
  }

  return scheduleObject;
}

// Create array using reduce as seen on: https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays/39128144#39128144

function oldestFromFirstSpecies(id) {
  const animalGroupsInfo = employees.find(employee => employee.id === id).responsibleFor[0];
  const firstGroupInfo = animals.find(animalGroup => animalGroup.id === animalGroupsInfo);
  const { residents: animalsTakenCareByEmployee } = firstGroupInfo;

  return animalsTakenCareByEmployee
    .reduce((oldestAnimal, current) => {
      if (current.age > oldestAnimal.age) {
        return [current.name, current.sex, current.age];
      }

      return oldestAnimal;
    });
}

function increasePrices(percentage) {
  const keys = Object.keys(fees);
  const values = Object.values(fees);
  const updatedFees = values.map(fee => (fee + (fee * (percentage / 100))), {});

  const updatedFeesObject = keys
    .reduce((priceObject, key, index) => {
      const roundedFee = Math.round(updatedFees[index] * 100) / 100;
      // this rounds correctly three decimal places -> 74.985

      return { ...priceObject, [key]: roundedFee };
    }, {});

  data.prices.Adult = updatedFeesObject.Adult;
  data.prices.Senior = updatedFeesObject.Senior;
  data.prices.Child = updatedFeesObject.Child;

  return data.prices;
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
