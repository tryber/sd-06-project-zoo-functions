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
  return animals.filter((elem, i) => elem.id === ids[i]);
}

function animalsOlderThan(animal, ages) {
  const datas = animals
    .filter(elem => elem.name === animal)
    .flatMap(elem => elem.residents)
    .every(elem => elem.age >= ages);
  return datas;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const employee = data.employees
    .filter(elem => elem.firstName === employeeName || elem.lastName === employeeName)
    .reduce((acc, curr) => acc + curr);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((elem, i) => elem.managers[i] === id);
}

function addEmployee(...info) {
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
  Object.keys(data.hours).forEach((days, i) => {
    const { open, close } = Object.values(data.hours)[i];
    if (days === 'Monday') {
      obj[days] = 'CLOSED';
    } else {
      obj[days] = `Open from ${convert(open)} until ${convert(close)}`;
    }
  });
  if (!dayName) return obj;
  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const idAnimal = data.employees
    .filter(elem => elem.id === id)
    .map(elem => elem.responsibleFor[0]);
  const info = animals
    .filter(elem => elem.id === idAnimal[0])
    .map(animal => animal.residents)[0];
  const older = info
    .map(item => item.age)
    .reduce((acc, curr) => (acc > curr ? acc : curr));
  const animal = info.find(elem => elem.age === older);
  return Object.values(animal);
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((values, i) => {
    const price = Object.values(data.prices)[i];
    const add = (price * percentage) / 100;
    const result = price + add;
    data.prices[values] = Math.round(result * 100) / 100;
  });
  return data.prices;
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
