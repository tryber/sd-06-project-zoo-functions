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
const { employees, prices } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(Element => Element.name === animal)
  .residents.every(Element => Element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(Element =>
    Element.firstName === employeeName || Element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(Element => Element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const array = {
    id, firstName, lastName, managers, responsibleFor,
  };
  return employees.push(array);
}

function animalCount(species) {
  if (species === undefined) {
    const object = {};

    data.animals.map(element => (object[element.name] = element.residents.length));
    return object;
  }
  const animal = data.animals.find(element => element.name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === null) {
    return 0;
  }
  const keys = Object.keys(entrants);
  const price = keys.reduce((soma, currentValue) =>
    soma + (entrants[currentValue] * prices[currentValue]), 0);
  return price;
}

function animalMap(options) {

}

function schedule(dayName) {
  const days = Object.keys(data.hours);
  const scheduleObject = {};

  days.forEach((day) => {
    if (day === 'Monday') {
      scheduleObject[day] = 'CLOSED';// 'Monday': 'CLOSED'
    } else {
      const open = data.hours[day].open;// = 8
      const closed = data.hours[day].close - 12;// = 6
      scheduleObject[day] = `Open from ${open}am until ${closed}pm`;// 'Tuesday': 'Open from 8am until 6pm'
    }
  });

  if (dayName === undefined) return scheduleObject;
  return { [dayName]: scheduleObject[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // Descostruindo o Array de Objetos
  const { Adult, Senior, Child } = prices;
        // 74.99          49,99          ex:50 -> 1.5  -> 150  -> 1.5
  const adulto = (Math.round(Adult * (1 + (percentage / 100)) * 100)) / 100;
          // 31.49         20.99          ex:50 -> 1.5  -> 150  -> 1.5
  const criança = (Math.round(Child * (1 + (percentage / 100)) * 100)) / 100;
          // 37.49          24.99          ex:50 -> 1.5  -> 150  -> 1.5
  const idoso = (Math.round(Senior * (1 + (percentage / 100)) * 100)) / 100;
  // 'Adult': 74.99,
  prices.Adult = adulto;
  // 'Senior': 37.49,
  prices.Child = criança;
  // 'Child': 31.49
  prices.Senior = idoso;
  // { 'Adult': 74.99, 'Senior': 37.49, 'Child': 31.49 }
  return {
    Adult: adulto,
    Senior: idoso,
    Child: criança,
  };
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
