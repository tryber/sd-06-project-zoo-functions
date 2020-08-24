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
  const agoraVaiEmNomeDoPai = ids
    .map(idAtual => data.animals
      .find(animal => animal.id === idAtual));
  return agoraVaiEmNomeDoPai;
}

// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  const ageOfAnimals = data.animals
    .filter(species => species.name === animal)[0].residents
      .every(animalAge => animalAge.age >= age);
  return ageOfAnimals;
}

// console.log(animalsOlderThan('otters', 7));
// console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const employees = data.employees
    .find(Element => Element.firstName === employeeName || Element.lastName === employeeName);
  return employees;
}

// console.log(employeeByName());
// console.log(employeeByName('Emery'));
// console.log(employeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  const create = Object.assign(personalInfo, associatedWith);
  return create;
}

/*
  Testa se o id passado é de um gerente

  .some(Element => Element.id === id)
  .find(Element => Element.managers === id);

  .flat()
*/

function isManager(id) {
  const arr = [];
  data.employees
    .forEach(Element => (arr.push(Element.managers)));

  const newArray = arr
    .reduce((acc, sub) => acc.concat(sub), []);

  const managerCheck = newArray
  .some(Element => Element === id);

  return managerCheck;
}

console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

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
