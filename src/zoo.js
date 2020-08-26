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

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  const idsParameters = ids;
  return data.animals.filter(idFind => idFind.id === idsParameters[0] ||
  idFind.id === idsParameters[1]);
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(especie => especie.name === animal)
  .every(checkAge => checkAge.residents.every(ages => ages.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(findEmployeer => findEmployeer.firstName === employeeName ||
    findEmployeer.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const employeer = personalInfo;
  const { managers } = associatedWith;
  const { responsibleFor } = associatedWith;
  employeer.managers = managers;
  employeer.responsibleFor = responsibleFor;
  return employeer;
}

function isManager(id) {
  return data.employees.some(idCheck => idCheck.managers.some(idManager => idManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species) {
    const animal = data.animals.find(element => element.name === species);
    return animal.residents.length;
  }
  return data.animals.reduce((acc, animal) => ({ ...acc, [animal.name]: animal.residents.length }),
  {});
}

function entryCalculator(entrants = 0) {
  let totalPrice = 0;
  if (entrants.Adult) {
    totalPrice += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Senior) {
    totalPrice += entrants.Senior * data.prices.Senior;
  }
  if (entrants.Child) {
    totalPrice += entrants.Child * data.prices.Child;
  }
  return totalPrice;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  const animalLocations = {};
  if (!options || !options.includeNames) {
    locations.forEach((location) => {
      animalLocations[location] = data.animals.filter(animal => animal.location === location)
      .map(animal => animal.name);
    });
    return animalLocations;
  }
  if (options.includeNames) {
    locations.forEach((location) => {
      animalLocations[location] = data.animals.filter(animal => animal.location === location)
      .map((animal) => {
        const animalK = animal.name;
        const animalName = animal.residents
        .filter(residents => (options.sex ? residents.sex === options.sex : true))
        .map(animalNames => animalNames.name);
        if (options.sorted) animalName.sort();
        return { [animalK]: animalName };
      });
    });
  }
  return animalLocations;
}

function schedule(dayName) {
  const weekDays = Object.keys(data.hours);
  if (!dayName) {
    return weekDays.reduce((acc, days) => {
      const { open, close } = data.hours[days];
      if (days === 'Monday') return { ...acc, [days]: 'CLOSED' };
      return { ...acc, [days]: `Open from ${open}am until ${close - 12}pm` };
    }, {});
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  const { open, close } = data.hours[dayName];
  return { [dayName]: `Open from ${open}am until ${close - 12}pm` };
}

function oldestFromFirstSpecies(id) {
  const getAnimalId = data.employees.find(element => element.id === id).responsibleFor[0];
  const getAnimalObject = data.animals.find(animalId => animalId.id === getAnimalId);
  const orderResidents = getAnimalObject.residents.sort((a, b) => b.age - a.age);
  const olderAnimal = [orderResidents[0].name, orderResidents[0].sex, orderResidents[0].age];
  return olderAnimal;
}

function increasePrices(percentage) {
  const category = ['Adult', 'Senior', 'Child'];
  for (let i = 0; i <= 2; i += 1) {
    data.prices[category[i]] = Math.round((data.prices[category[i]] *
      (1 + (percentage / 100)) * 100)) / 100;
  }
}

function employeeCoverage(idOrName) {
  // teste
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
