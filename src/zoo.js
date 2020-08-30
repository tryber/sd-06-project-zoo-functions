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
  // Retorna um array vazio, caso não envie nada como parametro
  if (!ids) return [];
  // Retorna os animais com o Id enviado como parametro
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
// Retorna um valor boleado todos os animais possuem a idade minima
  return data.animals.find(Element => Element.name === animal)
  .residents.every(Element => Element.age >= age);
}

function employeeByName(employeeName) {
  // Retorna um array vazio, caso não envie nada como parametro
  if (!employeeName) return {};
// Faz uma bosca no array dos funcionais, fazendo um find no FirstName e Lastname,
  return data.employees.find(Element =>
    // retornando o Funcionario em qualquer uma das circunstancias
    Element.firstName === employeeName || Element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // O método "Object.assign()" é usado para copiar os valores de todas as propriedades
  // Tenha Cuidado, Pois ele ira retornar todos os arrays misturados entre sí
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  // Testa se o Id passado como parametro é de um gerente, se
  return employees.some(Element => Element.managers.includes(id));
}
// Pega todos os valores - Managers, responsibleFor = retornam [] caso venham vazios
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
// Cria um Array de Objetos com as propriedades
  const array = {
    id, firstName, lastName, managers, responsibleFor,
  };
// Retorna o Array de Objetos
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
  const increasePriceCount = (priceStyle, porcentagem) => {
    const result = ((Math.round(priceStyle * (1 + (porcentagem / 100)) * 100)) / 100);
    return result;
  };
  const adulto = (increasePriceCount(Adult, percentage));
  const criança = (increasePriceCount(Child, percentage));
  const idoso = (increasePriceCount(Senior, percentage));
  // 'Adult': 74.99,
  prices.Adult = adulto;
  // 'Senior': 37.49,
  prices.Child = criança;
  // 'Child': 31.49
  prices.Senior = idoso;
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
