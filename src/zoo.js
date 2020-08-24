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

function animalsByIds(ids, id) {
  // seu código aqui..
  if (ids === '' && id === '') {
    return [];
  }
  const result = animals
  .filter(filteredAnimal => filteredAnimal.id === ids || filteredAnimal.id === id);
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const filteredAnimal = animals.find(nameAnimal => nameAnimal.name === animal);
  return filteredAnimal.residents.every(olderAnimal => olderAnimal.age > age);
}

function employeeByName(...employeeName) {
  // seu código aqui
  const validaParametroFuncaoEmployeeByName = [];
  if (employeeName.length === validaParametroFuncaoEmployeeByName.length) {
    return {};
  }
  const searchEmployee = employees
  .find(employee => employeeName.includes(employee.firstName) ||
  employeeName.includes(employee.lastName));
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
  return employees
  .some(manager => manager.id === id && manager.lastName === 'Bethea');
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const obj = {};
    animals.forEach(element => (obj[element.name] = element.residents.length));
    return obj;
  }
  return animals
  .filter(element => element.name === species)
  .reduce((acc, curr) => acc + curr.residents.length, 0);
}

function entryCalculator(entrants) {
  // seu código aqui
  if ((typeof entrants !== 'object') && (entrants === undefined)) {
    return 0;
  } else if ((typeof entrants === 'object') && Object.keys(entrants).length === 0) {
    return 0;
  }
  const people = Object.keys(entrants);
  const peopleQtd = Object.values(entrants);
  const total = people.reduce((acc, curr, index) => {
    const calc = prices[curr] * peopleQtd[index];
    return acc + calc;
  }, 0);
  return total;
}

function animalMap(options) {
  // seu código aqui
}
function AmPm(hora) {
  if (hora > 0 && hora < 12) {
    return `${hora}am`;
  } else if (hora > 12 && hora <= 23) {
    return `${hora - 12}pm`;
  } else if (hora === 0) {
    return `${hora}am`;
  } else if (hora === 12) {
    return `${hora}pm`;
  }
}
function schedule(dayName) {
  // seu código aqui

  const dias = Object.keys(hours);
  const horario = Object.values(hours);
  const obj = {};
  if (dayName === undefined) {
    horario.map((element, index, array) => {
      if (index === array.length - 1) return (obj[dias[index]] = 'CLOSED');
      return (obj[dias[index]] = `Open from ${AmPm(element.open)} until ${AmPm(element.close)}`);
    });
    return obj;
  }
  if (dayName === 'Monday') {
    (obj[dayName] = 'CLOSED');
    return obj;
  }
  const specificDay = Object.entries(hours);
  specificDay.filter(day => day[0] === dayName)
    .reduce((acc, curr, index) => {
      (obj[dayName] = `Open from ${AmPm(curr[1].open)} until ${AmPm(curr[1].close)}`);
      return curr;
    }, {});
  return obj;
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
