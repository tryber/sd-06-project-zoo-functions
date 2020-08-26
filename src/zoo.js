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

// const { animals } = data;
// const { employees } = data;
const { animals, employees } = data;
// const { animals, employees, prices } = data;
// const { animals, employees, prices, hours } = data;

// -----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

// Ao passar o nome de uma espécie e uma idade, testa se todos os animais
// desta espécie possuem a idade mínima especificada
function animalsOlderThan(animal, age) {
  return animals
  .find(element => element.name === animal).residents // filtrar apenas 1
  .every(currentValue => currentValue.age >= age); // todos mais velhos que
}

// console.log(animalsOlderThan('otters', 7));
// console.log(animalsOlderThan('penguins', 10));

// -----------------------------------------------------------------------

// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna {} do funcionário
// Quando provido o último nome do funcionário, retorna {} do funcionário

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }

  return employees
    .find(element => element.firstName === employeeName || element.lastName === employeeName);
}

// console.log(employeeByName());
// console.log(employeeByName('Emery'));
// console.log(employeeByName('Wishart'));

// -----------------------------------------------------------------------

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

// -----------------------------------------------------------------------

// Testa se o id passado é de um gerente'

function isManager(id) {

}

// -----------------------------------------------------------------------

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

// -----------------------------------------------------------------------

// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach((animal) => {
      const specieName = animal.name;
      const totalResidents = animal.residents.length;
      obj[specieName] = totalResidents;
    });
    return obj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

// console.log(animalCount());
// console.log(animalCount('lions'));
// console.log(animalCount('snakes'));

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
