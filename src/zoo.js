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
  // Caso receba nenhum parâmetro
  if (ids.length === 0) return [];
  // Caso receba um ou dois pârametros
  return animals.filter(animal => ids.includes(animal.id));
}


function animalsOlderThan(animal, age) {
  return animals
    .find(animalArray => animalArray.name === animal).residents
    .every(ageArray => ageArray.age >= age);
}

function employeeByName(employeesByName) {
  // Caso receba nenhum parâmetro
  if (employeesByName === undefined) return {};
  // Caso receba o fistName ou LastName
  return employees
    .find(employee => (employee.firstName === employeesByName ||
    employee.lastName === employeesByName));
}

function createEmployee(personalInfo, associatedWith) {
  const joinEmployee = Object.assign(personalInfo, associatedWith);
  return joinEmployee;
}

function isManager(id) {
  return employees.some(manager => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // Sem parâmetros, retorna animais e suas quantidades
  if (species === undefined) {
    const array = {};
    animals.forEach((speciesAll) => {
      array[speciesAll.name] = speciesAll.residents.length;
    });
    return array;
  }
  // Retorna somente a quantidade a quantidade da especie
  return animals.find(amount => amount.name === species).residents.length;
}

function entryCalculator(entrants) {
  // Retorna 0 se nenhum argumento for passado
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adult = (prices.Adult) * Adult;
  const child = (prices.Child) * Child;
  const senior = (prices.Senior) * Senior;
  const sum = adult + child + senior;
  return sum;
}

function animalMap(options) {
  // Sem parâmetros, retorna animais categorizados por localização
}

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;
  //  Sem parâmetros, retorna um cronograma legível para humanos
  const daysOfTheWeek = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  // Se um único dia for passado, retorna somente este dia em um formato legível para humanos
  if (dayName === undefined) return daysOfTheWeek;
  const key = Object.keys(daysOfTheWeek).find(day => day === dayName);
  return { [key]: daysOfTheWeek[key] };
}

function oldestFromFirstSpecies(id) {
  const employeeId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalId = Object.values(animals
    .find(animal => animal.id === employeeId).residents
    .reduce((acumulator, animal) => {
      if (acumulator.age > animal.age) return acumulator;
      return animal;
    }));
  return animalId;
}

function increasePrices(percentage) {
  const percent = percentage / 100;
  Object.keys(prices).forEach((value) => {
    const calc = (prices[value] + (prices[value] * percent)) * 100;
    prices[value] = Math.round(calc) / 100;
  });
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
