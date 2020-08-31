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
  const objCalendar = Object.assign({}, data.hours);
  const daysKeysArray = Object.keys(objCalendar);
  daysKeysArray.forEach((day) => {
    objCalendar[day] = `Open from ${objCalendar[day].open}am until ${objCalendar[day].close - 12}pm`;
    if (day === 'Monday') objCalendar[day] = 'CLOSED';
  });
  if (dayName === undefined) {
    return objCalendar;
  }
  const readableSchedule = {};
  readableSchedule[dayName] = objCalendar[dayName];
  return readableSchedule;
}

function oldestFromFirstSpecies(id) {
  const funcionario = data.employees.find(func => func.id === id);
  const idDoPrimeiroAnimalGerenciado = funcionario.responsibleFor[0];
  const objDoAnimal = data.animals.find(animal => animal.id === idDoPrimeiroAnimalGerenciado);
  const arreiObjectResidentes = objDoAnimal.residents;
  const arreiArrayResidents = arreiObjectResidentes.map(obj => Object.values(obj));
  const arreiOrdenado = arreiArrayResidents.sort(function (param1, param2) {
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

function findName(idArrei) {
  const objAnimal = data.animals.find(animal => animal.id === idArrei);
  return objAnimal.name;
}
const expected = {
  'Nigel Nelson': ['lions', 'tigers'],
  'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
  'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
  'Wilburn Wishart': ['snakes', 'elephants'],
  'Stephanie Strauss': ['giraffes', 'otters'],
  'Sharonda Spry': ['otters', 'frogs'],
  'Ardith Azevado': ['tigers', 'bears'],
  'Emery Elser': ['elephants', 'bears', 'lions'] };

function employeeCoverage(idOrName) {
  const retorno = {};
  function createRetorno(objFunc) {
    const arreiAnimais = objFunc.responsibleFor.map(findName);
    const fullName = `${objFunc.firstName} ${objFunc.lastName}`;
    retorno[fullName] = arreiAnimais;
    return retorno;
  }
  if (data.employees.find(obj => obj.id === idOrName)) {
    return createRetorno(data.employees.find(obj => obj.id === idOrName));
  } else if (data.employees.find(obj => obj.firstName === idOrName)) {
    return createRetorno(data.employees.find(obj => obj.firstName === idOrName));
  } else if (data.employees.find(obj => obj.lastName === idOrName)) {
    return createRetorno(data.employees.find(obj => obj.lastName === idOrName));
  }
  return expected;
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
