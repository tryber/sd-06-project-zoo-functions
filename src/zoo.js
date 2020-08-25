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
const { animals, employees, hours, prices } = require('./data');

const animalsByIds = (...params) => {
  const filtered = params.map(ids => animals.find(({ id }) => id === ids));
  return filtered;
};

const animalsOlderThan = (animal, paramAge) => {
  const filtered = animals.find(({ name }) => name === animal);
  const everyAnimal = filtered.residents.every(({ age }) => age > paramAge);
  return everyAnimal;
};

const employeeByName = (name) => {
  if (!name) {
    return {};
  }
  const funcionario = employees
    .find(({ firstName, lastName }) => firstName === name || lastName === name);
  return funcionario;
};

const createEmployee = (personalInfo, associatedWith) => {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = { id, firstName, lastName, managers, responsibleFor };
  return employee;
};

const isManager = id => employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
};

const animalCount = (species) => {
  const animalCounts = {};
  if (!species) {
    animals.forEach(({ name, residents }) => {
      animalCounts[name] = residents.length;
      return 0;
    });
  } else {
    return animals.find(({ name }) => name === species).residents.length;
  }
  return animalCounts;
};

const entryCalculator = (entrants) => {
  if (!entrants || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return `${(Adult * 49.99) + (Child * 20.99) + (Senior * 24.99)}`;
};

const findZones = (objArray) => {
  const zones = [];
  objArray.forEach(({ location }) => {
    if (!zones.includes(location)) {
      zones.push(location);
    }
  });
  return zones;
};

const animalsSeparatedByZones = (zones) => {
  const animalsByZones = {};
  zones.forEach((zone) => {
    const objsByZone = animals.filter(({ location }) => zone === location);
    objsByZone.forEach(({ name, location }) => {
      if (!animalsByZones[location]) {
        animalsByZones[location] = [];
      }
      animalsByZones[location].push(name);
    });
  });
  return animalsByZones;
};

const filterResidentsNames = (residents, sexOfResidents, sorted) => {
  let residentsfilteredSorted = residents.map(({ name }) => name);
  if (sexOfResidents) {
    residentsfilteredSorted = residents.filter(({ sex }) => sex === sexOfResidents)
    .map(({ name }) => name);
  }
  if (sorted) {
    residentsfilteredSorted.sort();
  }
  return residentsfilteredSorted;
};

const animalMap = (options) => {
  const zones = findZones(animals);
  if (!options) {
    return animalsSeparatedByZones(zones);
  }
  const { includeNames = false, sorted = false, sex } = options;
  const animalsByZones = {};
  if (includeNames) {
    zones.forEach((zone) => {
      const objsByZone = animals.filter(({ location }) => zone === location);
      objsByZone.forEach(({ name, location, residents }) => {
        if (!animalsByZones[location]) {
          animalsByZones[location] = [];
        }
        const residentsByName = {};
        residentsByName[name] = filterResidentsNames(residents, sex, sorted);
        animalsByZones[location].push(residentsByName);
      });
    });
    return animalsByZones;
  }
  return animalsSeparatedByZones(zones);
};

// const schedule = (day) => {
//   const timeAvailableObj = {};
//   if (day) {
//     const timeArray = Object.entries(hours).find(e => day === e[0]);
//     timeAvailableObj[timeArray[0]] = timeArray[0] === 'Monday' ?
//       'CLOSED' : `Open from ${timeArray[1].open}am until ${timeArray[1].close - 12}pm`;
//     return timeAvailableObj;
//   }
//   Object.entries(hours).forEach((e) => {
//     timeAvailableObj[e[0]] = e[0] === 'Monday' ?
//       'CLOSED' : `Open from ${e[1].open}am until ${e[1].close - 12}pm`;
//     return 0;
//   });
//   return timeAvailableObj;
// };

const isMonday = (array) => {
  const timeAvailableObj = {};
  timeAvailableObj[array[0]] = array[0] === 'Monday' ?
  'CLOSED' : `Open from ${array[1].open}am until ${array[1].close - 12}pm`;
  return timeAvailableObj;
};

const schedule = (day) => {
  const timeAvailableObjAll = {};
  if (day) {
    const timeArray = Object.entries(hours).find(e => day === e[0]);
    return isMonday(timeArray);
  }
  Object.entries(hours).forEach((e) => {
    timeAvailableObjAll[Object.keys(isMonday(e))[0]] = Object.values(isMonday(e))[0];
  });
  return timeAvailableObjAll;
};

const oldestFromFirstSpecies = (employeeId) => {
  const animalId = employees.find(({ id }) => id === employeeId).responsibleFor[0];
  const residentsArray = animals.find(({ id }) => animalId === id).residents;
  const oldest = residentsArray.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
};

const increasePrices = (percentage) => {
  Object.entries(prices).forEach((e) => {
    prices[e[0]] = Math.round((e[1] * (1 + (percentage / 100)) * 100)) / 100;
    return 0;
  });
  return prices;
};

const isIdOrName = checkIdOrName => (/.*\d.*/.test(checkIdOrName) ? 'id' : 'name');

const mountObj = (nameOne, nameTwo, array) => {
  const employeeAnimals = {};
  employeeAnimals.fullName = `${nameOne} ${nameTwo}`;
  employeeAnimals.responsibleFor = array;
  return employeeAnimals;
};

const createEmployeeNameAnimalIdArray = (stringIdOrName) => {
  if (!stringIdOrName) {
    let employeeAnimaIdlArray = [];
    employeeAnimaIdlArray = employees
    .map(e => mountObj(e.firstName, e.lastName, e.responsibleFor));
    return employeeAnimaIdlArray;
  }
  const idName = isIdOrName(stringIdOrName);
  const employeeAnimaIdlArray = [];
  if (idName === 'id') {
    const { firstName, lastName, responsibleFor } = employees
      .find(({ id }) => id === stringIdOrName);
    const employeeAnimals = mountObj(firstName, lastName, responsibleFor);
    employeeAnimaIdlArray.push(employeeAnimals);
  } else {
    const { firstName, lastName, responsibleFor } = employees
    .find(e => e.firstName === stringIdOrName || e.lastName === stringIdOrName);
    const employeeAnimals = mountObj(firstName, lastName, responsibleFor);
    employeeAnimaIdlArray.push(employeeAnimals);
  }
  return employeeAnimaIdlArray;
};


const createEmployeeAnimalsArray = (array) => {
  array.forEach(({ responsibleFor }) => {
    responsibleFor.forEach((e, index) => {
      animals.forEach(({ id, name }) => {
        if (id === e) {
          responsibleFor[index] = name;
        }
      });
    });
  });
  return array;
};

const employeeCoverage = (idOrName) => {
  if (!idOrName) {
    const obj = {};
    const employeeNameAnimalIdArray = createEmployeeNameAnimalIdArray();
    const employeeAnimalsArray = createEmployeeAnimalsArray(employeeNameAnimalIdArray);
    employeeAnimalsArray.forEach(({ fullName, responsibleFor }) => {
      obj[fullName] = responsibleFor;
    });
    return obj;
  }
  const obj = {};
  const employeeNameAnimalIdArray = createEmployeeNameAnimalIdArray(idOrName);
  const employeeAnimalsArray = createEmployeeAnimalsArray(employeeNameAnimalIdArray);
  employeeAnimalsArray.forEach(({ fullName, responsibleFor }) => {
    obj[fullName] = responsibleFor;
  });
  return obj;
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
