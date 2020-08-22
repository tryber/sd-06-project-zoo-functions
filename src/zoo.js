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
  // seu código aqui
  // Verificar se o parâmetro é vazio, se for retorna um array vazio
  // Se receber um único parâmetro retorna o animal com o id recebido
  // Se receber mais de um parâmetro retorna todos os animais com os ids
  const result = [];
  if (ids === undefined) return result;
  ids.forEach((id) => {
    result.push(animals.find(animal => animal.id === id));
  });
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Recebe uma espécie e uma idade
  // Se todos os animais de uma espécie tiverem acima da idade especificada
  // retorna true
  // Caso contrário retorna false
  const species = animals.find(specie => specie.name === animal);
  const animalsAge = species.residents.every(specie => specie.age >= age);
  return animalsAge;
}

function employeeByName(employeeName) {
  // seu código aqui
  const result = {};
  if (employeeName === undefined) return result;
  const firstNameEmployee = employees.find(firstName => firstName.firstName === employeeName);
  const lastNameEmployee = employees.find(lastName => lastName.lastName === employeeName);
  if (firstNameEmployee) {
    return firstNameEmployee;
  }
  return lastNameEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const nameManager = employees.some(name => name.managers.includes(id) === true);
  return nameManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const quantity = animals.find(({ name }) => name === species);
  const allAnimals = animals.reduce((accumulator, { name, residents }) => {
    accumulator[name] = residents.length;
    return accumulator;
  }, {});
  return species ? quantity.residents.length : allAnimals;
}


function entryCalculator(entrants) {
  // seu código aqui
  // if  (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  // const keysPrice = Object.keys(prices);
  // const total = (price, ticket) => price + (prices[ticket] * entrants[ticket]);
  // return keysPrice.reduce(total, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const openHours = {};
  const daysOfWeek = Object.keys(hours);
  daysOfWeek.forEach((day) => {
    if(day === 'Monday') {
      openHours[day] = 'CLOSED';
    } else {
      openHours[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12 }pm`;
    };
  });
  if (dayName !== undefined) {
    return { [dayName]: openHours[dayName] };
  }
  return openHours;
}

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
