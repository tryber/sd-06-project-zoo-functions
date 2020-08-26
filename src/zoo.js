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

const { animals } = data;
// const { animals, employees } = data;
// const { animals, employees, prices } = data;
// const { animals, employees, prices, hours } = data;

// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids

function animalsByIds(...ids) { // rest paramenter returns []
  if (ids.length === 0) {
    return [];
  }

  const result = [];
  ids.forEach(currentValue => result.push(animals.find(element => element.id === currentValue)));

  return result;
}
// console.log(animalsByIds());
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce',_
// 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

// final result: passou nos testes, mas ficou uma dúvida:
// Por que retorna a palavra objeto ao invés do próprio objeto.

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

function animalMap(obj = {}) {
// // Sem parâmetros, retorna animais categorizados por localização'

//   const existLocations = ['NE', 'NW', 'SE', 'SW'];

//   if (Object.keys(obj).length === 0) {
//     const animalsByLocation = {};

//     existLocations.forEach (existLocation => {
//     const animalsByName = animals
//     .filter(animal => animal.location === existLocation)
//     .map(animal => {animal.name);

//       if(animalsByName.length !== 0) {
//         animalsByLocation[existLocation] = animalsByName;
//       }
//     })
//     return animalsByLocation;
//   }

//   //Com a opção `includeNames: true` especificada, retorna nomes de animais
//   //     NE: [
//   //       { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
//   //       { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] }
//   //     ],

//   const {includeNames, sorted, sex } = obj
//   // console.log(includeNames, sorted, sex);

// if (includeNames !== undefined && sorted === undefined && sex === undefined){
//   const animalsByLocation = {};

//   existLocations.forEach (existLocation => {
//   const animalsByName = animals
//   .filter(animal => animal.location === existLocation)
//   .map(animal => animal.name);

//     if(animalsByName.length !== 0) {
//       animalsByLocation[existLocation] = animalsByName;
//     }
//   })
//   return animalsByLocation;

// }

// {
//   author: book.author.name,
//   age: book.releaseYear - book.author.birthYear
// }

//   let firstOption = includeNames !== undefined && ? totalBottles * priceBottle : 0
//   let totalPriceCans = totalCans !== undefined ? totalCans * priceCan : 0
//   let totalPriceLongNecks = totalLongNecks !== undefined ? totalLongNecks * priceLongNeck : 0
}
// console.log(animalMap());
// const options = { includeNames: true };

// console.log(animalMap(options));

// includeNames: true
// sorted: true
// sex: 'female'

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
