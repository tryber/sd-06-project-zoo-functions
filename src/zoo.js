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

const { animals: animalsObject, employees, prices } = data;

function animalsByIds(...ids) {
  return animalsObject.filter(item => ids.includes(item.id));
}

function animalsOlderThan(animal, age) {
  const animalAnswer = animalsObject.filter(item => item.name === animal);
  return animalAnswer.every(element => element.residents.every(ageAnimal => ageAnimal.age > age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(element =>
    element.firstName === employeeName || element.lastName === employeeName,
  );
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.map(element => element.managers)
    .map(item => item.includes(id))
    .some(finder => finder === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const objAdd = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(objAdd);
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    const resp = animalsObject.map((element) => {
      obj[element.name] = element.residents.length;
      return obj;
    });
    return resp[0];
  }
  return animalsObject.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (!Object.keys(entrants)) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
}

function animalsFilteredByLocation(location) {
  return animalsObject.filter(animal => animal.location === location);
}

// function retrieveAnimalsFromLocation(location) {
//   const list = animalsFilteredByLocation(location);
//   return list
//     .map(element => element.name);
// }

function AnimalsName(location) {
  const list = animalsFilteredByLocation(location);
  return list
    .map(element => element.residents.map(name => name.name));
}

function animalsGender(location, sex, index) {
  const list = animalsFilteredByLocation(location);
  return list
    .map(resident => resident
      .residents.filter(name => name.sex === sex))[index]
    .map(gender => gender.name);
}

// function withNoOptions() {
//   return {
//     NE: retrieveAnimalsFromLocation('NE'),
//     NW: retrieveAnimalsFromLocation('NW'),
//     SE: retrieveAnimalsFromLocation('SE'),
//     SW: retrieveAnimalsFromLocation('SW'),
//   };
// }

function withNoSortedNorsex(sorted) {
  if (!sorted) {
    return {
      NE: [
        { [retrieveAnimalsFromLocation('NE')[0]]: AnimalsName('NE')[0] },
        { [retrieveAnimalsFromLocation('NE')[1]]: AnimalsName('NE')[1] },
      ],
      NW: [
        { [retrieveAnimalsFromLocation('NW')[0]]: AnimalsName('NW')[0] },
        { [retrieveAnimalsFromLocation('NW')[1]]: AnimalsName('NW')[1] },
        { [retrieveAnimalsFromLocation('NW')[2]]: AnimalsName('NW')[2] },
      ],
      SE: [
        { [retrieveAnimalsFromLocation('SE')[0]]: AnimalsName('SE')[0] },
        { [retrieveAnimalsFromLocation('SE')[1]]: AnimalsName('SE')[1] },
      ],
      SW: [
        { [retrieveAnimalsFromLocation('SW')[0]]: AnimalsName('SW')[0] },
        { [retrieveAnimalsFromLocation('SW')[1]]: AnimalsName('SW')[1] },
      ],
    };
  } else {
    return withSortedButNoSex();
  }
}

function withSortedButNoSex() {
  return {
    NE: [
      { [retrieveAnimalsFromLocation('NE')[0]]: AnimalsName('NE')[0].sort() },
      { [retrieveAnimalsFromLocation('NE')[1]]: AnimalsName('NE')[1].sort() },
    ],
    NW: [
      { [retrieveAnimalsFromLocation('NW')[0]]: AnimalsName('NW')[0].sort() },
      { [retrieveAnimalsFromLocation('NW')[1]]: AnimalsName('NW')[1].sort() },
      { [retrieveAnimalsFromLocation('NW')[2]]: AnimalsName('NW')[2].sort() },
    ],
    SE: [
      { [retrieveAnimalsFromLocation('SE')[0]]: AnimalsName('SE')[0].sort() },
      { [retrieveAnimalsFromLocation('SE')[1]]: AnimalsName('SE')[1].sort() },
    ],
    SW: [
      { [retrieveAnimalsFromLocation('SW')[0]]: AnimalsName('SW')[0].sort() },
      { [retrieveAnimalsFromLocation('SW')[1]]: AnimalsName('SW')[1].sort() },
    ],
  };
}

// console.log(teste());

function teste() {
  const resp = withSortedButNoSex();
  return resp['NE'];

}

function withNoSorted(sex) {
  return {
    NE: [
      { [retrieveAnimalsFromLocation('NE')[0]]: animalsGender('NE', sex, 0) },
      { [retrieveAnimalsFromLocation('NE')[1]]: animalsGender('NE', sex, 1) },
    ],
    NW: [
      { [retrieveAnimalsFromLocation('NW')[0]]: animalsGender('NW', sex, 0) },
      { [retrieveAnimalsFromLocation('NW')[1]]: animalsGender('NW', sex, 1) },
      { [retrieveAnimalsFromLocation('NW')[2]]: animalsGender('NW', sex, 2) },
    ],
    SE: [
      { [retrieveAnimalsFromLocation('SE')[0]]: animalsGender('SE', sex, 0) },
      { [retrieveAnimalsFromLocation('SE')[1]]: animalsGender('SE', sex, 1) },
    ],
    SW: [
      { [retrieveAnimalsFromLocation('SW')[0]]: animalsGender('SW', sex, 0) },
      { [retrieveAnimalsFromLocation('SW')[1]]: animalsGender('SW', sex, 1) },
    ],
  };
}

function withAllThree(sex) {
  return {
    NE: [
      { [retrieveAnimalsFromLocation('NE')[0]]: animalsGender('NE', sex, 0).sort() },
      { [retrieveAnimalsFromLocation('NE')[1]]: animalsGender('NE', sex, 1).sort() },
    ],
    NW: [
      { [retrieveAnimalsFromLocation('NW')[0]]: animalsGender('NW', sex, 0).sort() },
      { [retrieveAnimalsFromLocation('NW')[1]]: animalsGender('NW', sex, 1).sort() },
      { [retrieveAnimalsFromLocation('NW')[2]]: animalsGender('NW', sex, 2).sort() },
    ],
    SE: [
      { [retrieveAnimalsFromLocation('SE')[0]]: animalsGender('SE', sex, 0).sort() },
      { [retrieveAnimalsFromLocation('SE')[1]]: animalsGender('SE', sex, 1).sort() },
    ],
    SW: [
      { [retrieveAnimalsFromLocation('SW')[0]]: animalsGender('SW', sex, 0).sort() },
      { [retrieveAnimalsFromLocation('SW')[1]]: animalsGender('SW', sex, 1).sort() },
    ],
  };
}

function animalMap(options) {
  const { includeNames, sorted, sex } = options || {};
  const location = ['NE', 'NW', 'SE', 'SW'];
  let obj = {};
  let obj2 = {};

  if (!options) {
    location.forEach(location => {
      const animalLoc = location;
      const animals = animalsObject
        .filter(animal => animal.location === location)
        .map(animal => animal.name);
      obj[animalLoc] = animals;
    })
    return obj;
  }

  if (!includeNames) {
    location.forEach(location => {
      const animalLoc = location;
      const animals = animalsObject
        .filter(animal => animal.location === location)
        .map(animal => animal.name);
      const name = animalsObject.filter(animal => animal.location === location).map(animal => animal.residents);
      obj[animalLoc] = animals;
    })
    return obj;
  }
}
// if (!includeNames) return withNoOptions();
// if (includeNames && !sorted && !sex) return withNoSortedNorsex(sorted);
// if (includeNames && sorted && !sex) return withNoSortedNorsex(sorted);
// if (includeNames && sex && !sorted) return withNoSorted(sex);
// if (includeNames && sex && sorted) return withAllThree(sex);



// console.log(animalMap({ includeNames: true }));

function schedule(dayName) {
  const scheduleObj = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  const scheduleDay = {};
  if (!dayName) return scheduleObj;
  scheduleDay[dayName] = scheduleObj[dayName];
  return scheduleDay;
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.find(element => element.id === id).responsibleFor[0];
  const oldestAnimal = animalsObject
    .find(item => item.id === firstAnimal).residents
    .reduce((acc, current) => {
      if (current.age > acc.age) {
        return current;
      }
      return acc;
    });
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const percAdult = (Math.round(prices.Adult * (1 + (percentage / 100)) * 100)) / 100;
  const percChild = (Math.round(prices.Child * (1 + (percentage / 100)) * 100)) / 100;
  const percSenior = (Math.round(prices.Senior * (1 + (percentage / 100)) * 100)) / 100;
  prices.Adult = percAdult;
  prices.Child = percChild;
  prices.Senior = percSenior;
}

function employeeCoverage(idOrName) {
  let allAnimals = {};
  let filteredEmployee;

  if (!idOrName) {
    filteredEmployee = employees;
  } else {
    filteredEmployee = employees.filter(
      idAndName => idAndName.id === idOrName ||
        idAndName.firstName === idOrName ||
        idAndName.lastName === idOrName
    );
  }
  filteredEmployee.forEach(employer => {
    let mappedAnimal = employer.responsibleFor.map(animalId => {
      return animalsObject.find(item => item.id === animalId).name;
    })
    allAnimals[`${employer.firstName} ${employer.lastName}`] = mappedAnimal;
  })
  return allAnimals;
}



console.log(employeeCoverage('Azevado'));


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
