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


const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals
  .filter(animal => animal.id === ids || ids.includes(animal.id));


const animalsOlderThan = (animal, age) => {
  const species = animals.find(an => an.name === animal);
  return species.residents.every(resident => resident.age >= age);
};


const employeeByName = (employeeName) => {
  if (employeeName) {
    return employees.find(nameEmploy => nameEmploy.firstName === employeeName
      || nameEmploy.lastName === employeeName);
  }
  return {};
};
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => {
  let resultado = false;
  const idManagers = employees.map(managers => managers.managers);
  idManagers.forEach((element) => {
    if (element.some(item => item === id)) {
      resultado = true;
    }
  });
  return resultado;
};

const addEmployee = (id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) =>
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });


const animalCount = (species) => {
  if (species) {
    const a = animals.find(namePopular =>
      namePopular.name === species);
    return a.residents.length;
  }
  const animalCoun = animals.reduce((acc, currentValue) => {
    acc[currentValue.name] = currentValue.residents.length;
    return acc;
  }, {});
  return animalCoun;
};

const entryCalculator = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, curr) => acc +
    (entrants[curr] * prices[curr]), 0);
};

const animalMap = (options) => {

};

const schedule = (dayName) => {
  if (!dayName) {
    return Object.keys(hours).reduce((acc, currentValue) => {
      const { open, close } = hours[currentValue];
      const a = currentValue;
      let prhase = `Open from ${open}am until ${close - 12}pm`;
      if (currentValue === 'Monday') {
        prhase = 'CLOSED';
      }
      return { ...acc, [a]: prhase };
    }, {});
  } else if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
};


const oldestFromFirstSpecies = (id) => {
  const EmployeObj = employees.find(employeId => employeId.id === id);
  const firstSpecie = animals.find(animal => animal.id === EmployeObj.responsibleFor[0]);

  let maxAge = 0;
  let oldResident;
  const result = [];
  firstSpecie.residents.map((resident) => {
    if (resident.age > maxAge) {
      maxAge = resident.age;
      oldResident = resident;
    }
    return oldResident;
  });
  result[0] = oldResident.name;
  result[1] = oldResident.sex;
  result[2] = oldResident.age;
  return result;
};

const increaseOnePrice = (price, percentage) => {
  const price1 = price + ((percentage * price) / 100);
  return Math.round(price1 * 100) / 100;
};
const increasePrices = (percentage) => {
  prices.Adult = increaseOnePrice(prices.Adult, percentage);
  prices.Child = increaseOnePrice(prices.Child, percentage);
  prices.Senior = increaseOnePrice(prices.Senior, percentage);
  return prices;
};

const employeeCoverage = (idOrName) => {
  const result = {};
  let filteredEmployes;
  if (!idOrName) {
    filteredEmployes = employees;
  } else {
    filteredEmployes = employees
      .filter(employe => employe.id === idOrName ||
        employe.firstName === idOrName || employe.lastName === idOrName);
  }
  filteredEmployes.forEach((employe) => {
    const mappedAnimal = employe.responsibleFor.map((idAnimal) => {
      const foundNameAninamal = animals.find(element => element.id === idAnimal).name;
      return foundNameAninamal;
    });
    result[`${employe.firstName} ${employe.lastName}`] = mappedAnimal;
  });
  return result;
};

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
