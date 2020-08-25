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

function animalsByIds(...ids) {
  const result = [];

  animals.map((animal) => {
    const { id } = animal;
    for (const element of ids) {
      if (element === id) {
        result.push(animal);
      }
    }
    return result;
  });
  return result;
}

function animalsOlderThan(animal, ages) {
  const filterType = animals.filter(({ name }) => name === animal)
  .map(({ residents }) => residents.every(({ age }) => age > ages));
  return filterType[0];
}

function employeeByName(employeeName) {
  let result = {};
  employees.find((employee) => {
    const { firstName, lastName } = employee;
    if (employeeName === firstName || employeeName === lastName) {
      result = employee;
      return result;
    }
  });
  return result;
}

// console.log(employeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  const result = { ...personalInfo, ...associatedWith };
  return result;
}

// console.log(createEmployee(personalInfo, associatedWith));

function isManager(ids) {
  const teste = employees.some(({ managers }, index) => managers[index] === ids);
  return teste;
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const empregado = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(empregado);
}

// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));

function animalCount(species) {
  if (!species) {
    const newObj = {};
    animals.forEach((animal) => {
      const { name, residents } = animal;
      const key = name;
      const value = residents.length;
      newObj[key] = value;
    });
    return newObj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

// console.log(animalCount('lions'));

function entryCalculator(entrants = 0) {
  const { Adult, Senior, Child } = prices;
  let result = 0;
  Object.keys(entrants).forEach((key) => {
    let tot = 0;
    switch (key) {
      case 'Adult':
        tot = entrants[key] * Adult;
        result += tot;
        break;
      case 'Senior':
        tot = entrants[key] * Senior;
        result += tot;
        break;
      case 'Child':
        tot = entrants[key] * Child;
        result += tot;
        break;
      default:
        console.log('Sorry, not valid')
    }
  });
  return result;
}

// console.log(entryCalculator({}))

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const newObj = {};
  const date = Object.entries(hours);
  if (!dayName) {
    date.map((element) => {
      if (element.includes('Monday')){
        return newObj.Monday = 'CLOSED'
      }
      const day = element[0];
      const hour = element[1];
      const {open, close} = hour;
      return newObj[day] = `Open from ${ open }am until ${ close-12 }pm`
    });
    return newObj;
  } 
  date.map((item) => {
    if (dayName === 'Monday') {
      return newObj.Monday = 'CLOSED'
    }
    const day = item[0];
    const hour = item[1];
    const { open, close } = hour;
    if (day === dayName) {
      return newObj[day] = `Open from ${ open }am until ${ close-12 }pm`;
    }
  });
  return newObj;
}

console.log(schedule('Tuesday'))

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
