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
  return animals.filter((animal) => {
    for (let i = 0; i < ids.length; i += 1) {
      if (animal.id === ids[i]) {
        return true;
      }
    }
    return false;
  });
}

function animalsOlderThan(animal, age) {
  return animals
    .find(specie => specie.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const name = employees.find((employee) => {
    const { firstName, lastName } = employee;
    return firstName === employeeName || lastName === employeeName;
  });
  if (name) {
    return name;
  }

  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(employee => employee.managers.some(managerId => managerId === id));
}

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  species = animals.map(animal => animal.name);
  const count = animals.map(animal => animal.residents.length);
  const creatArrayAnimals = {};

  for (let i = 0; i < count.length; i += 1) {
    creatArrayAnimals[species[i]] = count[i];
  }

  return creatArrayAnimals;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }

  const entrantsKeys = Object.keys(entrants);
  const entrantsQuantity = Object.values(entrants);

  return entrantsQuantity
    .map((entrant, index) => entrant * prices[entrantsKeys[index]])
    .reduce((acc, curr) => acc + curr, 0);
}

function animalMap(options) {
  let locations = new Set();
  animals.map(animal => animal.location).forEach((location) => locations.add(location));
  locations = Array.from(locations).sort();

  const result = {};
  locations.forEach((local) => {
    result[local] = animals
      .filter((animal) => animal.location === local)
      .map((individual) => individual.name);
  });

  return result;
}

animalMap();

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  const result = {};
  dayName.forEach((day) => {
    if (hours[day].open === 0) {
      result[day] = 'CLOSED';
    } else {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });

  return result;
}

function oldestFromFirstSpecies(id) {
  const { name, sex, age } = animals
    .find(animal => animal.id === employees.find(employee => employee.id === id).responsibleFor[0])
    .residents
    .sort((resident1, resident2) => resident2.age - resident1.age)[0];

  return [name, sex, age];
}

function increasePrices(percentage = 0) {
  const newPrices = prices;
  const entrantsKey = Object.keys(prices);
  const entrantsValue = Object.values(prices);
  const pricesSize = entrantsKey.length;

  for (let i = 0; i < pricesSize; i += 1) {
    newPrices[entrantsKey[i]] = (
      Math.round((entrantsValue[i] * (1 + (percentage / 100))) * 100) / 100
    );
  }

  Object.assign(prices, newPrices);
}

function employeeCoverage(idOrName) {
  const result = {};

  employees.forEach((employee) => {
    const idAnimalCovered = employee.responsibleFor.map(idAnimal => animalsByIds(idAnimal)[0].name);
    result[`${employee.firstName} ${employee.lastName}`] = idAnimalCovered;
  });

  if (idOrName) {
    const targetEmployee = employees.find((employee) => {
      const { firstName, lastName, id } = employee;
      return firstName === idOrName || lastName === idOrName || id === idOrName;
    });
    const employeeFullName = `${targetEmployee.firstName} ${targetEmployee.lastName}`;

    return { [employeeFullName]: result[employeeFullName] };
  }

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
