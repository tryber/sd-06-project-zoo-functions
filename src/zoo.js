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
const { animals, employees, hours, prices } = require('./data');


function animalsByIds(...ids) {
  // return animals.filter((animal, index) => animal.id === ids[index])
  // seu código aqui
  const arrayId = [...ids];
  if ( arrayId === undefined ) {
    return [];
  }
  const newArrayId = [];
  arrayId.forEach(element => {
    const objResult = animals.filter(id => id.id === element);
    newArrayId.push(objResult[0]);
  });

  return newArrayId;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const objAnimal = animals.find(pet => pet.name === animal);
  return objAnimal.residents.every(idade => idade.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(obj => obj.firstName === employeeName || obj.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const employees = {
    id: personalInfo.id,
    firstName : personalInfo.firstName,
    lastName : personalInfo.lastName,
    managers : associatedWith.managers,
    responsibleFor : associatedWith.responsibleFor
  };
  return employees;
}

function isManager(id) {
  // return employees.some(person => person.managers.includes(id))
  // se existe um incluso
  // seu código aqui
  const array = employees.map(boss => boss.managers);
  return array.some((mane, index) => mane[index] === id);
}

function addEmployee(id, firstName, lastName, managers=[], responsibleFor=[]) {
  // seu código aqui
  employees.push({
    id : id,
    firstName : firstName,
    lastName : lastName,
    managers : managers,
    responsibleFor : responsibleFor
  });
}

function animalCount(species) {
  // seu código aqui
  if(species === undefined) {
    let obj={};
    animals.forEach(element => obj[element.name] = element.residents.length);
    return obj;
  }
  let num = animals.find(animal => animal.name === species);
  return num.residents.length;
}

function entryCalculator(entrants=0) {
  // seu código aqui
  let acc = 0;
  if (entrants === 0) {
    return 0;
  } else if (entrants.Adult){
    acc += entrants.Adult * prices.Adult
  }
  if (entrants.Senior) {
    acc += entrants.Senior * prices.Senior
  }
  if (entrants.Child){
    acc += entrants.Child * prices.Child
  }
  return acc;
}
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1}))

function animalMap(options) {
  // seu código aqui
}
//console.log(animalMap())

function schedule(dayName) {
  // seu código aqui
  const table = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: `CLOSED`
  };
  if (dayName===undefined) {
    return table;
  }
  const arrayDays = Object.entries(table);
  const result = arrayDays.find((u) => u[0] === dayName);
  const resultObj = {};
  resultObj[result[0]] = result[1];
  return resultObj;

}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const func = employees.find(person => person.id === id);
  const pet = animals.find(cd => cd.id === func.responsibleFor[0]);
  let ag = 0;
  let agObj;
  pet.residents.forEach(element => {
    if (element.age > ag) {
      ag = element.age;
      agObj = element;
    }
  })
  const result = [agObj.name, agObj.sex, agObj.age];

  return result;
}
//console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'))

function increasePrices(percentage=0) {
  // seu código aqui
  percentage = (percentage/100)+1;
  let adult = ((percentage * prices.Adult) + 0.005).toFixed(2);
  prices.Adult = adult;
  let senior = ((percentage * prices.Senior) + 0.005).toFixed(2);
  prices.Senior = senior;
  let child = ((percentage * prices.Child) + 0.005).toFixed(2);
  prices.Child = child;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  // const listaName = employees.map(person => `${person.firstName} ${person.lastName}`)
  // const listaId = employees.map(id => id.responsibleFor)

  // const obj = {}
  // listaName.forEach((element, index) => obj[element] = listaId[index])
  // return obj;
}

// console.log(employeeCoverage())

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
