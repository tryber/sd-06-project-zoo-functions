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
  return data.animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(element => element.name === animal)
  .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const retorno = data.employees
  .find(trab => trab.firstName === employeeName || trab.lastName === employeeName);
  return retorno;
}

function createEmployee(personalInfo, associatedWith) {
  const retorno = { ...personalInfo, ...associatedWith };
  return retorno;
}

function isManager(id) {
  return data.employees.some(gerente => gerente.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const obj = {};
  function addAminalObj(param) {
    obj[param.name] = param.residents.length;
  }
  if (species === undefined || species === '') {
    data.animals.forEach(animal => addAminalObj(animal));
    return obj;
  }
  {
    const findTheAnimal = data.animals.find(animal => animal.name === species);
    return findTheAnimal.residents.length;
  }
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  let totalPrice = 0;
  if (entrants.Adult) {
    totalPrice += (entrants.Adult * data.prices.Adult);
  }
  if (entrants.Senior) {
    totalPrice += (entrants.Senior * data.prices.Senior);
  }
  if (entrants.Child) {
    totalPrice += (entrants.Child * data.prices.Child);
  }
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // let dia = data.hours[dayName];
  // function calendarioParaHumanos () {
  //   const retorno = `{${dia}: Open from ${dia.open}am until ${dia.close}pm}`;
  //   return retorno;
  // }
  // if (dayName === 0 || dayName === undefined || dayName === '') {
  //   return {
  //     'Tuesday': 'Open from 8am until 6pm',
  //     'Wednesday': 'Open from 8am until 6pm',
  //     'Thursday': 'Open from 10am until 8pm',
  //     'Friday': 'Open from 10am until 8pm',
  //     'Saturday': 'Open from 8am until 10pm',
  //     'Sunday': 'Open from 8am until 8pm',
  //     'Monday': 'CLOSED'
  //   }
  // }
  // if (dayName.toUpperCase() === 'Monday'.toUpperCase()) {
  //   return { 'Monday': 'CLOSED' };
  // }
  // if (data.hours[dayName] === dayName) {
  //   calendarioParaHumanos();
  // }
}

function oldestFromFirstSpecies(id) {
  const funcionario = data.employees.find((func) => func.id === id);
  const idDoPrimeiroAnimalGerenciado = funcionario.responsibleFor[0];
  const objDoAnimal= data.animals.find((animal) => animal.id === idDoPrimeiroAnimalGerenciado);
  const arreiObjectResidentes = objDoAnimal.residents;
  const arreiArrayResidents = arreiObjectResidentes.map((obj) => Object.values(obj));
  const arreiOrdenado = arreiArrayResidents.sort(function(param1, param2) {
    return param2[2] - param1[2];
  });
  return arreiOrdenado[0];
}

function increasePrices(percentage) {
  const multiplicador = (100 + percentage);
  const newprices = data.prices;
  newprices.Adult = (Math.round((newprices.Adult * multiplicador).toFixed(2))) / 100;
  newprices.Senior = (Math.round((newprices.Senior * multiplicador).toFixed(2))) / 100;
  newprices.Child = (Math.round((newprices.Child * multiplicador).toFixed(2))) / 100;
  return newprices;
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
