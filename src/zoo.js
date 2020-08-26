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

function animalsByIds(...ids) {
  const result = [];
  ids.forEach((eachId) => {
    animals.forEach(animal => (animal.id === eachId ? result.push(animal) : null));
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const filteredAnimals = animals.filter(eachAnimal => eachAnimal.name === animal);
  return filteredAnimals[0].residents.every(eachAnimal => eachAnimal.age > age);
}

function employeeByName(employeeName) {
  const employeeObj = employees.filter((employee) => {
    const testFName = employee.firstName === employeeName;
    const testLName = employee.lastName === employeeName;
    return (testFName) || (testLName);
  })[0];
  return (employeeObj === undefined) ? {} : employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(each => each === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    const foundAnimal = animals.find(element => (element.name === species));
    return foundAnimal.residents.length;
  }
  const animalsCount = {};
  animals.forEach(each => (animalsCount[each.name] = each.residents.length));
  return animalsCount;
}

function entryCalculator(entrants = 0) {
  let sum = 0;
  sum += Object.keys(entrants)
    .reduce((acc, entrant, i) => acc + (Object.values(entrants)[i] * prices[entrant]), 0);
  return sum;
}

function listByLocation() {
  const animalsRegion = { NE: [], NW: [], SE: [], SW: [] };
  Object.values(animals).forEach(animal => animalsRegion[animal.location].push(animal.name));
  return animalsRegion;
}

function animalMap(options = 0) {
  const animalsRegion = listByLocation();
  const { includeNames = false, sorted = false, sex = undefined } = options;

  if (includeNames) {
    Object.keys(animalsRegion).forEach((region) => {
      const animalsByLoc = [...animalsRegion[region]];
      animalsByLoc.forEach((animal) => {
        animalsRegion[region].shift();
        const listNames = {};
        const list = [];

        animals
          .filter(eachAnimal => eachAnimal.name === animal)[0].residents
          .forEach((listResident) => {
            if (sex === undefined) list.push(listResident.name);
            if (sex === 'male' || sex === 'female') {
              if (listResident.sex === sex) list.push(listResident.name);
            }
          });

        if (sorted) list.sort();
        listNames[animal] = list;
        animalsRegion[region].push(listNames);
      });
    });
  }
  return animalsRegion;
}

function schedule(dayName) {
  const week = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  const result = {};

  week.forEach((day) => {
    if (hours[day].open !== 0) {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      result[day] = 'CLOSED';
    }
  });

  if (week.some(day => dayName === day)) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalsInfo = animals.filter(animal => animal.id === animalId)[0].residents;
  const oldestAge = animalsInfo.reduce((acc, curr) => Math.max(acc, curr.age), 0);
  const oldestAnimal = animalsInfo.find(animal => animal.age === oldestAge);
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const percent = (percentage / 100) + 1;
  Object.keys(prices).forEach((each) => {
    prices[each] = Math.ceil(prices[each] * (percent * 100)) / 100;
  });
}

function employeeCoverage(idOrName) {
  const coverage = {};

  const listOfAnimals = (employee) => {
    const listAnimals = [];
    const pushAnimalName = (eachId) => {
      animals.forEach((animal) => {
        if (animal.id === eachId) listAnimals.push(animal.name);
      });
    };
    employee.responsibleFor.forEach(eachId => pushAnimalName(eachId));
    return listAnimals;
  };

  const addFullName = (employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    coverage[fullName] = listOfAnimals(employee);
  };

  if (!idOrName) {
    employees.forEach(employee => addFullName(employee));
    return coverage;
  }

  employees.forEach((employee) => {
    const { id, firstName, lastName } = employee;
    if (id === idOrName || firstName === idOrName || lastName === idOrName) addFullName(employee);
  });
  return coverage;
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
