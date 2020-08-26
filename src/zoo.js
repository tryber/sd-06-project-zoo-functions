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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(id1 = '', ...ids) {
  if (id1 === '') {
    return [];
  }
  return animals.filter(element => element.id === id1 || ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
  .residents.every(element2 => element2.age >= age);
}

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  return employees
  .find(employee => console.log(employee) ||
  employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const resultCountAnimals = {};
const allAnimals = (animalObj) => {
  const animalName = animalObj.name;
  const getAnimalsCount = (acc, animal) => acc + 1;
  const numbersAnimal = animalObj.residents.reduce(getAnimalsCount, 0);
  Object.defineProperty(resultCountAnimals, animalName, { value: numbersAnimal,
    enumerable: true,
    configurable: true,
    writable: true });
};

function animalCount(species) {
  if (species === undefined) {
    animals.forEach(allAnimals);
    return resultCountAnimals;
  }
  const animalCountObj = animals.find(animalObj => animalObj.name === species);
  const getAnimalCount = (acc, animal) => acc + 1;
  return animalCountObj.residents.reduce(getAnimalCount, 0);
}

function entryCalculator(entrants = {}) {
  if (entrants === {}) {
    return 0;
  }
  let total = 0;

  let adults = 0;

  if (entrants.Adult) {
    adults = entrants.Adult * 49.99;
  }

  let seniors = 0;
  if (entrants.Senior) {
    seniors = entrants.Senior * 24.99;
  }

  let children = 0;

  if (entrants.Child) {
    children = entrants.Child * 20.99;
  }

  total = adults + seniors + children;

  return total;
}

// function retrieveAnimalsPerLocation(locations) {
//   const animalsPerLocation = {};

//   locations.forEach((location) => {
//     const animals = data.animals
//       .filter(animal => animal.location === location)
//       .map(animal => animal.name);
//     if (animals.length !== 0) animalsPerLocation[location] = animals;
//   });

//   return animalsPerLocation;
// }

// function retrieveAnimalsByLocationWithName(locations) {
//   const animalsPerLocationWithName = {};

//   locations.forEach((location) => {
//     const animals = data.animals
//       .filter(animal => animal.location === location)
//       .map((animal) => {
//         const nameKey = animal.name;
//         const nameValues = animal.residents.map(resident => resident.name);
//       return { [nameKey]: nameValues}
//       });
//     animalsPerLocationWithName [location] = animals;
//   })

//   return retrieveAnimalsByLocationWithName;
// }

function animalMap(options) {
  // const locations = ['NE', 'NW', 'SE', 'SW'];

  // if (!options) return retrieveAnimalsPerLocation(locations)

  // const includeNames = options.includeNames;

  // if (includeNames) return retrieveAnimalsByLocationWithName(locations)
}

const getScheduleUndefined = () => {
  const daysOfTheWeek = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const result = {};
  daysOfTheWeek.forEach((day) => {
    const dayDefined = hours[day];
    Object.defineProperty(result, day, { value: `Open from ${dayDefined.open}am until ${dayDefined.close - 12}pm`, enumerable: true, configurable: true, writable: true });
  });
  Object.defineProperty(result, 'Monday', { value: 'CLOSED', enumerable: true, configurable: true, writable: true });
  return result;
};

function schedule(dayName) {
  if (dayName === undefined) {
    return getScheduleUndefined();
  }
  let result = {};
  Object.keys(hours).forEach((day) => {
    if (day === dayName) {
      if (day === 'Monday') {
        result = { Monday: 'CLOSED' };
      } else {
        const defined = hours[day];
        result = { [day]: `Open from ${defined.open}am until ${defined.close - 12}pm` };
      }
    }
  });
  return result;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animal = animals.find(specie => specie.id === animalId).residents;
  let oldestAge = 0;
  let oldestAnimal = {};
  animal.forEach((specificAnimal) => {
    if (specificAnimal.age > oldestAge) {
      oldestAge = specificAnimal.age;
      oldestAnimal = specificAnimal;
    }
  });
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const percentageDivided = percentage / 100;
  prices.Adult = Math.round((prices.Adult + (prices.Adult * percentageDivided)) * 100) / 100;
  prices.Senior = Math.round((prices.Senior + (prices.Senior * percentageDivided)) * 100) / 100;
  prices.Child = Math.round((prices.Child + (prices.Child * percentageDivided)) * 100) / 100;
}

const animalsEmployee = (employee, result) => {
  const employeeName = `${employee.firstName} ${employee.lastName}`;
  const animalsId = employee.responsibleFor;
  const animalsName = [];
  animalsId.forEach((idAnimal) => {
    const animalObj = animals.find(animal => animal.id === idAnimal);
    animalsName.push(animalObj.name);
  });
  Object.defineProperty(result, employeeName, { value: animalsName,
    enumerable: true,
    configurable: true,
    writable: true });
};


function employeeCoverage(idOrName) {
  const result = {};
  if (idOrName) {
    const employeeObj = employees.find(employee => employee.id === idOrName
      || employee.firstName === idOrName || employee.lastName === idOrName);
    animalsEmployee(employeeObj, result);
  } else if (idOrName === undefined) {
    employees.forEach((employee) => {
      animalsEmployee(employee, result);
    });
  }
  return result;
}
console.log(employeeCoverage());

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
