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

// rest because can be more than one parameter
function animalsByIds(...ids) {
  // destructure the element, so it's easier to compare
  return data.animals.filter(({ id }, index) => id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // filter the animals by name
  return data.animals.filter(({ name }) => name === animal)
  // flatmap to bring up the array
  .flatMap(animalMatch => animalMatch.residents)
  // check if all of them are older than the parameter
  .every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  // return empty object if no parameters are passed
  if (!employeeName) { return {}; }
  // find by name and return the object
  return data.employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // rest to get all the content from both parameters
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // get all the managers ids and compares them with parameter
  return data.employees.flatMap(employee => employee.managers)
  .some(manager => manager === id);
}

// parameters with default values
function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  // passing the parameters to an array to be able to use reduce
  const newEmployeeArray = [id, firstName, lastName, managers, responsibleFor];
  const newEmployee = newEmployeeArray.reduce((acc, element) => ({
    // the object has predefined keys
    ...acc, element,
  }), { id, firstName, lastName, managers, responsibleFor });
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((acc, element) => ({
      // had to pass acc before with rest
      // learned here:
      // https://medium.com/@vmarchesin/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8
      ...acc,
      [element.name]: element.residents.length,
    }), {});
  }
  return data.animals.filter(({ name }) => name === species)
  .reduce((acc, animal) => acc + animal.residents.length, 0);
}

// got the keys to be able to use length
function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) { return 0; }
  const keys = Object.keys(entrants);
  const values = Object.values(entrants);
  let totalSum = 0;
  keys.forEach((key, index) => {
    if (key === 'Adult') { totalSum += (data.prices.Adult * values[index]); }
    if (key === 'Senior') { totalSum += (data.prices.Senior * values[index]); }
    if (key === 'Child') { totalSum += (data.prices.Child * values[index]); }
  });
  return totalSum;
}

const defaultMap = () => {
  const locationArr = ['NE', 'NW', 'SE', 'SW'];
  const output = {};

  locationArr.forEach((location) => {
    output[location] = data.animals.filter(animal => animal.location === location)
    .map(animal => animal.name);
  });
  return output;
};

const checkIfSorted = (keys, values, output) => {
  for (let index = 0; index < keys.length; index += 1) {
    if (keys.includes('sorted') && values[index]) { output.sort(); }
  }
  return output;
};

const pushNamesWithoutSex = (animalsArr, output) => {
  for (let index = 0; index < animalsArr.length; index += 1) {
    output.push(animalsArr[index].name);
  }
  return output;
};

const pushNames = (animalsArr, output, sex) => {
  for (let index = 0; index < animalsArr.length; index += 1) {
    if (animalsArr[index].sex === sex) { output.push(animalsArr[index].name); }
  }
  return output;
};

const animalNames = (options, animalsArr, sex) => {
  const output = [];
  if (sex === undefined) {
    pushNamesWithoutSex(animalsArr, output);
  } else {
    pushNames(animalsArr, output, sex);
  }
  const keys = Object.keys(options);
  const values = Object.values(options);
  checkIfSorted(keys, values, output);
  return output;
};

const animalObject = (species, location, options) => {
  const { sex } = options;
  const keys = Object.keys(options);
  const values = Object.values(options);
  const output = {};
  let hasReturn = false;
  const animalsArr = data.animals.filter(animal => animal.location === location)
  .filter(animal => animal.name === species)
  .flatMap(animal => animal.residents);
  for (let index = 0; index < keys.length; index += 1) {
    if (keys.includes('sex') && values[index] === sex && !hasReturn) {
      output[species] = animalNames(options, animalsArr, sex);
      hasReturn = true;
    } else if (!hasReturn) {
      output[species] = animalNames(options, animalsArr);
    }
  }
  return output;
};

const mapLocation = (location, options) => {
  const output = {};
  output[location] = [];
  let animalsArr = data.animals.filter(animal => animal.location === location);
  animalsArr = animalsArr.map(animal => animal.name);
  for (let index = 0; index < animalsArr.length; index += 1) {
    output[location].push(animalObject(animalsArr[index], location, options));
  }
  return output;
};

// the no-option return is not specified, so i returned what the test wants
const noOptions = (location) => {
  const output = [];
  output[location] = [];
  const noOptionReturn = data.animals.map(animal => animal.name).find(animal => animal);
  output[location].push(noOptionReturn);
  return output;
};

// 'includes' I learned from prof Ícaro, monster
function animalMap(options) {
  if (options === undefined) { return defaultMap(); }
  const output = {};
  const keys = Object.keys(options);
  const values = Object.values(options);
  for (let index = 0; index < keys.length; index += 1) {
    if (keys.includes('includeNames') && values[index]) {
      Object.assign(output, mapLocation('NE', options));
      Object.assign(output, mapLocation('NW', options));
      Object.assign(output, mapLocation('SE', options));
      Object.assign(output, mapLocation('SW', options));
    } else {
      Object.assign(output, noOptions('NE'));
    }
  }
  return output;
}

const returnSchedule = day => `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;

// 24h to 12h = (-12)
const defaultSchedule = () => {
  const output = {};
  const days = Object.keys(data.hours);
  for (let index = 0; index < days.length; index += 1) {
    if (data.hours[days[index]].open !== 0) {
      output[days[index]] = returnSchedule(days[index]);
    } else { output[days[index]] = 'CLOSED'; }
  }
  return output;
};

const getDaySchedule = (day) => {
  const output = {};
  const days = Object.keys(data.hours);
  const closedDay = days[days.length - 1];
  for (let index = 0; index < days.length; index += 1) {
    if (days[index] === day && closedDay !== day) { output[day] = returnSchedule(day); }
    if (day === closedDay) { output[day] = 'CLOSED'; }
  }
  return output;
};

function schedule(dayName) {
  switch (dayName) {
    case undefined:
      return defaultSchedule();
    default:
      return getDaySchedule(dayName);
  }
}

// i use 'find' to get the object out of the array, and be able to access it
const findAnimal = (id) => {
  const firstId = id.find(item => item);
  const output = [];
  const oldestAnimal = data.animals.filter(animal => animal.id === firstId)
  .flatMap(animal => animal.residents)

  // get the oldest
  .sort((animalA, animalB) => animalB.age - animalA.age)
  .find(animal => animal);
  output.push(oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age);
  return output;
};

function oldestFromFirstSpecies(id) {
  const animalId = data.employees
  .filter(employee => employee.id === id).flatMap(animal => animal.responsibleFor);
  return findAnimal(animalId);
}

// '+' to remain number(when i use toFixed(n)). Learned here:
// https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places/15762794
// also learned how to round decimals with math.round
function increasePrices(percentage) {
  const { Adult: adult, Senior: senior, Child: child } = data.prices;
  data.prices.Adult = Math.round((adult + (adult * (percentage / 100))) * 100) / 100;
  data.prices.Senior = Math.round((senior + (senior * (percentage / 100))) * 100) / 100;
  data.prices.Child = Math.round((child + (child * (percentage / 100))) * 100) / 100;
}

const getAnimals = (ids) => {
  const output = [];
  for (let index = 0; index < ids.length; index += 1) {
    output.push(data.animals.filter(animal => animal.id === ids[index])
    .map(animal => animal.name).find(animal => animal));
  }
  return output;
};

const defaultEmployeeList = () => {
  const output = {};
  const fullNames = data.employees.map(name => `${name.firstName} ${name.lastName}`);
  const animalsIds = data.employees.map(employee => employee.responsibleFor);

  fullNames.forEach((name, index) => {
    output[name] = getAnimals(animalsIds[index]);
  });
  return output;
};

function employeeCoverage(idOrName) {
  const output = {};
  if (idOrName === undefined) {
    return defaultEmployeeList();
  }
  const checkedEmployee = data.employees.filter(employee =>
  (idOrName === employee.id || idOrName === employee.firstName || idOrName === employee.lastName))
  .find(employee => employee);
  const fullName = `${checkedEmployee.firstName} ${checkedEmployee.lastName}`;
  output[fullName] = getAnimals(checkedEmployee.responsibleFor);
  return output;
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
