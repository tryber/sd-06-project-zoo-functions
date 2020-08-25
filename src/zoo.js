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
  if (ids === undefined) {
    return undefined;
  }
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find (olderAnimal => olderAnimal.name === animal)
  .residents.every(animalAge => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {

}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}


function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location) // quais animais tem a determinada loc
      .map(animal => animal.name);// retorna apena o nome dos animais

      if (animals.length !== 0) animalsPerLocation[location] = animals; // se o tamnho do array for diferente do 0 adiciona a localizacao de acordo com os animais em cada uma delas 
  });

  return animalsPerLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsPerLocationWithName = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => {
        const nameKey = animal.name;
        const nameValues = animal.residents
        .filter(resident => {
          const isFilteringSex = sex !== undefined;
          return isFilteringSex ? resident.sex === sex : true; // se o parametro existir vai filtrar, caso nao exista vai retornar tudo
        })
        .map(resident => resident.name); // acessa dentro do objeto o nome do residente

        if(sorted) nameValues.sort();

        return { [nameKey]: nameValues }; // a chave serve para identificar qual chave seria, [lion: valores]
      });

      animalsPerLocationWithName[location] = animals;
  });

  return animalsPerLocationWithName;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return retrieveAnimalsPerLocation(locations);

  return retrieveAnimals(locations, sorted, sex);
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const addDecimals = percentage / 100;
  data.prices.Adult = Math.round((data.prices.Adult + (data.prices.Adult * addDecimals))*100) /100;
  data.prices.Senior = Math.round((data.prices.Senior + (data.prices.Senior * addDecimals))*100) /100;
  data.prices.Child = Math.round((data.prices.Child + (data.prices.Child * addDecimals))*100) /100;
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
