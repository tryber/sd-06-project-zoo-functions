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
const data = require('./data.js');

function animalsByIds(...ids) {
  const animalId = data.animals.filter(ident => ids.includes(ident.id));
  return animalId;
}
animalsByIds();

function animalsOlderThan(animal, age) {
}
animalsOlderThan();
function employeeByName(employeeName) {
// seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
// seu código aqui -Sem parâmetros, retorna um objeto vazio
}

function isManager(id) {
// seu código aqui - Testa se o id passado é de um gerente
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
// seu código aqui  - Adiciona um funcionário no fim da lista'
}

function animalCount(species) {
// seu código aqui - Sem parâmetros, retorna animais e suas quantidades
}

function entryCalculator(entrants) {
// seu código aqui
}

function retrieveAnimalPerLocation(locations) {
  const animalPerLocation = {};
  locations.forEach((location) => {
    const animal = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);
    if (animal.length !== 0) animalPerLocation[location] = animal;
  });
  return animalPerLocation;
}
function retrieveAnimalByLocationWithName(locations, sorted, sex) {
  const animalByLocationWithName = {};
  locations.forEach((location) => {
    const animal = data.animals
      .filter((animal )=> animal.location === location)
      .map(animal => {
        const animalKey = animal.name;
        const animalValue = animal.residents
          .filter((resident) => {
            const isFilteringSex = sex !== undefined;
            return isFilteringSex ? resident.sex === sex : true;
          })
          .map(resident => resident.name);
        if (sorted) animalValue.sort();
        return { [animalKey]: animalValue };
      });
    animalByLocationWithName[location] = animal;
  });
  return animalByLocationWithName;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) { return retrieveAnimalPerLocation(locations); }
  const { includeNames, sorted, sex } = options;
  if (includeNames === undefined) { return retrieveAnimalPerLocation(locations); }
  if (includeNames) { return retrieveAnimalByLocationWithName(locations, sorted, sex); }
  return retrieveAnimalByLocationWithName;
}

function schedule(dayName) {
}

function oldestFromFirstSpecies(id) {
// seu código aqui
}

function increasePrices(percentage) {
}

function employeeCoverage(idOrName) {
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
