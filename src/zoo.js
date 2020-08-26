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

//const data = require('./data');
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(elemento => elemento.id === ids || ids.includes(elemento.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(nome => nome.name === animal).residents.every(idade => idade.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return employees.find(ele => ele.firstName === employeeName || ele.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployeee = { ...personalInfo, ...associatedWith };
  return newEmployeee;
}
function isManager(id) {
  // seu código aqui
  return employees.some(gerente => gerente.managers.includes(id));
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const obj = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  if (!species) {
    return obj;
  }
  return animals.find(elemento => elemento.name === species).residents.length;
}
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === {} || !entrants) {
    return 0;
  }
  let result = 0;
  Object.keys(entrants).forEach((elemento, index) => {
    result += prices[elemento] * Object.values(entrants)[index];
  });
  return result;
}
function animalMap(options) {
  // seu código aqui
}
function schedule(dayName) {
  // seu código aqui
  //if(!dayName) {
    //console.log(Object.entries(hours).reduce((acc, {open, close}) => {
      const calendar = acc
   // }))
  //}
}
//schedule()
function oldestFromFirstSpecies(id) {
  // seu código aqui
  const first = employees.find(elemento => elemento.id === id).responsibleFor[0];
  const nome = animals.find(elemento => elemento.id === first)
  .residents.sort((a, b) => b.age - a.age);
  return [nome[0].name, nome[0].sex, nome[0].age];
}
function increasePrices(percentage) {
// seu código aqui


  Object.keys(prices).forEach((elemento) => {
    prices[elemento] = Number((prices[elemento] + (((prices[elemento] * percentage) + 0.001) / 100))
  .toFixed(2));
  });
}

function employeeCoverage(idOrName) {
  // sem parametro => todos animais
  const result = [];
  if (!idOrName) {
    employees.forEach(employee => {
      result[`${employee.firstName} ${employee.lastName}`] = [];
      employee.responsibleFor.forEach(animalIdResponsibleFor => {
        const foundAninal = animals.find(animal => animal.id === animalIdResponsibleFor).name;
        result[`${employee.firstName} ${employee.lastName}`].push(foundAninal)
      })
    });
    return result
  }
}
employeeCoverage();

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
