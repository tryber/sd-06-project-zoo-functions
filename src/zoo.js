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

const animals = data.animals;
const employees = data.employees;
const prices = data.prices;
const calendar = data.hours;


function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  } else if (ids.length === 1) {
    const uniqueId = ids[0];
    return animals.filter(element => element.id === uniqueId);
  } else if (ids.length > 1) {
    const output = [];
    animals.forEach((animal) => {
      ids.forEach((id) => {
        if (animal.id === id) {
          output.push(animal);
        }
      });
    });
    return output;
  }
  return [];
}

console.log('-----2------');

function animalsOlderThan(animal, age) {
  const testedAnimals = animals.find(element => element.name === animal);
  const testedResidents = testedAnimals.residents;
  const checkAnimalsAge = testedResidents.every(element => element.age > age);
  return checkAnimalsAge;
}

console.log('-----3------');

function employeeByName(employee) {
  const employeesFirstName = employees.map(element => element.firstName);
  const employeesLastName = employees.map(element => element.lastName);
  if (!employee) {
    return {};
  } else if (employeesFirstName.includes(employee)) {
    return employees.find(element => element.firstName === employee);
  } else if (employeesLastName.includes(employee)) {
    return employees.find(element => element.lastName === employee);
  }
  return {};
}

console.log('-----4------');

function createEmployee(personal, associated) {
  const newEmployee = Object.assign(personal);
  Object.assign(newEmployee, associated);
  return newEmployee;
}

console.log('-----5------');

function isManager(id) {
  const managersIds = employees.flatMap(element => element.managers);
  if (managersIds.includes(id)) {
    return true;
  }
  return false;
}

console.log('-----6------');

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

console.log('-----7------');

function animalCount(species = 0) {
  if (species === 0) {
    const output = {};
    animals.forEach((animal) => {
      const animalName = animal.name;
      const animalCounter = animal.residents.length;
      output[animalName] = animalCounter;
    });
    return output;
  }
  const requiredAnimal = animals.find(animal => animal.name === species);
  const requiredAnimalCount = requiredAnimal.residents.length;
  return requiredAnimalCount;
}

console.log('-----8------');

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entrantKeys = Object.keys(entrants);
  const entrantValues = Object.values(entrants);
  const toPay = entrantKeys.reduce((acc, current, index) => {
    const currentCalc = prices[current] * entrantValues[index];
    return acc + currentCalc;
  }, 0);
  return toPay;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  const output = {};
  const { includeNames = false, sorted = false, sex = '' } =
  options === undefined ? { includeNames: false, sorted: false, sex: '' } : options;
  if (includeNames === true) {
    locations.forEach((region) => {
      (output[region]) = animals
      .filter(animal => animal.location === region).map((animalObject) => {
        const animalsBySpecie = {};
        let resAnimal = animalObject.residents;
        if (sex !== '') resAnimal = resAnimal.filter(resident => resident.sex === sex);
        animalsBySpecie[animalObject.name] = resAnimal.map(subject => subject.name);
        if (sorted === true) animalsBySpecie[animalObject.name].sort();
        return animalsBySpecie;
      });
    });
  }
  if (!options || includeNames === false) {
    locations.forEach((region) => {
      output[region] = animals.filter(animal => animal.location === region).map(mA => mA.name);
    });
  }
  return output;
}

console.log('-----10------');

function schedule(dayName) {
  let output = {};
  const calendarKeys = Object.keys(calendar);
  const calendarValues = Object.values(calendar);
  if (calendarValues[0].close > 12) {
    calendarValues.forEach((key, index) => {
      calendarValues[index].close -= 12;
    });
  }
  calendarKeys.forEach((key, index) => {
    output[key] = `Open from ${calendarValues[index].open}am until ${calendarValues[index].close}pm`;
    if (calendarValues[index].open <= 0 && calendarValues[index].open <= 0) {
      output[key] = 'CLOSED';
    }
  });
  if (dayName !== undefined) {
    output = { [dayName]: output[dayName] };
  }
  return output;
}

console.log('-----11------');

function oldestFromFirstSpecies(id) {
  const targetAnimalId = employees.find(emp => emp.id === id).responsibleFor[0];
  const targetSpecieResidents = animals.find(animal => animal.id === targetAnimalId).residents;
  const targetAnimalAge = targetSpecieResidents.reduce((acc, animal, index) => {
    if (animal.age > acc.age) {
      return animal.age;
    } return acc;
  });
  const targetAnimalObj = targetSpecieResidents.find(animal => animal.age === targetAnimalAge);
  const output = Object.values(targetAnimalObj);
  return output;
}

console.log('-----12------');

function increasePrices(percentage) {
  const newPrices = data.prices;
  const newPricesKeys = Object.keys(newPrices);
  const increase = parseFloat(`1.${percentage}`);
  newPricesKeys.forEach((key, index) => {
    newPrices[key] = Math.round((newPrices[key] * increase) * 100) / 100;
  });
  data.prices = newPrices;
  return data.prices;
}

console.log('-----13------');

const employeesNames = employees.map(employee => employee.firstName);
const employeesLastNames = employees.map(employee => employee.lastName);
const employeesFullNames = [];
employeesNames.forEach((employee, index) => {
  employeesFullNames[index] = `${employeesNames[index]} ${employeesLastNames[index]}`;
});

function employeeCoverageEmpty() {
  const employeeResponsability = employees.map(employee => employee.responsibleFor);

  employeeResponsability.forEach((responsibilities, index) => {
    employeeResponsability[index] = [];
    responsibilities.forEach((animalId) => {
      const animalName = animals.find(animal => animal.id === animalId).name;
      employeeResponsability[index].push(animalName);
    });
  });
  const output = {};
  employeesFullNames.forEach((employee, index) => {
    output[employee] = employeeResponsability[index];
  });
  return output;
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employeeCoverageEmpty();
  }

  return 'teste';
}

console.log(employeeCoverage());

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
