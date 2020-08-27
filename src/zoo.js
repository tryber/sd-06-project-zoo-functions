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

function entryCalculator(entrants) {
  if (!entrants) { return 0; }
  const { Adult: adult, Senior: senior, Child: child } = data.prices;
  const keys = Object.keys(entrants);
  return keys.reduce((acc, element) => {
    if (element === 'Adult') acc += (adult * entrants.Adult);
    if (element === 'Senior') acc += (senior * entrants.Senior);
    if (element === 'Child') acc += (child * entrants.Child);
    return acc;
  }, 0);
}

function getResidentsNames(species, options) {
  const { sorted, sex } = options;
  const output = data.animals.filter(animal => animal.name === species)
  .flatMap(animal => animal.residents);
  if (sex && !sorted) {
    return output.filter(resident => resident.sex === sex)
    .map(resident => resident.name);
  }
  if (sex && sorted) {
    return output.filter(resident => resident.sex === sex)
  .map(resident => resident.name).sort();
  }
  if (!sex && sorted) { return output.map(resident => resident.name).sort(); }
  return output.map(resident => resident.name);
}

function getAnimalNameAsKey(location, options) {
  const output = [];
  let animalObject = {};
  data.animals.filter(animal => animal.location === location)
  .map(animal => animal.name).forEach((animal) => {
    // tests if has 'includeNames' option
    if (!Object.keys(options).includes('includeNames')) { output.push(animal); return output; }
    animalObject[animal] = getResidentsNames(animal, options);
    output.push(animalObject);
    animalObject = {};
    return output;
  });
  return output;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) {
    return locations.reduce((acc, location) => ({
      ...acc,
      [location]: data.animals.filter(animal => animal.location === location)
      .map(animal => animal.name),
    }), {});
  }
  return locations.reduce((acc, location) => ({
    ...acc, [location]: getAnimalNameAsKey(location, options),
  }), {});
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
  .filter(employee => employee.id === id)
  .flatMap(animal => animal.responsibleFor);
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
