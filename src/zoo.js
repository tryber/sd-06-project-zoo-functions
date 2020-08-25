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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length < 1) {
    return [];
  }
  const novoArray = [];
  ids.forEach(objeto => novoArray.push(animals.find(element => element.id === objeto)));
  return novoArray;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(anyAnimal => anyAnimal.name === animal).residents
  .every(idade => idade.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const findSearchTrue = employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  if (findSearchTrue === undefined) {
    return {};
  }
  return findSearchTrue;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const isOrNotAManager = [];
  employees.forEach(eachEmployee => eachEmployee.managers
    .find(gerente => isOrNotAManager.push(gerente === id)));
  return isOrNotAManager.some(result => result === true);
}

function addEmployee(ids, firstNames, lastNames, managerss = [], responsibleFors = []) {
  // seu código aqui
  const lastEmployee = {
    id: ids,
    firstName: firstNames,
    lastName: lastNames,
    managers: managerss,
    responsibleFor: responsibleFors,
  };
  employees.push(lastEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const newObj = {};
    animals.forEach((petName) => { newObj[petName.name] = petName.residents.length; });
    return newObj;
  }
  const animalFound = animals.find(findAnAnimal => findAnAnimal.name === species);
  return animalFound.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants !== undefined) {
    const chave = Object.keys(entrants);
    let sum = 0;
    chave.forEach((place) => { sum += prices[place] * entrants[place]; });
    return sum;
  }
  return 0;
}

function animalMap(options) {
  // seu código aqui
  // const region = ['NE','NW','SE','SW'];
  // const animalNames = {};
  // if( options === undefined ) {
  //   region.forEach(local => animalNames[local] = (animals
  //     .filter(index => index.location === local)
  //     .map(nomes => nomes.name)));
  //     return animalNames;
  // };
  //  let objIncludeNames = {movel1:'casa',movel2:'musa',movel3:'moleca'};
  //  let objAnimalsNames = {};
  //  let valorResindent = [];
  //   region.filter(local => animals.filter(any => any.location === local;

  // //  animals.filter((zone) => valorResindent.push(zone.residents.map(name => name.name)));
  // return objAnimalsNames;
}

function schedule(dayName) {
  // seu código aqui
  const chave = Object.keys(hours);
  const newObj = {};
  if (dayName === undefined) {
    chave.forEach((value) => {
      if (value === 'Monday') {
        newObj[value] = 'CLOSED';
      } else {
        (newObj[value] = `Open from ${hours[value].open}am until ${(hours[value].close - 12)}pm`);
      }
    });
    return newObj;
  }
  if (dayName === 'Monday') {
    newObj[dayName] = 'CLOSED';
    return newObj;
  }
  newObj[dayName] = `Open from ${hours[dayName].open}am until ${(hours[dayName].close - 12)}pm`;
  return newObj;
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
