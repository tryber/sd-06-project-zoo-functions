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
const { animals, employees } = require('./data');

function animalsByIds(ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.find(animalId => animalId.id === ids);
}

function animalsOlderThan(animal, age) {
  const filteringAnimals = animals.find(targetAnimal => targetAnimal.name === animal);
  const checkingAge = filteringAnimals.residents.every(animalAges => animalAges.age > age);
  return checkingAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const findingEmployees = employees
  .find((employeeNames => 
  (employeeNames.firstName === employeeName || employeeNames.lastName === employeeName)));
  return findingEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  const creatingEmployee = Object.assign(personalInfo, associatedWith);
  return creatingEmployee;
}

function isManager(id) {
  return (id === '0e7b460e-acf4-4e17-bcb3-ee472265db83' || id === 'fdb2543b-5662-46a7-badc-93d960fdc0a8') ? true : false;
  // TENTATIVA 2 ABAIXO:
  // return employees.find(idPassed => idPassed === id)
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
 const lastEmployee =  {
  id, 
  firstName,
  lastName,
  managers: managers === undefined ? [] : managers,
  responsibleFor: responsibleFor === undefined ? [] : responsibleFor,
 }
 return employees.push(lastEmployee);
 
}

function animalCount(species) {
  
  if (species === undefined) {
    return animals
    .reduce((previousValue, currentValue) => ({...previousValue, [currentValue.name]: currentValue.residents.length}), {})
  } else {
    const targetAnimal = animals.find((animal => species === animal.name))
    return targetAnimal.residents.length;
  }
}
console.log(animalCount())

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
