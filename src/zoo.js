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

function animalsByIds(...ids) {
  if (ids === []) {
    return [];
  } else if (ids.length === 1) {
    return data.animals.filter(animal => animal.id === ids[0]);
  }
  return data.animals.filter(animal => ids.some(id => (animal.id === id)));
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(allAnimals => allAnimals.name === animal)
  .some(pets => pets.residents.every(pet => pet.age >= age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.filter((emp) => {
    const emplo = employeeName;
    return (emp.firstName === emplo || emp.lastName === emplo);
  })[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(emplo => (emplo.managers[0] === id || emplo.managers[1] === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return data.animals.map((animal) => {
      const nome = animal.name;
      return {
        [nome]: animal.residents.length,
      };
    }).reduce((acc, i) => Object.assign(acc, i));
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  let result = 0;
  if (entrants.Adult) {
    result = entrants.Adult * data.prices.Adult;
  }
  if (entrants.Child) {
    result += entrants.Child * data.prices.Child;
  }
  if (entrants.Senior) {
    result += entrants.Senior * data.prices.Senior;
  }
  return result;
}

function animalMap(options) {
  // if(!options) {
  //   return data.animals.map((animal) => {
  //     animal.name
  //   })
  // }
}
// console.log(animalMap());
// console.log(animalMap());
function schedule(dayName) {
  const hours = Object.entries(data.hours);
  if (!dayName) {
    const name = {};
    hours.map((hour) => {
      if (hour[0] === 'Monday') {
        name.Monday = 'CLOSED';
        return name;
      }
      return (name[hour[0]] = `Open from ${hour[1].open}am until ${hour[1].close - 12}pm`);
    });
    return name;
  }
  return hours.filter(hour => hour[0] === dayName).map((hour) => {
    if (dayName === 'Monday') {
      return {
        [dayName]: 'CLOSED',
      };
    }
    return {
      [dayName]: `Open from ${hour[1].open}am until ${hour[1].close - 12}pm`,
    };
  })[0];
}

function oldestFromFirstSpecies(id) {
  const func = data.employees.filter(emp => emp.id === id);
  const resp = data.animals.filter(animal => animal.id === func[0].responsibleFor[0]);
  const result = resp[0].residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(result);
}

function increasePrices(percentage) {
  let { Adult, Child, Senior } = data.prices;
  Adult = Math.round((Adult * ((percentage / 100) + 1)) * 100) / 100;
  Child = Math.round((Child * ((percentage / 100) + 1)) * 100) / 100;
  Senior = Math.round((Senior * ((percentage / 100) + 1)) * 100) / 100;
  data.prices.Adult = Adult;
  data.prices.Child = Child;
  data.prices.Senior = Senior;
  return {
    Adult,
    Senior,
    Child,
  };
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const objAnimal = data.employees.flatMap((emp) => {
      const ani = data.animals.filter(animal => emp.responsibleFor
        .some(id => id === animal.id))
        .map(animal => animal.name);
      const name = `${emp.firstName} ${emp.lastName}`;
      return {
        [name]: ani,
      };
    });
    const obj = {};
    objAnimal.forEach(e => Object.assign(obj, e));
    return obj;
  }
  return 'ok'; // Retorno provisorio
}
// console.log(employeeCoverage());
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
