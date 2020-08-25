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
  return (ids.length === 0) ? [] : animals.filter(array => ids.includes(array.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalName => animalName.name === animal).residents
    .every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} : employees
    .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

// console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  // Object.assign copia todas as propriedade de um ou mais objetos para outro objeto de destino
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(manager => manager.managers.includes(id));
}

// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const object = {};
  if (!species) {
    animals.forEach((specie) => {
      object[specie.name] = specie.residents.length;
    });
    return object;
  }
  return animals.find(specie => specie.name === species).residents.length;
}

// console.log(animalCount())

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
}

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

/*
Sem parâmetros, retorna animais categorizados por localização
Com a opção includeNames: true especificada, retorna nomes de animais
Com a opção sorted: true especificada, retorna nomes de animais ordenados
Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais macho/fêmea
Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
*/

// PARAMETROS PODE TER:
// {
  // includeNames: True
  // sex: 'female'
  // sorted: true
// }

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) {
    const animalsPerLocation = {};

    locations.forEach((location) => {
      const animalsLocation = animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);

      if (animals.length !== 0) animalsPerLocation[location] = animalsLocation;
    });
    return animalsPerLocation;
  }
}

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Monday } = hours;

  const daysWeek = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED'
  }

  if (!dayName) return daysWeek;

  const weekDay = Object.keys(daysWeek).find(day => day === dayName);
  return { [weekDay]: daysWeek[weekDay] };
}

console.log(schedule('Monday'));

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
