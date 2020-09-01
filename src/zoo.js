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
  return data.animals.filter(({ id }, i) => id === ids[i]);
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(({ name }) => name === animal)
  .flatMap(filtered => filtered.residents)
  .every(individual => individual.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  return data.employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(individual => individual.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(obj);
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    data.animals.forEach((individual) => {
      const name = individual.name;
      const count = individual.residents.length;
      obj[name] = count;
    });
    return obj;
  }

  return data.animals.find(individual => individual.name === species).residents.length;
}

function entryCalculator(entrants) {
  let price = 0;
  if (!entrants) {
    return 0;
  } else if (entrants.length === 0) {
    return 0;
  }

  if (entrants.Adult) {
    price += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Child) {
    price += entrants.Child * data.prices.Child;
  }
  if (entrants.Senior) {
    price += entrants.Senior * data.prices.Senior;
  }
  return price;
}

function animalMap(options) {
  // abcd
}

function schedule(dayName) {
  const obj = {};
  const hours = Object.keys(data.hours);
  hours.forEach((day) => {
    if (data.hours[day].open !== 0) {
      obj[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    } else {
      obj[day] = 'CLOSED';
    }
  });

  if (!dayName) {
    return obj;
  }

  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const specie = data.employees.find(individual => individual.id === id).responsibleFor[0];
  const individuals = data.animals.find(specieID => specieID.id === specie).residents;
  let age = 0;
  const oldest = [];
  for (let i = 0; i < individuals.length; i += 1) {
    if (individuals[i].age > age) {
      oldest[0] = individuals[i].name;
      oldest[1] = individuals[i].sex;
      oldest[2] = individuals[i].age;
      age = individuals[i].age;
    }
  }

  return oldest;
}

function increasePrices(percentage) {
  percentage = (percentage / 100) + 1;
  data.prices.Adult = Math.round((data.prices.Adult * percentage) * 100) / 100;
  data.prices.Child = Math.round((data.prices.Child * percentage) * 100) / 100;
  data.prices.Senior = Math.round((data.prices.Senior * percentage) * 100) / 100;
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
