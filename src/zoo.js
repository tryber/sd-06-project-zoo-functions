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


function animalsByIds(...ids) { // Agrupando em um array com rest
  // seu código aqui
  const consultedIds = [];// aqui já irá fornecer o array vazio
  ids.forEach(idOfAnimal => consultedIds // correndo com forEach o array
    .push(animals // preenchendo o array com a informação dos animais encontrados com o find
    .find(animal => animal.id === idOfAnimal)));
  return consultedIds;
}
// tentar fazer com filter

function animalsOlderThan(animal, age) {
  // seu código aqui
  const species = animals.filter(specieReceveid => specieReceveid.name === animal);
  const ages = species[0].residents.every(ageReceveid => ageReceveid.age >= age);
  return ages;
}

function employeeByName(employeeName) {
  // seu código aqui
  const firstNameEmployee = employees.find(firstN => firstN.firstName === employeeName);
  const lastNameEmployee = employees.find(lastN => lastN.lastName === employeeName);
  if (firstNameEmployee) {
    return firstNameEmployee;
  } else if (lastNameEmployee) {
    return lastNameEmployee;
  } return {};
}


function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const verifyManager = employees.some(searchManager => searchManager.managers
    // reforço: some retorna true ou false por isso coloquei a HOF find na saída dela
    .find(managerId => managerId === id));
  return verifyManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newWorker = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  return employees.push(newWorker);
}

function animalCount(species) {
  // seu código aqui
  const animalNumber = {};
  animals.forEach(animal => (animalNumber[animal.name] = animal.residents.length));
  if (species === undefined) {
    return animalNumber;
  }
  return animalNumber[species];
  // Tentativa com Reduce (rever)
  // const numbersAnimals = animals.length;
  // const sumAnimals = animals.reduce((acc, animal) => acc + (animals.name))
  // console.log(sumAnimals);
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

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
