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

const { animals, employees, prices, hours } = data;

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

// Cria um novo colaborador a partir de objetos contendo informações pessoais,
// gerentes e animais gerenciados

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

// const personalInfo = {
//   id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
//   firstName: 'John',
//   lastName: 'Doe',
// };

// const associatedWith = {
//   managers: [
//     'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     '9e7d4524-363c-416a-8759-8aa7e50c0992'
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'
//   ]
// };

// console.log(createEmployee(personalInfo, associatedWith));

// -----------------------------------------------------------------------

// Testa se o id passado é de um gerente'

function isManager(id) {
  const manager = [];
  employees.forEach(employee => manager.push(employee.managers
    .find(element => element === id)));

  return manager.some(value => value === id);
}
  // console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));
  // console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

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

// -----------------------------------------------------------------------

// Retorna 0 se nenhum argumento for passado'
// Retorna 0 se um objeto vazio for passado'
// Retorna o preço total a ser cobrado dado o número de adultos,_
// crianças e idosos'

function entryCalculator(entrants = {}) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }

  const { Adult: totalAdults, Child: totalChilds, Senior: totalSeniors } = entrants;

  const priceAdult = prices.Adult;
  const priceChild = prices.Child;
  const priceSenior = prices.Senior;

  const totalPriceAdults = totalAdults !== undefined ? totalAdults * priceAdult : 0;
  const totalPriceChilds = totalChilds !== undefined ? totalChilds * priceChild : 0;
  const totalPriceSeniors = totalSeniors !== undefined ? totalSeniors * priceSenior : 0;

  return totalPriceAdults + totalPriceChilds + totalPriceSeniors;
}

// console.log(entryCalculator());
// console.log(entryCalculator({}));
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));
// console.log(entryCalculator({ 'Adult': 1 }));
// console.log(entryCalculator({ 'Senior': 1 }));
// console.log(entryCalculator({ 'Child': 1 }));
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 }));

// -----------------------------------------------------------------------

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

// -----------------------------------------------------------------------
// Essa soluução foi baseada na solução guiada realizada pelo Oliva.
// Sem parâmetros, retorna um cronograma legível para humanos'
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos

function schedule(dayName) {
  const daySchedule = {};
  const days = Object.keys(hours);

  days.forEach((day) => {
    if (day === 'Monday') {
      daySchedule[day] = 'CLOSED';
    } else {
      const opening = hours[day].open;
      const closing = hours[day].close - 12;
      daySchedule[day] = `Open from ${opening}am until ${closing}pm`;
    }
  });

  if (dayName === undefined || dayName.length === 0) {
    return daySchedule;
  }
  return { [dayName]: daySchedule[dayName] };
}

// console.log(schedule());
// console.log(schedule(''));
// console.log(schedule('Monday'));
// console.log(schedule('Tuesday'))

// -----------------------------------------------------------------------

// Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo
// funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie

function oldestFromFirstSpecies(id) {
  const animalID = employees.find(employee => employee.id === id).responsibleFor;
  const firstAninalId = animalID[0];
  const species = animals.find(animal => animal.id === firstAninalId).residents;
  species.sort((entry1, entry2) => (entry1.age < entry2.age ? 1 : -1));
  const obj = species.find(animal => animal.age > 0);
  const result = [obj.name, obj.sex, obj.age];
  return result;
}

// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

// -----------------------------------------------------------------------

// Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais

function increasePrices(percentage) {
  // let newPrices = prices;

  // const adultPrice = newPrices.Adult;
  // const childPrice = newPrices.Child;
  // const seniorPrice = newPrices.Senior;

  // const increasedAdultPrice = adultPrice * (1 + percentage / 100);
  // newPrices['Adult'] = (Math.round(increasedAdultPrice * 100) /100 );

  // const increasedseniorPrice = seniorPrice * (1 + percentage / 100);
  // newPrices['Senior'] = (Math.round(increasedseniorPrice * 100) /100 );

  // const increasedChildPrice = childPrice * (1 + percentage / 100);
  // newPrices['Child'] = (Math.round(increasedChildPrice * 100) /100 );

  // return Object.assign(prices, newPrices)
}

// console.log(increasePrices(50));
// console.log(increasePrices(30));

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
