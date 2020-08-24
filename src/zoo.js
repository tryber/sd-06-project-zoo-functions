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
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const chosenAnimal = animals.find(element => element.name === animal);
  const chosenResident = chosenAnimal.residents;
  const checkAge = chosenResident.every(element => element.age >= age);
  return checkAge;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { managers, responsibleFor } = associatedWith;
  const { firstName, lastName, id } = personalInfo;

  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((result, animal) => {
      result[animal.name] = animal.residents.length;
      return result;
    }, {});
  }
  return animals.filter(animal => animal.name === species)
  .reduce((result, animal) => result + animal.residents.length, 0);
}

function entryCalculator(entrants) {
  if (!entrants || entrants.length === 0) {
    return 0;
  }
  let totalChild = 0;
  let totalSenior = 0;
  let totalAdult = 0;
  if (entrants.Adult) totalChild += entrants.Adult * data.prices.Adult;
  if (entrants.Senior) totalSenior += entrants.Senior * data.prices.Senior;
  if (entrants.Child) totalAdult += entrants.Child * data.prices.Child;
  const total = totalChild + totalSenior + totalAdult;
  return total;
}

function animalMap(options = {}) {
  // seu código aqui
}

function schedule(dayName) {
  const daysOfTheWeek = (dayName !== undefined && dayName !== '') ? [dayName] : Object.keys(data.hours);
  const answer = {};
  // aqui foi recebido o dayName.
  // Caso seja uma string, guardamos o nome num array para buscarmos as infos desse dia.
  // Caso seja undefined, pegamos todas as keys de opcoes de dias dentro do objeto hours

  daysOfTheWeek.forEach((key) => {
    let { open, close } = data.hours[key];
    close = (close > 12) ? close - 12 : close;
    open = (open > 12) ? open - 12 : open;
    const hour = (open !== 0 && close !== 0) ? `Open from ${open}am until ${close}pm` : 'CLOSED';
    answer[key] = hour;
  });
  // no forEach pegamos cada dia, e, para manter no padrao de 12hrs, diminuimos 12 do valor.
  // Exemplo: Se fecha as 18hrs (18-12=6hrs) fecha as
  // 6hrs da tarde, e criamos uma string com esses dados.
  // Se o horario for igual a 0, retornamos 'CLOSED'.
  return answer;
}

function oldestFromFirstSpecies(id) {
  const animalId = (data.employees.find(employee => employee.id === id).responsibleFor[0]);
  return (Object
    .values(data.animals
      .find(animal => animal.id === animalId)
      .residents.sort((a, b) => b.age - a.age)[0]));
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
