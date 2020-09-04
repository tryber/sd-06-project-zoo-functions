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
console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

function speciesForLocation() {
  const resultLocal = {};
  animals.forEach((local) => {
    const localAnimals = local.location;
    const resultName = animals.filter(animalsLocal => animalsLocal.location === localAnimals)
      .map(animalsName => animalsName.name);
    resultLocal[localAnimals] = resultName;
  });
  return resultLocal;
}

function speciesForNameOrSex(location, sorted, sex) {
  const resultLocal = {};
  location.forEach((actualLocation) => {
    const animalsForLocation = animals.filter(animalsLocation =>
      animalsLocation.location === actualLocation).map((animal) => {
        const nameSpecies = animal.name;
        let nameResidentes = animal.residents
          .map(nameResid => nameResid.name);
        if (sorted) {
          nameResidentes.sort();
        }
        if (sex) {
          nameResidentes = animal.residents.filter(nameResid => nameResid.sex === sex)
            .map(animalSex => animalSex.name);
          if (sex && sorted) nameResidentes.sort();
        }
        return { [nameSpecies]: nameResidentes };
      });
    resultLocal[actualLocation] = animalsForLocation;
  });
  return resultLocal;
}

function animalMap(options) {
  const filterLocal = animals.map(local => local.location); // todas coordenadas repetidas
  const locationFilter = filterLocal.filter((nameLocation, index) =>
    filterLocal.indexOf(nameLocation) === index);
  if (!options) return speciesForLocation();
  const { includeNames, sorted, sex } = options;
  if (includeNames) return speciesForNameOrSex(locationFilter, sorted, sex);
  return animals[0].name;
}
// console.log(animalMap({ sorted: true }));

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
  let result;

  let response;
  employees.filter(employer => employer.id === id)
    .map(responsibleFor => responsibleFor.responsibleFor)
    .forEach((idPosition) => { result = idPosition[0]; });
  animals.filter(animalForEmployee => animalForEmployee.id === result)
    .map(animalRes => animalRes.residents).forEach((animalPosition) => {
      result = animalPosition;
      const listAges = result.map(value => value.age); const ageMax = Math.max(...listAges);
      const animalAge = result.filter(animalAgeMax => animalAgeMax.age === ageMax);
      //   const { name, sex, age } = animalAge[0];
      //  response = [name,sex,age];
      response = Object.values(animalAge[0]);
    });

  return response;
}
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'))

function increasePrices(percentage) {
 
}
// console.log(increasePrices(50));

function employeeCoverage(idOrName) {
  
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
