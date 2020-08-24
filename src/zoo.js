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

const { animals: animalList } = data;
const { employees: employeeList } = data;
const { hours: hoursList } = data;
const { prices: pricesList } = data;


function animalsByIds(...ids) {
  const returnedAnimals = [];
  if (ids.length === 0) return returnedAnimals;
  for (let index = 0; index < ids.length; index += 1) {
    returnedAnimals.push(animalList.find(animal => animal.id === ids[index]));
  }
  return returnedAnimals;
}

function animalsOlderThan(animal, age) {
  const desiredAnimal = animalList.find(searchAnimal => searchAnimal.name === animal);
  const olderAnimals = desiredAnimal.residents.filter(resident => resident.age >= age);
  return olderAnimals.length === desiredAnimal.residents.length;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const desiredEmployee = employeeList
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return desiredEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  const managersList = employeeList.map(employee => employee.managers);
  const isAManager = managersList.find(managers => managers.includes(id));
  if (isAManager === undefined) return false;
  return true;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addedEmployee = { id, firstName, lastName, managers, responsibleFor };
  employeeList.push(addedEmployee);
}

function animalCount(species) {
  if (!species) {
    const animalCountObject = {};
    animalList.forEach((animal) => {
      const animalName = animal.name;
      const animalPopulation = animal.residents.length;
      animalCountObject[animalName] = animalPopulation;
    });
    return animalCountObject;
  }
  const searchedAnimal = animalList.find(animal => animal.name === species);
  return searchedAnimal.residents.length;
}

function entryCalculator(entrants = {}) {
  if (entrants === {}) return 0;
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = pricesList;
  const { Adult: adults = 0, Child: children = 0, Senior: seniors = 0 } = entrants;
  const adultEntry = adults * adultPrice;
  const seniorEntry = seniors * seniorPrice;
  const childEntry = children * childPrice;
  return (adultEntry + seniorEntry + childEntry);
}

const animalsWithoutOptions = (someObject) => {
  animalList.forEach((animal) => {
    someObject[animal.location].push(animal.name);
  });
};

function animalMap(options) {
  const mapObject = { NE: [], NW: [], SE: [], SW: [] };
  if (!options) {
    animalsWithoutOptions(mapObject);
    return mapObject;
  }
  const { includeNames, sort, sex } = options;
  if (!includeNames) {
    animalsWithoutOptions(mapObject);
    return mapObject;
  }
  animalList.forEach((animal) => {
    const animalObject = {};
    animalObject[animal.name] = animal.residents.map(individual => individual.name);
    mapObject[animal.location].push(animalObject);
  });
  if (sort) {
    Object.keys(mapObject).forEach(location => mapObject[location]
      .forEach((mappedAnimal) => {
        Object.values(mappedAnimal)[0].sort();
      }));
  }

  return mapObject;
}

console.log(animalMap({ includeNames: true, sort: true, sex: 'male' }).NE);

function schedule(dayName) {
  const scheduleObj = {};
  const displayHours = (requiredDay) => {
    if (hoursList[requiredDay].open !== hoursList[requiredDay].close) {
      scheduleObj[requiredDay] = `Open from ${hoursList[requiredDay].open}am until ${hoursList[requiredDay].close - 12}pm`;
    } else scheduleObj[requiredDay] = 'CLOSED';
  };
  if (!dayName) {
    const days = Object.keys(hoursList);
    days.forEach(day => displayHours(day));
  } else displayHours(dayName);
  return scheduleObj;
}

function oldestFromFirstSpecies(id) {
  const employeeData = employeeList.find(requiredEmployee => requiredEmployee.id === id);
  const { responsibleFor: caredAnimals } = employeeData;
  const caredAnimalsData = animalList.find(animal => animal.id === caredAnimals[0]);
  const oldestAnimalData = caredAnimalsData.residents
    .reduce((oldest, newAnimal) => {
      if (oldest.age > newAnimal.age) return oldest;
      return newAnimal;
    },
  );
  const desiredAnimalData = Object.values(oldestAnimalData);
  return desiredAnimalData;
}

function increasePrices(percentage) {
  const ticketType = Object.keys(pricesList);
  ticketType.forEach((type) => {
    pricesList[type] = (Math.round((pricesList[type] * 100 * (1 + (percentage / 100))))) / 100;
  });
  return pricesList;
}

function employeeCoverage(idOrName) {
  const employeeAndDependents = {};
  const employeeFullName = selectedEmployee => `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
  const employeeDependents = responsibleEmployee => responsibleEmployee.responsibleFor
    .map(desiredId => animalList.find(inspectedAnimal => inspectedAnimal.id === desiredId).name);
  if (!idOrName) {
    employeeList
      .forEach((employee) => {
        employeeAndDependents[employeeFullName(employee)] = employeeDependents(employee);
      });
    return employeeAndDependents;
  }
  const chosenEmployee = employeeList
    .find(desiredEmployee => Object.values(desiredEmployee).includes(idOrName));
  employeeAndDependents[employeeFullName(chosenEmployee)] = employeeDependents(chosenEmployee);
  return employeeAndDependents;
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
