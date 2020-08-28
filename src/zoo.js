const data = require('./data');
const {
  animals, employees, prices, hours,
} = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(element => ids.includes(element.id));
}
function animalsOlderThan(animalName, age) {
  return animals
    .filter(element => element.name === animalName)[0]
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  return (
    employees.filter(
      (employee) => employee.firstName === employeeName
        || employee.lastName === employeeName,
    )[0] || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(employeeId) {
  return employees
    .flatMap(employee => employee.managers)
    .some(managerId => managerId === employeeId);
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species = animals.map(animal => animal.name)) {
  if (typeof species === 'string') {
    return animals
      .filter(animal => animal.name === species)
      .map(animal => animal.residents.length)
      .toString();
  }
  const animalsCounted = {};
  animals
    .filter(animal => species.some(eachAnimalName => eachAnimalName === animal.name))
    .forEach(function (animalName) {
      animalsCounted[animalName.name] = animalName.residents.length;
    });
  return animalsCounted;
}

function entryCalculator(entrants = {}) {
  if (Object.keys(entrants).toString() !== '') {
    return Object.entries(entrants)
      .map(element => prices[element[0]] * element[1])
      .reduce((acc, element) => element + acc);
  }
  return 0;
}

function includeAnimalName(animalsbyRegion) {
  const name = animalsbyRegion.map(function (animalArray) {
    const specie = {};
    specie[animalArray] = getAnimalName(animalArray);
    return specie;
  }).flat(1);
  return name;
}

function includeNames(object, locals) {
  locals.forEach(function (local) {
    object[local] = includeAnimalName(object[local]);
  });
}

function filterAnimalsByGender(sex, arrayOfAnimals) {
  return arrayOfAnimals.flatMap(function (animal) {
    const animalName = {};
    animalName[Object.keys(animal)] = getAnimalNameByGenderAndSpecie(Object.keys(animal)[0], sex);
    return animalName;
  });
}

function filterSex(sex, object, locals) {
  locals.forEach(function (local) { object[local] = filterAnimalsByGender(sex, object[local]); });
}

function sortAnimals(arrayOfanimals) {
  return arrayOfanimals.map((animalObject) => {
    const newObject = {};
    newObject[Object.keys(animalObject)] = animalObject[Object.keys(animalObject)].sort();
    return newObject;
  });
}

function sorted(object, locals) {
  locals.forEach(function (local) {
    object[local] = sortAnimals(object[local]);
  });
}

function displayConfig(animalMapDisplay, locals, options) {
  if (options.includeNames) {
    includeNames(animalMapDisplay, locals);
    if (options.sex) {
      filterSex(options.sex, animalMapDisplay, locals);
    }
    if (options.sorted) {
      sorted(animalMapDisplay, locals);
    }
  }
}

function getAnimalsByLocation(local) {
  const animalMapDisplay = animals
    .filter(animal => animal.location === local)
    .map(animal => animal.name);
  return animalMapDisplay;
}

function getAnimalName(specie) {
  return animals
    .filter(animalData => animalData.name === specie)
    .flatMap(animalObject => animalObject.residents).map(element => element.name);
}

function getAnimalNameByGenderAndSpecie(specie, sex) {
  return animals.filter(animal => animal.name === specie)
    .flatMap(animalObject => animalObject.residents).filter(element => element.sex === sex)
    .map(element => element.name);
}

function animalMap(options = {}) {
  const locals = ['NE', 'NW', 'SE', 'SW'];
  const animalMapObject = {};
  locals.forEach((element) => {
    animalMapObject[element] = getAnimalsByLocation(element, options);
  });
  displayConfig(animalMapObject, locals, options);
  return animalMapObject;
}

function setScheduleMap() {
  const scheduleMap = {};
  Object.entries(hours).forEach(
    function (entrie) {
      (scheduleMap[entrie[0]] = `Open from ${entrie[1].open}am until ${
        entrie[1].close - 12
      }pm`);
    },
  );
  scheduleMap.Monday = 'CLOSED';
  return scheduleMap;
}

function getDaySchedule(dayName, scheduleMap) {
  const daySchedule = {};
  daySchedule[dayName] = scheduleMap[dayName];
  return daySchedule;
}

function schedule(dayName) {
  const scheduleMap = setScheduleMap();
  if (dayName) {
    const daySchedule = getDaySchedule(dayName, scheduleMap);
    return daySchedule;
  }
  return scheduleMap;
}

function getSpecieNameById(animalId) {
  return animals.filter(animal => animal.id === animalId)[0];
}

function getOlder(arrayOfAnimals) {
  let age = 0;
  arrayOfAnimals.forEach(function (animal) {
    if (animal.age > age) {
      age = animal.age;
    }
  });
  return arrayOfAnimals.filter(animal => animal.age === age);
}

function getAnimalsIdsByEmployeeId(employeeId) {
  return employees
    .filter(employee => employee.id === employeeId)
    .flatMap(employee => employee.responsibleFor);
}

function oldestFromFirstSpecies(employeeID) {
  const [firstAnimalId] = getAnimalsIdsByEmployeeId(employeeID);
  const { residents } = getSpecieNameById(firstAnimalId);
  const older = getOlder(residents)[0];
  return [older.name, older.sex, older.age];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach((entries) => {
    prices[entries[0]] = Math.ceil(entries[1] * (1 + percentage / 100) * 100) / 100;
  });
}

function getAnimalsNameByEmployeeName(employeeName) {
  return employees
    .filter(
      employee => employeeName === `${employee.firstName} ${employee.lastName}`,
    )
    .flatMap(employee => employee.responsibleFor.flatMap(animalId => animalsByIds(animalId)
      .flatMap(animal => animal.name)));
}
function coverageMap() {
  const employeees = employees.map(
    employee => `${employee.firstName} ${employee.lastName}`,
  );
  const map = {};
  employeees.forEach(
    function (employee) { (map[employee] = getAnimalsNameByEmployeeName(employee)); },
  );
  return map;
}

function getEmployeeFullNameById(id) {
  return employees
    .filter(employee => employee.id === id)
    .map(employee => `${employee.firstName} ${employee.lastName}`)[0];
}

function searchEmployeeInMap(name, map) {
  const [employee, arrayOfanimals] = Object.entries(map)
    .filter(entrie => entrie[0] === name)
    .flat(1);
  const result = {};
  result[employee] = arrayOfanimals;
  return result;
}

function employeeCoverage(idOrName = 0) {
  const employeeCoverageMap = coverageMap();
  if (idOrName.length >= 35) {
    return searchEmployeeInMap(
      getEmployeeFullNameById(idOrName),
      employeeCoverageMap,
    );
  } if (idOrName) {
    return searchEmployeeInMap(
      `${employeeByName(idOrName).firstName} ${
        employeeByName(idOrName).lastName
      }`,
      employeeCoverageMap,
    );
  }
  return employeeCoverageMap;
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
