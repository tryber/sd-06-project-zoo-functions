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
    console.log('teste 0 ids');
    return [];
  } else if (ids.length === 1) {
    const uniqueId = ids[0];
    console.log('----------');
    console.log(`teste 1 ID: ${ids}`);
    return animals.filter(element => element.id === uniqueId);
  } else if (ids.length > 1) {
    console.log('----------');
    console.log(`teste +1 ID: ${ids}`);
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

console.log(animalsByIds());
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));
console.log('-----2------');

function animalsOlderThan(animal, age) {
  const testedAnimals = animals.find(element => element.name === animal);
  const testedResidents = testedAnimals.residents;
  const checkAnimalsAge = testedResidents.every(element => element.age > age);
  return checkAnimalsAge;
}

console.log(animalsOlderThan('otters', 7));
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

console.log(employeeByName());
console.log(employeeByName('Nigel'));
console.log(employeeByName('Wishart'));
console.log('-----4------');


const personalInfo = {
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
};

const associatedWith = {
  managers: [
    'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992',
  ],
  responsibleFor: [
    '0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5',
  ],
};

function createEmployee(personal, associated) {
  const newEmployee = Object.assign(personal);
  Object.assign(newEmployee, associated);
  return newEmployee;
}

console.log(createEmployee(personalInfo, associatedWith));
console.log('-----5------');

function isManager(id) {
  const managersIds = employees.flatMap(element => element.managers);
  if (managersIds.includes(id)) {
    return true;
  }
  return false;
}

console.log(isManager());
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

console.log(animalCount());
console.log(animalCount('lions'));
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

console.log(entryCalculator());
console.log(entryCalculator({}));
console.log(entryCalculator({ Adult: 2, Child: 3, Senior: 1 }));
console.log('-----9------');

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

console.log('Animal Map');
console.log('---NO OPTIONS---');
console.log(animalMap());
console.log('---IncludeNames = true---');
console.log(animalMap({ includeNames: true }));
console.log('---IncludeNames = true, sorted = true---');
console.log(animalMap({ includeNames: true, sorted: true }));
console.log('---IncludeNames = true, sex = female---');
console.log(animalMap({ includeNames: true, sex: 'female' }));
console.log('---IncludeNames = true, sex = male, sorted: true---');
console.log(animalMap({ includeNames: true, sex: 'female', sorted: true }));
console.log('---sex = female---');
console.log(animalMap({ sex: 'female', sorted: true }));

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

console.log(schedule());
console.log(schedule('Monday'));

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

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  // seu código aqui
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
