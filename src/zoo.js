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

//  REQUISITO 1
//  Caso receba nenhum parâmetro, necessário retornar um array vazio
//  Ao receber como parâmetro um único id, retorna os animais com este id
//  Ao receber mais de um id, retorna os animais que têm um desses ids

function animalsByIds(...ids) {
  //  !!!!!!Reever codigo com defaulParameter!!!!!
  if (ids.length === 0) {
    return [];
  }
  const animalsWithId1 = data.animals.filter(animal => animal.id === ids[0]);
  const animalsWithId2 = data.animals.filter(animal => animal.id === ids[1]);
  const animalsWithId = animalsWithId1.concat(animalsWithId2);
  return animalsWithId;
}

//  REQUISITO 2
//  Ao passar o nome de uma espécie e uma idade,
//  testa se todos os animais desta espécie possuem
//  a idade mínima especificada

function animalsOlderThan(animal, age) {
  const animalPassed = data.animals
    .find(item => item.name === animal).residents
    .every(item => item.age > age);
  return animalPassed;
}

//  REQUISITO 3
//  Sem parâmetros, retorna um objeto vazio
//  Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
//  Quando provido o último nome do funcionário, retorna o objeto do funcionário

function employeeByName(employeeName) {
  //  !!!!!!Reever codigo com defaulParameter!!!!!
  if (employeeName === undefined) {
    return {};
  }
  const employFilter = data.employees
    .find(employ => employ.firstName === employeeName || employ.lastName === employeeName);
  return employFilter;
}

//  REQUISITO 4
//  Cria um novo colaborador a partir de objetos contendo informações
//  pessoais e gerentes e animais gerenciados.
//  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

//  REQUISITO 5
//  Testa se o id passado é de um gerente
//  Fusão de dois arrays
//  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/push

function isManager(id) {
  const arrayManagers = data.employees.map(employ => employ.managers);
  const newArray = [];
  for (let i = 0; i < arrayManagers.length; i += 1) {
    Array.prototype.push.apply(newArray, arrayManagers[i]);
  }
  // !!!!!! Reever codigo com some que retorna true o false !!!!!!!!
  const managerFinder = newArray.find(item => item === id);
  if (managerFinder !== undefined) {
    return true;
  }
  return false;
}

//  REQUISITO 6
//  https://eslint.org/docs/rules/object-shorthand
//  Adiciona um funcionário no fim da lista

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const employ = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(employ);
}

//  REQUISITO 7
//  Sem parâmetros, retorna animais e suas quantidades
//  Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species) {
  if (species === undefined) {
    const quantityAnimals = {};
    data.animals
      .forEach((animal) => {
        quantityAnimals[animal.name] = animal.residents.length;
      });
    return quantityAnimals;
  }

  const animalNumber = data.animals
    .find(animal => animal.name === species);
  return animalNumber.residents.length;
}

//  REQUISITO 8
//  Retorna 0 se nenhum argumento for passado
//  Retorna 0 se um objeto vazio for passado
//  Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function entryCalculator(entrants = 0) {
  const objectCount = Object.keys(entrants);
  if (entrants === 0 || objectCount.length === 0) {
    return 0;
  }
  const entrantsArray = Object.entries(entrants);
  let counter = 0;
  entrantsArray.forEach((item) => {
    //  https://eslint.org/docs/2.0.0/rules/brace-style
    if (item[0] === 'Adult') counter += (49.99 * item[1]);
    else if (item[0] === 'Senior') counter += (24.99 * item[1]);
    else if (item[0] === 'Child') counter += (20.99 * item[1]);
  });
  return counter;
}

//  REQUISITO 9

function animalMap(options) {
  // seu código aqui
}

//  REQUISITO 10
//  Sem parâmetros, retorna um cronograma legível para humanos
//  Se um único dia for passado, retorna somente este dia em um formato legível para humanos
//  Percorrer objeto:
//  https://pt.stackoverflow.com/questions/173293/como-percorrer-um-objeto-em-javascript

function schedule(dayName) {
  // seu código aqui
}

//  REQUISITO 11
//  Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo
//  funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie

function oldestFromFirstSpecies(id) {
  let animalOlder = 0;
  let showAnimal = [];
  const employe = data.employees
    .find(employeFinder => employeFinder.id === id);

  data.animals
    .find(animal => animal.id === employe.responsibleFor[0]).residents
    .forEach((animal) => {
      if (animal.age > animalOlder) {
        animalOlder = animal.age;
        showAnimal = animal;
      }
    });
  return Object.values(showAnimal);
}

//  REQUISITO 12
//  Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais

function increasePrices(percentage) {
  const newPricesObject = {};
  const personPriceArray = Object.entries(data.prices);
  personPriceArray.map((price) => {
  //  Solucoe encontrada no grupo de watsap para conseguir o numero esperado e que
  //  passase no codeclimate
    price[1] += price[1] * (percentage / 100);
    price[1] *= 100;
    price[1] = Math.round(price[1]);
    price[1] /= 100;
    newPricesObject[price[0]] = price[1];
    data.prices = newPricesObject;
    return newPricesObject;
  });
}

//  REQUISITO 13
//  Sem parâmetros, retorna uma lista de funcionários e os animais pelos
// quais eles são responsáveis Com o id de um funcionário, retorna os animais
// pelos quais o funcionário é responsável Com o primeiro nome de um funcionário,
// retorna os animais pelos quais o funcionário é responsável Com o último nome
// de um funcionário, retorna os animais pelos quais o funcionário é responsável

//  funcoe chamada por createEmployeeList(sem parametro) para buscar atraves de
//  parametro ja passado os animales por los cuales e responsable o empregado
function listAnimals(employ) {
  const animalsResponsibleFor = employ.responsibleFor;
  const listAnimalsDoEmploy = animalsResponsibleFor
  .map((id) => {
    const animalsFound = data.animals
      .find(animal => animal.id === id);
    return animalsFound.name;
  });
  return listAnimalsDoEmploy;
}
//  Pasa por cada empregado e cria objeto con nome e sobrenome, logo chama a funcoe
//  listAnimals para tracer os animais desses empregados
function createEmployeeList() {
  const employeObject = {};
  data.employees
    .map((employ) => {
      const nameEmploy = `${employ.firstName} ${employ.lastName}`;
      employeObject[nameEmploy] = listAnimals(employ);
      return employeObject;
    });
  return employeObject;
}
//  chama a listAnimals e cria o objeto para ser retornado
function createObjetToShow(employe) {
  const employeObject = {};
  const animalOfEmploye = listAnimals(employe);
  const nameEmploy = `${employe.firstName} ${employe.lastName}`;
  employeObject[nameEmploy] = animalOfEmploye;
  return employeObject;
}
//  Verificia o parametro si e firstName, id ou lastName, e enta na funcoe
//  createObjetToShow
function checkParameters(idOrName) {
  let employeFound = {};
  data.employees.forEach((empl) => {
    if (empl.id === idOrName || empl.firstName === idOrName || empl.lastName === idOrName) {
      employeFound = createObjetToShow(empl);
    }
  });
  return employeFound;
}

// Funcoe principal que deriva dependendo do parametros pasados
function employeeCoverage(idOrName) {
  if (!idOrName) return createEmployeeList();
  return checkParameters(idOrName);
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
