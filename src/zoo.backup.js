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

// ========================================================================================
// INICIO DOS REQUISITOS
// ========================================================================================
// REQUISITO 01- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
const animalsByIds = (...ids) => {
  const result = animals.filter(item => ids.includes(item.id));
  return result;
};
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// const id1 = '0938aa23-f153-4937-9f88-4858b24d6bce';
// const id2 = 'e8481c1d-42ea-4610-8e11-1752cfc05a46';
// console.log(animalsByIds(id1, id2));
// ========================================================================================

// ========================================================================================
// REQUISITO 02- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie
// possuem a idade mínima especificada
const animalsOlderThan = (animal, age) => {
  const allResidents = animals.find(item => item.name === animal).residents;
  return allResidents.every(item => item.age > age);
};
// console.log(animalsOlderThan('otters', 7)); //true
// console.log(animalsOlderThan('penguins', 10)); //false
// ========================================================================================

// ========================================================================================
// REQUISITO 03- Implemente a função employeeByName:
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário
const employeeByName = (employeeName) => {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(item => item.firstName === employeeName || item.lastName === employeeName);
};
// console.log(employeeByName());
// console.log(employeeByName('Emery'));
// console.log(employeeByName('Wishart'));
// ========================================================================================

// ========================================================================================
// REQUISITO 04- Implemente a função createEmployee:
// Cria um novo colaborador a partir de objetos contendo informações pessoais e
// gerentes e animais gerenciados.
const createEmployee = (personalInfo, associatedWith) => {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
};
// const personalInfo = { id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
//   firstName: 'John',
//   lastName: 'Doe' };
// const associatedWith = {
//   managers: ['c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     '9e7d4524-363c-416a-8759-8aa7e50c0992'],
//   responsibleFor: ['0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'] };
// console.log(createEmployee(personalInfo, associatedWith));
// ========================================================================================

// ========================================================================================
// REQUISITO 05- Implemente a função isManager:
// Testa se o id passado é de um gerente
const isManager = (id) => {
  const allManagers = employees.flatMap(item => item.managers);
  return allManagers.includes(id);
};
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));
// ========================================================================================

// ========================================================================================
// REQUISITO 06- Implemente a função addEmployee:
// Adiciona um funcionário no fim da lista
const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const myEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(myEmployee);
  return employees;
};
// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe',
// ['546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
//   'a67a36ee-3765-4c74-8e0f-13f881f6588a',],
// ['ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
//   '210fcd23-aa7b-4975-91b7-0230ebb27b99',]));
// ========================================================================================

// ========================================================================================
// REQUISITO 07- Implemente a função animalCount:
// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade
const verifyAllAnimalsSpecies = () => {
  const myAnimals = {}; // Objeto vai receber o name e quantidade d
  for (let index = 0; index < animals.length; index += 1) {
    const nameAnimal = animals[index].name;
    const countAnimal = animals[index].residents.length;
    myAnimals[nameAnimal] = countAnimal;
  }
  return myAnimals;
};
const animalCount = (species) => {
  const myAnimals = verifyAllAnimalsSpecies();
  if (species !== undefined) {
    return myAnimals[species]; // retorna apenas o item do objeto do parametro
  }
  return myAnimals; // retorna o objeto completo com todas as especies
};
// console.log(animalCount()); // Object
// console.log(animalCount('lions')); //4
// console.log(animalCount('snakes')); //2
// ========================================================================================

// ========================================================================================
// REQUISITO 08- Implemente a função entryCalculator:
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
const verifyTotal = (entrants) => {
  let total = 0;
  const myEntries = Object.entries(entrants); // transforma num array o objeto "entrants"
  myEntries.forEach((item) => {
    total += (prices[item[0]] * item[1]);
  });
  return total;
};

const entryCalculator = (entrants) => {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  return verifyTotal(entrants);
};
// console.log(entryCalculator()); // 0
// console.log(entryCalculator({})); // 0
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 })); // 187.94
// console.log(entryCalculator({ 'Adult': 1 })); // 49.99
// console.log(entryCalculator({ 'Child': 1 })); // 20.99
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 })); // 45.98
// ========================================================================================


// ========================================================================================
// REQUISITO 09- Implemente a função animalMap:
// Sem parâmetros, retorna animais categorizados por localização
// Com a opção includeNames: true especificada, retorna nomes de animais
// Com a opção sorted: true especificada, retorna nomes de animais ordenados
// Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais
//   macho/fêmea
// Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
//   retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
const animalsByLocation = (location) => {
  const animalsLocation = {};
  location.forEach((itemLocation) => {
    animalsLocation[itemLocation] = animals.filter(item => item.location === itemLocation);
    animalsLocation[itemLocation] = animalsLocation[itemLocation].map(item => item.name);
  });
  return animalsLocation;
};

const getResidents = (myAnimal, sex, sorted) => {
  let residents = animals.find(item => item.name === myAnimal).residents;
  if (sex !== 'N') {
    residents = residents.filter(item => item.sex === sex);
  }
  const residentsname = residents.map(item => item.name);
  if (sorted) {
    residentsname.sort();
  }
  return residentsname;
};
// console.log(getResidents('lions', 'N', true));

const createObjectAnimalsResidents = (itemAnimal, sex, sorted) => {
  const myObjectAnimals = {};
  myObjectAnimals[itemAnimal] = getResidents(itemAnimal, sex, sorted);
  return myObjectAnimals;
};
// console.log(createObjectAnimalsResidents('lions'));

const createArrayAnimalResidents = (myAnimals, sex, sorted) => {
  const myArrayAnimails = [];
  myAnimals.forEach((itemAnimal) => {
    let animalResidents = {};
    animalResidents = createObjectAnimalsResidents(itemAnimal, sex, sorted);
    myArrayAnimails.push(animalResidents);
  });
  return myArrayAnimails;
};
// console.log(createArrayAnimalResidents([ 'lions', 'giraffes' ]));

const animalsByLocationWithName = (location, sex, sorted) => {
  const animalsLocation = {};
  location.forEach((itemLocation) => {
    let myAnimals = animals.filter(item => item.location === itemLocation);
    myAnimals = myAnimals.map(item => item.name);
    animalsLocation[itemLocation] = createArrayAnimalResidents(myAnimals, sex, sorted);
  });
  return animalsLocation;
};
// console.log(animalsByLocationWithName(0, [ 'NE', 'NW', 'SE', 'SW' ]));

const animalMap = (options) => {
  const location = ['NE', 'NW', 'SE', 'SW'];
  if (options !== undefined) {
    const { includeNames = false, sex = 'N', sorted = false } = options;
    if (includeNames) {
      return animalsByLocationWithName(location, sex, sorted);
    }
  }
  return animalsByLocation(location);
};
// console.log(animalMap());
// console.dir(animalMap({ includeNames: true}), {depth: null});
// console.dir(animalMap({ includeNames: true, sorted: true }), {depth: null});
// console.dir(animalMap({ includeNames: true, sex: 'female' }), {depth: null});
// ========================================================================================

// ========================================================================================
// REQUISITO 10- Implemente a função schedule:
// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos
const newSchedule = (days, dayName) => {
  const mySchedule = {};
  days.forEach((itemDay) => {
    if (dayName === 'All' || dayName === itemDay[0]) {
      const hourOpen = itemDay[1].open;
      const hourClose = itemDay[1].close - 12;
      if (hourOpen === 0) {
        mySchedule[itemDay[0]] = 'CLOSED';
      } else {
        mySchedule[itemDay[0]] = `Open from ${hourOpen}am until ${hourClose}pm`;
      }
    }
  });
  return mySchedule;
};

const schedule = (dayName) => {
  if (dayName === undefined) {
    dayName = 'All';
  }
  const days = Object.entries(hours);
  return newSchedule(days, dayName);
};
// console.log(schedule());
// console.log(schedule('Monday'));
// console.log(schedule('Tuesday'));
// ========================================================================================

// ========================================================================================
// REQUISITO 11- Implemente a função oldestFromFirstSpecies:
// Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo
// funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
const verifyOldestResidents = (myResidents) => {
  const myEntries = Object.entries(myResidents);
  const newArray = [];
  myEntries.forEach((item) => {
    const itemArray = [];
    itemArray.push(item[1].name, item[1].sex, item[1].age);
    newArray.push(itemArray);
  });
  return newArray.sort(function (a, b) {
    return b[2] - a[2];
  });
};
const oldestFromFirstSpecies = (id) => {
  const myEmployee = employees.find(item => item.id === id);
  const idFirstAnimal = myEmployee.responsibleFor[0];
  const myResidents = animals.find(item => item.id === idFirstAnimal).residents;
  const oldestresident = verifyOldestResidents(myResidents)[0];
  return oldestresident;
};
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
// ========================================================================================

// ========================================================================================
// REQUISITO 12- Implemente a função increasePrices:
// Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas
// casas decimais
const increasePrices = (percentage) => {
  const indice = 1 + (percentage / 100);
  prices.Adult = Math.round((prices.Adult * indice) * 100) / 100;
  prices.Senior = Math.round((prices.Senior * indice) * 100) / 100;
  prices.Child = Math.round((prices.Child * indice) * 100) / 100;
  return prices;
};
// console.log(increasePrices(50));
// console.log(increasePrices(30));
// ========================================================================================

// ========================================================================================
// REQUISITO 13- Implemente a função employeeCoverage:
// Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
// Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável
// Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
// Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
const createArrayAnimals = (myAnimalsId) => {
  const myArrayAnimailsName = [];
  myAnimalsId.forEach((idAnimal) => {
    const myAnimal = animals.find(item => item.id === idAnimal);
    myArrayAnimailsName.push(myAnimal.name);
  });
  return myArrayAnimailsName;
};

const createObjectEmployeeAnimals = (myEmployees) => {
  const myObject = {};
  for (let index = 0; index < myEmployees[0].length; index += 1) {
    myObject[myEmployees[0][index]] = createArrayAnimals(myEmployees[1][index]);
  }
  return myObject;
};

const verifyEmployeesParameter = (param) => {
  const myEmployees = [];
  if (param === undefined) {
    myEmployees.push(employees.map(item => `${item.firstName} ${item.lastName}`));
    myEmployees.push(employees.map(item => item.responsibleFor));
  } else {
    const myEmployeeFilter = employees.filter(item =>
      item.id === param || item.firstName === param || item.lastName === param);
    myEmployees.push(myEmployeeFilter.map(item => `${item.firstName} ${item.lastName}`));
    myEmployees.push(myEmployeeFilter.map(item => item.responsibleFor));
  }
  return myEmployees;
};

const employeeCoverage = (idOrName) => {
  const myEmployees = verifyEmployeesParameter(idOrName);
  return createObjectEmployeeAnimals(myEmployees);
};
// console.log(employeeCoverage());
// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
// console.log(employeeCoverage('Stephanie'));
// console.log(employeeCoverage('Azevado'));
// ========================================================================================
// FIM DOS RESQUISITOS
// ========================================================================================

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