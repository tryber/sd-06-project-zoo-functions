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
  return ids
  .flatMap(idIndex => animals
  .filter(animal => animal.id === idIndex));
}

function animalsOlderThan(animal, age) {
  return animals
  .filter(animalOfList => animalOfList.name === animal)
  .flatMap(filteredAnimal => filteredAnimal.residents)
  .every(residentAnimals => residentAnimals.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName) ? data.employees
  .find((employee) => {
    const { firstName, lastName } = employee;
    return firstName === employeeName || lastName === employeeName;
  }) : {};
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
  const { employees } = data;
  const managers = employees.reduce((managerLi, curr) => managerLi.concat(curr.managers), []);
  return managers.some(managerId => managerId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species = 'allOfThem') {
  if (species === 'allOfThem') {
    const animalList = {};
    animals
    .forEach((animal) => {
      const { name, residents } = animal;
      animalList[name] = residents.length;
    });
    return animalList;
  }
  return animals.filter(animal => animal.name === species)[0].residents.length;
}

function verifyPrices(type) {
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = data.prices;
  let rightPrice = 0;
  if (type === 'Adult') rightPrice = adultPrice;
  if (type === 'Senior') rightPrice = seniorPrice;
  if (type === 'Child') rightPrice = childPrice;
  return rightPrice;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) return 0;
  return Object.keys(entrants)
  .reduce((acc, curr, index) => acc + (Object.values(entrants)[index] * verifyPrices(curr)), 0);
}

function createAnimalListByLocation(location) {
  return animals
  .filter(animal => animal.location === location)
  .flatMap(filteredAnimal => filteredAnimal.name);
}

function createAnimalResidentsList(location) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[animal.name] = animal.residents
    .map(resident => resident.name);
    return animalObject;
  });
}

function createSortedAnimalResidentsList(location) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[animal.name] = animal.residents
    .map(resident => resident.name).sort();
    return animalObject;
  });
}

function createAnimalResidentsListBySex(location, sex) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[animal.name] = animal.residents
    .filter(resident => resident.sex === sex)
    .map(resident => resident.name);
    return animalObject;
  });
}

function createSortedAnimalResidentsListBySex(location, sex) {
  return animals
  .filter(animal => animal.location === location)
  .map((animal) => {
    const animalObject = {};
    animalObject[animal.name] = animal.residents
    .filter(resident => resident.sex === sex)
    .map(resident => resident.name).sort();
    return animalObject;
  });
}

function parameterChecker(options) {
  if (options === undefined) options = {};
  if (options.includeNames === undefined) options.includeNames = false;
  if (options.sorted === undefined) options.sorted = false;
  if (options.sex === undefined) options.sex = 'any';
  return options;
}

function structurer(paramFn, sex) {
  const structuredResult = {};
  structuredResult.NE = paramFn('NE', sex);
  structuredResult.NW = paramFn('NW', sex);
  structuredResult.SE = paramFn('SE', sex);
  structuredResult.SW = paramFn('SW', sex);
  return structuredResult;
}

function firstSelector(includeNames, sorted, sex) {
  let result = {};
  if (includeNames && sorted && sex === 'any') {
    result = structurer(createSortedAnimalResidentsList, sex);
  } else if (includeNames && sex !== 'any' && sorted) {
    result = structurer(createSortedAnimalResidentsListBySex, sex);
  } else if (includeNames && sex !== 'any') {
    result = structurer(createAnimalResidentsListBySex, sex);
  } else {
    result = false;
  }
  return result;
}

function lastSelector(includeNames) {
  let result = {};
  if (includeNames) {
    result = structurer(createAnimalResidentsList);
  } else {
    result = structurer(createAnimalListByLocation);
  }
  return result;
}

function animalMap(options) {
  const { includeNames, sorted, sex } = parameterChecker(options);
  let result = firstSelector(includeNames, sorted, sex);
  if (result === false) {
    result = lastSelector(includeNames);
  }
  return result;
}

function hourConverter(hour) {
  let result = '';
  if (hour > 12) {
    result = `${hour - 12}pm`;
  } else {
    result = `${hour}am`;
  }
  return result;
}

function createDayTime() {
  const daysList = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const { hours } = data;
  const result = {};

  for (let i = 0; i < daysList.length; i += 1) {
    const open = hourConverter(hours[daysList[i]].open);
    const close = hourConverter(hours[daysList[i]].close);
    result[daysList[i]] = `Open from ${open} until ${close}`;
  }
  result.Monday = 'CLOSED';
  return result;
}

function schedule(dayName) {
  let result = {};
  if (dayName === undefined) {
    result = createDayTime();
  } else if (dayName === 'Monday') {
    result.Monday = 'CLOSED';
  } else {
    const open = hourConverter(data.hours[dayName].open);
    const close = hourConverter(data.hours[dayName].close);
    result[dayName] = `Open from ${open} until ${close}`;
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const { employees } = data;

  const foundAnimalsList = employees
  .find(employee => employee.id === id).responsibleFor
  .map(currentAnimal => animals.find(animal => animal.id === currentAnimal));

  const animalList = [];

  foundAnimalsList.forEach((animal) => {
    animal.residents
    .forEach(resident => animalList.push([resident.name, resident.sex, resident.age]));
  });

  const animalsWithTheirAges = animalList;

  const biggerAge = animalsWithTheirAges
  .reduce((acc, currentAnimal) => acc
  .concat(currentAnimal[2]), [])
  .sort((a, b) => b - a)[0];

  return animalsWithTheirAges.find(animal => animal[2] === biggerAge);
}

function increasePrices(percentage) {
  const { prices } = data;
  Object.keys(prices)
  .forEach((price) => {
    prices[price] = (Math.round((prices[price] * (1 + (percentage / 100)) * 100)) / 100);
  });
}

function employeeCoverage(idOrName = 'allOfThem') {
  const fetchedList = data.employees.map((employee) => {
    employee.animalsList = employee.responsibleFor
    .map(animalId => animals
      .find(animal => animal.id === animalId).name)
    return employee;
  });

  let result = {};
  
  if (idOrName === 'allOfThem') {
    fetchedList.forEach((employee) => {
      result[`${employee.firstName} ${employee.lastName}`] = employee.animalsList;
    });
  } else {
    fetchedList.forEach(employee => {
      const { firstName, lastName, id, animalsList } = employee;
      if (firstName === idOrName || lastName === idOrName || id === idOrName) {
        result[`${firstName} ${lastName}`] = animalsList;
      }
    });
  }
  
  return result;
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
