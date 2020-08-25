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

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((elem, i) => elem.id === ids[i]);
}

function animalsOlderThan(animal, ages) {
  // seu código aqui
  const datas = animals
    .filter(elem => elem.name === animal)
    .flatMap(elem => elem.residents)
    .every(elem => elem.age >= ages);
  return datas;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  const employee = data.employees
    .filter(elem => elem.firstName === employeeName || elem.lastName === employeeName)
    .reduce((acc, curr) => acc + curr);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((elem, i) => elem.managers[i] === id);
}

function addEmployee(...info) {
  // seu código aqui
  const newEmp = {
    id: info[0],
    firstName: info[1],
    lastName: info[2],
    managers: (info.length >= 4) ? info[3] : [],
    responsibleFor: (info.length >= 5) ? info[4] : [],
  };
  data.employees.push(newEmp);
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    const obj = {};
    for (let i = 0; i < animals.length; i += 1) {
      const { name, residents } = animals[i];
      obj[name] = residents.length;
    }
    return obj;
  }
  const animal = animals
    .filter(elem => elem.name === species)
    .map(elem => elem.residents.length);
  const [first] = animal;
  return first;
}

function entryCalculator(entrants = 0) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult, Child, Senior } = data.prices;
  let result = 0;
  if (Object.keys(entrants).includes('Adult')) {
    result += Adult * entrants.Adult;
  }
  if (Object.keys(entrants).includes('Child')) {
    result += Child * entrants.Child;
  }
  if (Object.keys(entrants).includes('Senior')) {
    result += Senior * entrants.Senior;
  }
  return result;
}

const gen = (sex) => {
  let general = 'female';
  if (sex === 'male') general = 'male';
  return general;
};

function animalMap(options) {
  const obj = {};
  const location = animals.map(elem => elem.location);
  if (!options || !options.includeNames) {
    location.forEach((position) => {
      obj[position] = animals.filter(elem => elem.location === position).map(elem => elem.name);
    });
    return obj;
  }
  if (options.includeNames === true) {
    location.forEach((position) => {
      obj[position] = animals.filter(elem => elem.location === position).map((elem) => {
        const animal = {};
        if (options.sex === gen(options.sex)) {
          animal[elem.name] = elem.residents.filter(names => names.sex === gen(options.sex))
            .flatMap(map => map.name);
          if (options.sorted === true) animal[elem.name].sort();
          return animal;
        }
        animal[elem.name] = elem.residents.flatMap(names => names.name);
        if (options.sorted === true) animal[elem.name].sort();
        return animal;
      });
    });
  }
  return obj;
}

const convert = (time) => {
  const amOrPm = (time < 12) ? 'am' : 'pm';
  const hour = time % 12 || 12;
  return `${hour}${amOrPm}`;
};// Baseado em : https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

function schedule(dayName) {
  const obj = {};
  if (!dayName) {
    Object.keys(data.hours).forEach((days, i) => {
      const { open, close } = Object.values(data.hours)[i];
      if (days === 'Monday') {
        obj[days] = 'CLOSED';
        return obj;
      }
      obj[days] = `Open from ${convert(open)} until ${convert(close)}`;
      return obj;
    });
  }
  if (Object.keys(data.hours).includes(dayName)) {
    const day = Object.entries(data.hours).filter(elem => elem[0] === dayName);
    const { open, close } = day[0][1];
    const name = day[0][0];
    if (dayName === 'Monday') {
      obj[name] = 'CLOSED';
      return obj;
    }
    obj[name] = `Open from ${convert(open)} until ${convert(close)}`;
  }
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
