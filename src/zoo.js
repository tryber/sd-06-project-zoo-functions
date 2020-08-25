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
const { prices } = data;
const { hours } = data;

function animalsByIds(...ids) {
  // seu código aqui
  if (!ids) return [];

  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const species = animals.find(element => element.name === animal);
  return species.residents.every(individual => individual.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};

  return employees.find(employee =>
    employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, element) =>
      ({ ...acc, [element.name]: element.residents.length }), {});
  }

  return animals
    .find(element => element.name === species)
    .residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) return 0;

  // if (Object.entries(entrants).length > 0) {
  //   for (let key of Object.keys(entrants)) {
  //     totalEntries += entrants[key] * prices[key]
  //   }
  //   return totalEntries;
  // }

  const entrances = Object.keys(entrants).reduce((total, key) =>
    total + (entrants[key] * prices[key]), 0);
  return entrances;
}

function animalMap(options) {
  // seu código aqui

}

function schedule(dayName) {
  // seu código aqui
  const scheduleOutput = Object.keys(hours).reduce((acc, day) =>
    ({ ...acc, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` }),
    {});
  scheduleOutput.Monday = 'CLOSED';

  if (dayName) {
    const dayHours = {};
    dayHours[dayName] = scheduleOutput[dayName];
    return dayHours;
  }

  return scheduleOutput;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeFirstAnimal = employees.find(employee =>
    employee.id === id).responsibleFor[0];

  const firstAnimal = animals.find(animal => animal.id === employeeFirstAnimal);

  const oldestIndividual = firstAnimal.residents.reduce((acc, individual) => {
    if (acc.age > individual.age) return acc;
    return individual;
  });

  const oldestInfo = [oldestIndividual.name, oldestIndividual.sex, oldestIndividual.age];

  return oldestInfo;
}

function increasePrices(percentage) {
  // seu código aqui
  const entrances = Object.keys(prices);

  for (let i = 0; i < entrances.length; i += 1) {
    prices[entrances[i]] =
      Math.round((prices[entrances[i]] + ((prices[entrances[i]] * percentage) / 100)) * 100) / 100;
  }

  return prices;
}

function employeeCoverage(idOrName) {
  const employeeAnimals = {};

  if (!idOrName) {
    employees.forEach((employee) => {
      const animalsUnderEmployeeCare = employee.responsibleFor.map((animalId) => {
        const animalNames = animals.find(animal => animal.id === animalId).name;
        return animalNames;
      });
      employeeAnimals[`${employee.firstName} ${employee.lastName}`] = animalsUnderEmployeeCare;
    });
    return employeeAnimals;
  }
  const employee = employees.find((individual) => {
    if (individual.firstName === idOrName
      || individual.lastName === idOrName
      || individual.id === idOrName) {
      return individual;
    }
    return individual;
  });

  const coveredAnimals = [];
  for (let i = 0; i < employee.responsibleFor.length; i += 1) {
    coveredAnimals.push(animals.find(animal => animal.id === employee.responsibleFor[i]).name);
  }
  const employeeResponsibilities = { [`${employee.firstName} ${employee.lastName}`]: coveredAnimals };
  return employeeResponsibilities;
}
console.log(employeeCoverage("Nigel"))
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
