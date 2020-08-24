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
  // seu código aqui
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const { residents: selectedsAnimal } = data.animals.find(item => item.name === animal);

  return selectedsAnimal.every(item => item.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return data
    .employees.find(item => (item.firstName === employeeName || item.lastName === employeeName));
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  const createdEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return createdEmployee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.some(itemId => itemId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const createdEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(createdEmployee);
}

function animalCount(species) {
  // seu código aqui
  const returnObj = {};
  if (!species) {
    data.animals.forEach(function (animal) { returnObj[animal.name] = animal.residents.length; });
    return returnObj;
  }
  const animalSelected = data.animals.find(animal => animal.name === species);
  return animalSelected.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  let total = 0;
  if (!entrants) {
    return total;
  }
  if (entrants.Adult) {
    total += data.prices.Adult * entrants.Adult;
  }
  if (entrants.Senior) {
    total += data.prices.Senior * entrants.Senior;
  }
  if (entrants.Child) {
    total += data.prices.Child * entrants.Child;
  }
  return total;
}
// const data = require('./data');
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
  //  seu código aqui
  const objHours = {};
  const arrayKeys = Object.keys(data.hours);
  arrayKeys.forEach((day) => {
    const auxDay = data.hours[day];
    if (auxDay.open === 0) {
      objHours[day] = 'CLOSED';
    } else {
      objHours[day] = `Open from ${auxDay.open}am until ${auxDay.close - 12}pm`;
    }
  });
  if (!dayName) {
    return objHours;
  }
  const objDayName = {
    [dayName]: objHours[dayName],
  };
  return objDayName;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const idSpecie = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const residentsById = data.animals.find(itemAnimal => itemAnimal.id === idSpecie).residents;
  residentsById.sort((a, b) => b.age - a.age);
  const { name, sex, age } = residentsById[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const priceKeys = Object.keys(data.prices);
  priceKeys.forEach((type) => {
    const returnPrice = Math.round((1 + (percentage / 100)) * data.prices[type] * 100) / 100;
    data.prices[type] = returnPrice;
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
