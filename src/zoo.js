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
const { hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (!ids) {
    return [];
  }
  const animalsWithId = [];
  ids.forEach((id) => {
    animalsWithId.push(animals.find(animal => animal.id === id));
  });
  return animalsWithId;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalsWithName = animals.filter(aniName => aniName.name === animal);
  const residents = animalsWithName.flatMap(anires => anires.residents);
  return residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  const selectedEmployee = employees.find(function (employee) {
    return employeeName === employee.firstName || employeeName === employee.lastName;
  });
  return selectedEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // seu código aqui
  const managerIds = employees.flatMap(employee => employee.managers);
  return managerIds.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(employee);
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((ac, at) => ({ ...ac, [at.name]: at.residents.length }), {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }
  let totalPrice = 0;
  if (entrants.Adult) {
    totalPrice += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Senior) {
    totalPrice += entrants.Senior * data.prices.Senior;
  }
  if (entrants.Child) {
    totalPrice += entrants.Child * data.prices.Child;
  }
  return totalPrice;
}

function noParamsAnimalMap() {
  const arrayLocation = ['NE', 'NW', 'SE', 'SW'];
  const animalPerLocation = {};
  arrayLocation.forEach((region) => {
    animalPerLocation[region] = data.animals
      .filter(animal => animal.location === region).map(obj => obj.name);
  });
  return animalPerLocation;
}
function paramsAnimalMap(obj, options) {
  const arrayLocation = Object.keys(obj);
  arrayLocation.forEach((region) => {
    obj[region].forEach((name, index) => {
      let arrayAux = [];
      if (options.sex) {
        arrayAux = data.animals.find(animal => animal.name === name)
          .residents.filter(item => item.sex === options.sex).map(item => item.name);
      } else {
        arrayAux = data.animals.find(animal => animal.name === name)
          .residents.map(item => item.name);
      }
      if (options.sorted) {
        arrayAux.sort();
      }
      const objNames = {
        [name]: arrayAux,
      };
      obj[region][index] = objNames;
    });
  });
  return obj;
}

function animalMap(options) {
  // seu código aqui
  const objReturn = noParamsAnimalMap();
  if (options && options.includeNames) {
    return paramsAnimalMap(objReturn, options);
  }
  return objReturn;
}

function schedule(dayName) {
  // seu código aqui
  const hoursObject = {};
  const arrayKeys = Object.keys(hours);
  arrayKeys.forEach((day) => {
    const auxDay = data.hours[day];
    if (auxDay.open === 0) {
      hoursObject[day] = 'CLOSED';
    } else {
      hoursObject[day] = `Open from ${auxDay.open}am until ${auxDay.close - 12}pm`;
    }
  });
  if (!dayName) {
    return hoursObject;
  }
  const objDayName = {
    [dayName]: hoursObject[dayName],
  };
  return objDayName;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeFirstAnimalID = employees.find(employee => employee.id === id).responsibleFor[0];
  const specie = animals.filter(animal => animal.id === employeeFirstAnimalID);
  const residents = specie.flatMap(res => res.residents);
  return Object.values(residents.sort((a1, a2) => a2.age - a1.age)[0]);
}

function increasePrices(percentage) {
  // seu código aqui
  const priceKeys = Object.keys(data.prices);
  priceKeys.forEach((key) => {
    const NewPrice = Math.round((1 + (percentage / 100)) * data.prices[key] * 100) / 100;
    data.prices[key] = NewPrice;
  });
}

function employeeCoverageNoParams() {
  const objReturn = {};
  const arrayNames = data.employees.map(employee => `${employee.firstName} ${employee.lastName}`);
  arrayNames.forEach((name, index) => {
    const arrayAnimals = [];
    data.employees[index].responsibleFor
      .forEach(idAnimal => arrayAnimals.push(data.animals.find(item => item.id === idAnimal).name));
    objReturn[name] = arrayAnimals;
  });
  return objReturn;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const objReturn = employeeCoverageNoParams();
  if (!idOrName) {
    return objReturn;
  }
  const objEmployee = data.employees
    .find(item => (item.firstName === idOrName || item.lastName === idOrName ||
      item.id === idOrName));
  const fullName = `${objEmployee.firstName} ${objEmployee.lastName}`;
  const fullListKeys = Object.keys(objReturn);
  const fullListValues = Object.values(objReturn);
  let employeeAnimals = [];
  fullListKeys.forEach((name, index) => {
    if (name === fullName) {
      employeeAnimals = fullListValues[index];
    }
  });
  const objWithIdOrName = {};
  objWithIdOrName[fullName] = employeeAnimals;
  return objWithIdOrName;
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
