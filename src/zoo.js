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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalOfZoo => animal === animalOfZoo.name).residents
    .every(animalOfZoo => animalOfZoo.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees
    .some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(addNewEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals
      .reduce((acc, current) => ({ ...acc, [current.name]: current.residents.length }), {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const [adultPrice, seniorPrice, childPrice] = Object.values(prices);
  const sumOfPrices = (Adult * adultPrice) + (Senior * seniorPrice) + (Child * childPrice);
  return sumOfPrices;
}

// function animalMap(options) {
//   // const { includeNames, sorted, sex } = options;
//   const locations = ['NE', 'NW', 'SW', 'SE'];
//   if (!options) {
//     const animalPerLocations = {};
//     locations.forEach((location) => {
//       const filterAnimals = animals
//         .filter(animal => animal.location === location)
//         .map(animal => animal.name);
//       if (filterAnimals.length !== 0) animalPerLocations[location] = filterAnimals;
//     });
//     return animalPerLocations;
//   }
// }
function retrieveAnimalsPerLocation() {
  return animals
    .reduce((locations, { location }) => ({ ...locations,
      [location]: animals
        .filter(animal => animal.location === location)
        .map(animal => animal.name) }), {});
}

function animalsPerLocationWithNameFilterBySexAndSorted(sorted, sex) {
  return animals
    .reduce((locations, { location }) => ({ ...locations,
      [location]: animals
        .filter(animal => animal.location === location)
        .map((animal) => {
          const isFilterBySex = animal.residents
            .filter((resident) => {
              const isFilteringBySex = sex !== undefined;
              return (isFilteringBySex) ? resident.sex === sex : true;
            })
            .map(resident => resident.name);
          return { [animal.name]: (sorted) ? isFilterBySex.sort() : isFilterBySex };
        }),
    }), {});
}

function animalMap(options = false) {
  const { includeNames, sorted, sex } = options;
  if (!options) return retrieveAnimalsPerLocation();
  if (!includeNames) return retrieveAnimalsPerLocation();
  return animalsPerLocationWithNameFilterBySexAndSorted(sorted, sex);
}

function schedule(dayName) {
  const scheduleDays = Object.entries(hours);
  if (!dayName) {
    return scheduleDays
      .reduce((accDay, [day, { open, close }]) => ({ ...accDay, [day]: (day === 'Monday') ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm` }), {});
  }
  return {
    [dayName]: (dayName === 'Monday') ? 'CLOSED' : `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`,
  };
}

function oldestFromFirstSpecies(id) {
  const firstSpecieOfEmployee = employees.find(employee => employee.id === id).responsibleFor[0];
  const oldestAnimal = animals
    .find(animal => animal.id === firstSpecieOfEmployee).residents
    .sort((newest, oldest) => oldest.age - newest.age)[0];
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  return Object.entries(prices)
    .forEach(([people, price]) => {
      prices[people] = (Math.round(price * ((percentage / 100) + 1) * 100) / 100).toFixed(2);
    });
}

function employeeCoverage(idOrName) {
  let filteredEmployees;
  if (!idOrName) {
    filteredEmployees = employees;
  } else {
    filteredEmployees = employees.filter(({ id, firstName, lastName }) =>
    id === idOrName ||
    firstName === idOrName ||
    lastName === idOrName);
  }
  return filteredEmployees
    .reduce((employee, { firstName, lastName, responsibleFor }) => {
      employee[`${firstName} ${lastName}`] = responsibleFor
        .map((idAnimalResponsible) => {
          const searchAnimalName = animals
            .find(animal => animal.id === idAnimalResponsible).name;
          return searchAnimalName;
        });
      return employee;
    }, {});
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
