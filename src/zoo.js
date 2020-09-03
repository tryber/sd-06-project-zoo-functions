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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');


function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}
// console.log(animalsByIds('e8481c1d-42ea-4610-8e11-1752cfc05a46'))
function animalsOlderThan(animal, age) {
  let response;
  animals.filter(options => options.name === animal)
    .forEach((position) => {
      response = position.residents.every(animalAge => animalAge.age >= age);
    });
  return response;
  // const filterAnimals = animals.filter((options)=> animal.includes(options.name))
}
// console.log(animalsOlderThan('penguins', 6));

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  let response;
  employees.filter(filterNameFun => filterNameFun.firstName === employeeName
    || filterNameFun.lastName === employeeName)
    .forEach((position) => { response = position; }); // foreach pra retornar so o objeto
  return response;
}
// console.log(employeeByName('Nigel'));

function createEmployee(personalInfo, associatedWith) {
  const { id: identifier, firstName: name, lastName: surnName } = personalInfo;
  const { managers: adm, responsibleFor: responsible } = associatedWith;
  const newEmploye = {
    id:
      identifier,
    firstName: name,
    lastName: surnName,
    managers: adm,
    responsibleFor: responsible,
  };
  return newEmploye;
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

function isManager(id) {
  const result = [];
  employees.forEach(idManager => idManager.managers.forEach(manager =>
    result.push(manager)));
  //  console.log(result)
  return result.some(postionId => postionId === id);
  // const resultSome = resultMap.forEach(postionId =>console.log(postionId));
  //  return resultSome
}
// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function addEmployee(idi, name, surName, adm, respons) {
  if (!adm) {
    adm = [];
  }
  if (!respons) {
    respons = [];
  }
  const newEmployee = {
    id: idi,
    firstName: name,
    lastName: surName,
    managers: adm,
    responsibleFor: respons,
  };
  employees.push(newEmployee);
  return newEmployee;
}
// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'))
// console.log(employees.length)

function animalCount(species) {
  let result = {};
  if (!species) {
    animals.forEach((options) => {
      result[options.name] = options.residents.length;
    });
  } else {
    animals.filter(options => options.name === species)
      .forEach((amount) => { result = amount.residents.length; });
  }
  return result;
}
// console.log(animalCount());

function entryCalculator(entrants) {
  let sumAdult = 0;
  let sumSenior = 0;
  let sumChild = 0;
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult: adult, Senior: senior, Child: child } = entrants;
  if (adult) {
    sumAdult = (prices.Adult * adult);
  }
  if (senior) {
    sumSenior = (prices.Senior * senior);
  }
  if (child) {
    sumChild = (prices.Child * child);
  }
  const sumPeople = sumAdult + sumSenior + sumChild;
  return sumPeople;
  // console.log(Object.keys(prices))
}
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

function animalMap(options) {
}
// console.log(animalMap());

function schedule(dayName) {
  const result = {};
  if (!dayName) {
    const hourList = Object.keys(hours);
    hourList.forEach((propriet) => {
      result[propriet] = `Open from ${hours[propriet].open}am until ${hours[propriet].close - 12}pm`;
    });
    result.Monday = 'CLOSED';
  } else {
    if (dayName === 'Monday') {
      result[dayName] = 'CLOSED';
      return result;
    }
    result[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return result;
  }
  return result;
}
// console.log(schedule('Monday'));


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

/*
const test = {
  id: '0938aa23-f153-4937-9f88-4858b24d6bce',
  name: 'lions',
  popularity: 4,
  location: 'NE',
  residents: [[Object], [Object], [Object], [Object]]
}

console.log(Object.values(test.name))


const test = {
  id: '01422318-ca2d-46b8-b66c-3e9e188244ed',
  name: 'giraffes',
  popularity: 4,
  location: 'NE',
  residents: [
    {
      name: 'Gracia',
      sex: 'female',
      age: 11
    },
    {
      name: 'Antone',
      sex: 'male',
      age: 9
    },
    {
      name: 'Vicky',
      sex: 'female',
      age: 12
    },
    {
      name: 'Clay',
      sex: 'male',
      age: 4
    },
    {
      name: 'Arron',
      sex: 'male',
      age: 7
    },
    {
      name: 'Bernard',
      sex: 'male',
      age: 6
    }
  ]
}

console.log(Object.values(test.residents))*/


// const arreio = [1,2,3]

// console.log(arreio.includes(3))

// var arr = ['foo', 'bar', 'foo'];
// var novaArr =  arr.indexOf('oi')
// console.log(novaArr); //dá ['foo', 'bar']


// const hours ={
//     'Tuesday': { open: 8, close: 18 },
//     'Wednesday': { open: 8, close: 18 },
//     'Thursday': { open: 10, close: 20 },
//     'Friday': { open: 10, close: 20 },
//     'Saturday': { open: 8, close: 22 },
//     'Sunday': { open: 8, close: 20 },
//     'Monday': { open: 0, close: 0 },
//   }

// console.log(hours.Thursday.close)

// const países = {
//     França: 'Paris',
//     Brasil: 'Brasília',
//     Espanha: 'Madrid',
//     Portugal: 'Lisboa',
// };
// const pairKeyValue = Object.entries(países);
// console.log(pairKeyValue);
