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
  const foundAnimal = [];
  if (ids) {
    ids.forEach(id => foundAnimal.push(
      ...data.animals.filter(animal => animal.id === id),
    ));
  }

  return foundAnimal;
}

function animalsOlderThan(animal, age) {
  const checkAllAnimals = data.animals
    .find(zooAnimal => zooAnimal.name === animal);
  const areAllAnimalsOlder = checkAllAnimals.residents
    .every(resident => resident.age > age);

  return areAllAnimalsOlder;
}

function employeeByName(employeeName) {
  let happyEmployee = {};
  if (employeeName) {
    happyEmployee = data.employees.find(thatEmployee =>
      thatEmployee.firstName === employeeName ||
      thatEmployee.lastName === employeeName,
    );
  }

  return happyEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newHappiestEmployeeEva = { ...personalInfo, ...associatedWith };
  const newHappyEmplyoeeData = data.employees.concat(newHappiestEmployeeEva);

  return newHappyEmplyoeeData[newHappyEmplyoeeData.length - 1];
}

function isManager(id) {
  const areYouABoss = data.employees.find(
    bossy => bossy.managers.some(idManager => idManager === id),
  );
  if (!areYouABoss) return false;

  return true;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lookANewEmployeeHasBegun = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const newEmployeeMemory = data.employees.push(lookANewEmployeeHasBegun);

  return newEmployeeMemory;
}

function animalCount(species) {
  if (!species) {
    const allSpeciesNameTotal = {};
    data.animals.forEach(function (zooAnimal) {
      allSpeciesNameTotal[zooAnimal.name] = zooAnimal.residents.length;
    });

    return allSpeciesNameTotal;
  }

  const uniqueAnimal = data.animals.find(aniZoo => aniZoo.name === species);

  return uniqueAnimal.residents.length;
}

function entryCalculator(entrants) {
  let totalPrice = 0;
  if (entrants) {
    Object.keys(entrants).forEach(function (ticketPerson) {
      totalPrice += data.prices[ticketPerson] * entrants[ticketPerson];
    });
  }

  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const zooScheduleComplete = {};
  const zooWeekDays = Object.keys(data.hours);
  zooWeekDays.forEach((daysOfWeek) => {
    const zooOpening = data.hours[daysOfWeek];
    if (zooOpening.open === 0) {
      zooScheduleComplete[daysOfWeek] = 'CLOSED';
    } else {
      zooScheduleComplete[daysOfWeek] = `Open from ${zooOpening.open}am until ${zooOpening.close - 12}pm`;
    }
  });
  if (!dayName) return zooScheduleComplete;

  return { [dayName]: zooScheduleComplete[dayName] };
}

function oldestFromFirstSpecies(id) {
  const happyEmployeeId = data.employees.find(employee => employee.id === id);
  const idAnimalResponsibleFor = happyEmployeeId.responsibleFor[0];
  const animalWholeInfo = data.animals.find(animal =>
    animal.id === idAnimalResponsibleFor);
  const allAnimalsOldestToYoungestList = animalWholeInfo.residents.sort((resident1, resident2) =>
  resident2.age - resident1.age);
  const { name, sex, age } = allAnimalsOldestToYoungestList[0];
  return [name, sex, age];
}

function ceilPrecised(number, precision) {
  const power = 10 ** precision;

  return Math.ceil(number * power) / power;
}
// Encontrei essa função para realizar o arredondamento dos valores dos centavos,
// no site abaixo [dirask]:
// https://dirask.com/posts/JavaScript-Math-ceil-method-example-OpBeqD

function increasePrices(percentage) {
  const actualPrice = data.prices;
  const newPricesRipOff = [];
  Object.values(actualPrice).forEach(function (prices) {
    newPricesRipOff.push(ceilPrecised(prices += prices * (percentage / 100), 2));
  });
  Object.keys(actualPrice).forEach(function (person, index) {
    actualPrice[person] = newPricesRipOff[index];
  });

  return actualPrice;
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
