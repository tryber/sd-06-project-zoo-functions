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
const {
  animals,
  employees
} = require('./data');

function animalsByIds(...ids) {
  // seu código aqui..
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
  .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
    if (employeeName === undefined) {
      return {}
    } else {}
    return employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  }

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // 'Cria um novo colaborador a partir de objetos contendo informações pessoais, gerentes e animais gerenciados'
  return Object.assign({}, personalInfo, associatedWith)
}

function isManager(id) {
  // seu código aqui
  const man = employees.map(element => element.managers)
  // .some(idManager => idManager === id);
}
console.log(employees.map(element => element.managers))
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
//   // seu código aqui
//   // if dayName.length === 0 {
//   //   return {
//       'Tuesday': 'Open from 8am until 6pm',
//       'Wednesday': 'Open from 8am until 6pm',
//       'Thursday': 'Open from 10am until 8pm',
//       'Friday': 'Open from 10am until 8pm',
//       'Saturday': 'Open from 8am until 10pm',
//       'Sunday': 'Open from 8am until 8pm',
//       'Monday': 'CLOSED'
//     } else if (dayName.length !== 0) {
//       return `${dayName}: Open from ${employees.hours[dayName].open}am to`
//     }

//   }
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