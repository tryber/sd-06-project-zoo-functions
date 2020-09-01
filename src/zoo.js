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
const { animals, employees, prices } = require('./data');

// build function using spread operator;
function animalsByIds(...ids) {
  // create const to represent all animals
  // const animals = data.animals;
  // const to receive data from filter. I decided use filter after trying many times using if's, with .maps. I read the mozilla documentation on .filter () and identified that the return of this function did exactly what I needed, completely. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  const animalById = animals.filter(({ id }, index) => id === ids[index]);
  return animalById;
}


function animalsOlderThan(animalName, animalAge) {
  const animalByNameAndAge = animals
    .find(({ name }) => name === animalName)
    .residents.every(({ age }) => age >= animalAge);
  return animalByNameAndAge;
}

function employeeByName(employeeName) {
  // condition to test if have parameter in function;
  if (!employeeName) {
    return {};
  }
  // create const to receive function to find name by first or last name.
  // It was necessary to use find because the return needed to be an employeeCoverageObject;
  const employeeByFirstOrLastName = employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);

  return employeeByFirstOrLastName;
}

function createEmployee(personalInfo, associatedWith) {
  // using spread operator to copy data and create a new employeeCoverageObject;
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // necessary use .flatmap to transform all data in just one array;
  // Using .map the result is a Array of arrays;
  const findManager = employees
    .flatMap(employee => employee.managers)
    .some(manager => manager === id);

  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // cretaing employeeCoverageObject using parameters;
  const addNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  // adding employeeCoverageObject in employees array;
  const newEmployeeAdded = employees.push(addNewEmployee);
  return newEmployeeAdded;
}

function animalCount(species) {
  if (!species) {
    const employeeCoverageObject = {};
    animals.forEach(({ name, residents }) => (employeeCoverageObject[name] = residents.length));
    return employeeCoverageObject;
  }
  const animalSpecieFilter = animals
  .filter(({ name }) => name === species)
  .reduce((acc, animal) => acc + animal.residents.length, 0);

  return animalSpecieFilter;
}

function entryCalculator(entrants) {
  // verify if entrants is empty;
  if (!entrants) { return 0; }
  // separate keys of entrants;
  const personKind = Object.keys(entrants);
  // separate values of entrants;
  const personAmount = Object.values(entrants);
  // connecting keys to prices and calculate the total price;
  const calculate = personKind.reduce((accumulator, keys, index) => {
    const totalPrice = prices[keys] * personAmount[index];
    return accumulator + totalPrice;
  }, 0);

  return calculate;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(ids) {
  const searchEmployee = employees.find(({ id }) => id === ids);
  const employeeResponsibleFor = searchEmployee.responsibleFor[0];
  const animalSpeciesInfo = animals.find(({ id }) => id === employeeResponsibleFor);
  // The 'oldest' was defined to start the comparison;
  let oldest = 0;
  // create let to receive final result;
  let firstSpeciesFound = '';
  const residentsArray = animalSpeciesInfo.residents;
  residentsArray.forEach((resident) => {
    if (resident.age > oldest) {
      oldest = resident.age;
      firstSpeciesFound = resident;
    }
  });
  // I used Object.values to return a array just with values of the object 'firstSpeciesFound';
  return Object.values(firstSpeciesFound);
}

function increasePrices(percentage) {
  const arrayOfKeys = Object.keys(prices);
  const ObjectOfPrices = {};
  // solution with Math.round() found after searching this link:
  // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
  arrayOfKeys.map(key => (ObjectOfPrices[key] =
    Math.round((data.prices[key] + ((data.prices[key] * percentage) / 100)) * 100) / 100));
  return (data.prices = ObjectOfPrices);
}

function employeeCoverage(idOrName) {
  // ideas based on building the solution during Icaro Harry's on-call class;
  const employeeCoverageObject = {};
  let employeeFilterByPersonalInfo;
  // conditions to verify if parameters is empty;
  if (!idOrName) {
    employeeFilterByPersonalInfo = employees;
  } else {
    employeeFilterByPersonalInfo = employees.filter((({ id, firstName, lastName }) =>
      id === idOrName ||
      firstName === idOrName ||
      lastName === idOrName));
  }
  // search animals and your responsible for;
  employeeFilterByPersonalInfo.forEach((employee) => {
    const animalsManager = employee.responsibleFor.map((managedAnimals) => {
      const findManagedAnimal = animals.find(animal => animal.id === managedAnimals).name;
      return findManagedAnimal;
    });
    employeeCoverageObject[`${employee.firstName} ${employee.lastName}`] = animalsManager;
  });

  return employeeCoverageObject;
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
