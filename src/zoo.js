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

const animals = data.animals;
function animalsByIds(...ids) {
  if (ids.length == 0) {
    console.log("teste 0 ids");
    return []; 
  } else if (ids.length == 1) {
    console.log('----------');
    console.log(`teste 1 ID: ${ids}`);
    return animals.filter(element => element.id == ids);
  } else if (ids.length > 1) {
    console.log('----------');
    console.log(`teste +1 ID: ${ids}`);
    const output = [];
    animals.forEach(animal => {
      ids.forEach(id => {
        if (animal.id === id) {
          output.push(animal)
        }
      })
    })
    return output;
  }
}

// console.log(animalsByIds());
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));
// console.log("-----------");

function animalsOlderThan(animal, age) {
  // seu código aqui
}

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
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

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aquis
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
