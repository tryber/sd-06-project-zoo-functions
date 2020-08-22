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
  // seu código aqui
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
  const emptyObject = noArguments ? undefined : Object.keys(entrants).length === 0 && entrants.constructor === Object;

  if (noArguments || emptyObject) {
    return 0;
  }
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
}

function schedule(dayName) {
  const closed = 'CLOSED';


  if (schedule.arguments.length === 0) {
    const entries = Object.entries(hours);
    const allSchedule = {};
    const twelveHourClock = entries.map(entry => formatWorkingHours(entry))
    // const twelveHourClock = entries.map(entry => {
    //   const openingTime = entry[1].open;
    //   const closingTime = entry[1].close - 12;

    //   if (openingTime === 0) {
    //     return closed;
    //   }

    //   return `Open from ${openingTime}am until ${closingTime}pm`;
    // })

    entries.forEach((daySchedule, index) => {
      allSchedule[daySchedule[0]] = twelveHourClock[index]
    });

    return allSchedule;
  } else {
    const day = Object.entries(hours).find(day => day[0] === dayName);

    let openingTime2;

    if (day[0] === 'Monday') {
      openingTime2 = closed;
    } else {
      openingTime2 = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    }
    const object = {}
    object[day[0]] = openingTime2

    return object
  }


}

schedule('Tuesday');

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
