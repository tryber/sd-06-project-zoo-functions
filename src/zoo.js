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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');


function animalsByIds(...ids) {
  return animals.filter(element => ids.find(param => param === element.id));
}

function animalsOlderThan(animal, idade) {
  return animals.find(element => element.name === animal).residents.every(element =>
    element.age >= idade);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(element => element.firstName === employeeName ||
    element.lastName === employeeName);
}


function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(element => element.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newObject);
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach((element) => {
      const chave = element.name;
      const valor = element.residents.length;
      obj[chave] = valor;
    });
    return obj;
  }
  return animals.find(animais => animais.name === species).residents.length;
}


function entryCalculator(entrants) {
  let total = 0;
  if (entrants === undefined) return total;
  if (entrants.Adult) total += entrants.Adult * prices.Adult;
  if (entrants.Senior) total += entrants.Senior * prices.Senior;
  if (entrants.Child) total += entrants.Child * prices.Child;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const obj = {};
  const hora = Object.entries(hours);
  if (dayName === undefined) {
    hora.map((dia) => {
      if (dia.includes('Monday')) {
        obj.Monday = 'CLOSED';
        return obj;
      }
      return (obj[dia[0]] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`);
    });
    return obj;
  }
  return hora.filter(name => name[0] === dayName).map((dia) => {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
      return obj;
    }
    obj[dayName] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`;
    return obj;
  })[0];
}

function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find(element => element.id === id).responsibleFor[0];
  const animalsResidents = animals.find(element => element.id === idAnimal).residents;
  const onlyValues = animalsResidents.map(element => Object.values(element));
  return onlyValues.sort((a, b) => b[2] - a[2])[0];
}

function increasePrices(percentage) {
  const perc = percentage / 100;
  Object.keys(prices).forEach((valor) => {
    prices[valor] = Math.round((prices[valor] + (prices[valor] * perc)) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  const obj = {};
  employees.map((employee) => {
    employee.animalList = employee.responsibleFor.map(idAnimal => animals.find(animal =>
      animal.id === idAnimal).name);
    return employee;
  });
  if (idOrName === undefined) {
    employees.forEach((element) => {
      const nomes = `${element.firstName} ${element.lastName}`;
      obj[nomes] = element.animalList;
    });
    return obj;
  }
  const people = employees.find(element => idOrName === element.id ||
      idOrName === element.firstName || idOrName === element.lastName);
  const nomes = `${people.firstName} ${people.lastName}`;
  obj[nomes] = people.responsibleFor.flatMap(idAni => animals
    .find(ani => idAni === ani.id).name);
  return obj;
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
