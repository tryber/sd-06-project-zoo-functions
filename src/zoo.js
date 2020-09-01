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
//  criando branch

const data = require('./data');
const { animals, employees, prices, hours } = require('./data');

/*  1- Implemente a função animalsByIds:
 Caso receba nenhum parâmetro, necessário retornar um array vazio
 Ao receber como parâmetro um único id, retorna os animais com este id
 Ao receber mais de um id, retorna os animais que têm um desses ids */

function animalsByIds(...ids) {
  const arrayAnimals = [];
  ids
  .forEach(id => arrayAnimals
    .push(...animals
    .filter(animal => animal.id === id)));
  return arrayAnimals;
}

// console.log(animalsByIds());
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log('**********Requisito 1**********');


/*  2- Implemente a função animalsOlderThan:
 Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta
 espécie possuem a idade mínima especificada*/

function animalsOlderThan(animal, age) {
  const array = animals
  .find(findAnimal => findAnimal.name === animal);
  const result = array.residents
  .every(element => element.age > age);
  return result;
}

// console.log(animalsOlderThan('otters', 7));
// console.log('**********Requisito 2**********');


/* 3- Implemente a função employeeByName:
 Sem parâmetros, retorna um objeto vazio
 Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
 Quando provido o último nome do funcionário, retorna o objeto do funcionário*/

function employeeByName(employeeName) {
  const worker = employees
  .find(person =>
    person.firstName === employeeName || person.lastName === employeeName);
  return worker || {};
}

// console.log(employeeByName());
// console.log(employeeByName('Emery'));
// console.log('**********Requisito 3**********');


/* 4- Implemente a função createEmployee:
 Cria um novo colaborador a partir de objetos contendo informações pessoais e
 gerentes e animais gerenciados*/

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

// console.log(createEmployee({
//   id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
//   firstName: 'John',
//   lastName: 'Doe',
// }, {
//   managers: [
//     'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     '9e7d4524-363c-416a-8759-8aa7e50c0992',
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5',
//   ],
// }));
// console.log('**********Requisito 4**********');


/* 5- Implemente a função isManager:
 Testa se o id passado é de um gerente*/

function isManager(id) {
  const manager = employees
  .some(person =>
    person.managers
    .find(ids => ids === id));
  return manager;
}

// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));
// console.log('**********Requisito 5**********');


/* 6- Implemente a função addEmployee:
 Adiciona um funcionário no fim da lista*/

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newWorker = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newWorker);
}

// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
// console.log('**********Requisito 6**********');


/* 7- Implemente a função animalCount:
 Sem parâmetros, retorna animais e suas quantidades
 Com o nome de uma espécie de animal, retorna somente a quantidade*/

function animalCount(species) {
  if (!species) {
    const animalObj = {};
    animals.forEach(element => (animalObj[element.name] = element.residents.length));
    return animalObj;
  }
  const count = animals.find(element => element.name === species);
  return count.residents.length;
}

// console.log(animalCount('lions'));
// console.log(animalCount());
// console.log('**********Requisito 7**********');


/* 8- Implemente a função entryCalculator:
Retorna 0 se nenhum argumento for passado
Retorna 0 se um objeto vazio for passado
Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos*/

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const { Adult: totalOfAdult = 0, Child: totalOfChild = 0, Senior: totalOfSenior = 0 } = entrants;

  const adult = prices.Adult * totalOfAdult;
  const child = prices.Child * totalOfChild;
  const senior = prices.Senior * totalOfSenior;
  const sum = adult + child + senior;
  return sum;
}

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));
// console.log(entryCalculator({ 'Adult': 1 }))
// console.log('**********Requisito 8**********');

function animalMap(options) {
  // seu código aqui
}


/* 10- Implemente a função schedule:
  Sem parâmetros, retorna um cronograma legível para humanos
  Se um único dia for passado, retorna somente este dia em um formato legível para humanos*/

function schedule(dayName) {
  const workWeek = Object.keys(hours);
  const workDay = {};

  workWeek.forEach((day) => {
    if (day === 'Monday') {
      workDay[day] = 'CLOSED';
    } else {
      workDay[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (!dayName) {
    return workDay;
  }
  return ({ [dayName]: workDay[dayName] });
}

// console.log(schedule('Monday'));
// console.log(schedule('Tuesday'));
// console.log(schedule());


/* 11- Implemente a função oldestFromFirstSpecies:
 Passado o id de um funcionário, encontra a primeira espécie de animal
 gerenciado pelo funcionário, e retorna um array com nome, sexo e idade
 do animal mais velho dessa espécie*/

function oldestFromFirstSpecies(id) {
  const animalId = employees
  .find(employee => employee.id === id).responsibleFor[0];
  const { name, sex, age } = animals
  .find(animal => animal.id === animalId)
  .residents.sort((y, o) => o.age - y.age)[0];
  return [name, sex, age];
}

// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
