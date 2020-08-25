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

// const data = require('./data');
const {
  animals,
  employees,
  prices,
} = require('./data');
const data = require('./data');
// const { TestScheduler } = require('jest');

function animalsByIds(...ids) {
  // seu código aqui..
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
    .residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.flatMap(element => element.managers).some(idManager => idManager === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
  if (species == null) {
    const animais = {};
    animals.forEach(function (element) {
      animais[element.name] = element.residents.length;
    });
    return animais;
  }
  const animalsTotal = animals.filter(element => element.name === species)
    .map(element => element.residents.length);
  return animalsTotal[0];
}
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants == undefined || Object.keys(entrants).length === 0) {
    return 0;
  } else {
  const totalValue = Object.keys(entrants).map(element => entrants[element] * prices[element]).reduce((prev, next) => prev + next);
  return totalValue;
  }
};

function animalMap(options) {
//   // seu código aqui
}
// console.log(animals.filter(animal => animal.location === 'NE').map(nome => nome.name))

function schedule(dayName) {
// seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  const result = {};
  // seu código aqui
  // sem parâmetros retorna todos os animais
  // juntar nome e sobrenome e usar como propriedade (chave) do objeto de retorno
  // (find) a partir do id do animal (responsibleFor no employee) preciso do nome de cada employees [{}] --> {}
  // com um parâmetro retorna somente os animal
  employees.forEach((employee) => {
  const mappedAnimals = employee.responsibleFor.map(
    (animalIdResponsibleFor) => {
      const foundAnimalName = animals.find((animal) => animal.id === animalIdResponsibleFor).name;
      return foundAnimalName;
    })
      result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
    });
  
  console.log(result)  
  return result;
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