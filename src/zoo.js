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

function animalsByIds(...ids) {
  // hint about includes received from Icaro
  const getAnimalById = animals.filter(animal => ids.includes(animal.id));
  return getAnimalById;
}

function animalsOlderThan(animalName, animalAge) {
  const getAnimalByName = animals.find(animal => animal.name === animalName);
  const animalsResidentsObj = getAnimalByName.residents;
  return animalsResidentsObj.every(animal => animal.age >= animalAge);
}

function employeeByName(employeeName) {
  const getEmployeeByName = employees.find(
    employee => employee.firstName === employeeName || employee.lastName === employeeName,
  );
  if (!employeeName) return {};
  return getEmployeeByName;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  };
}

function isManager(id) {
  return employees
    .map(employee => employee.managers)
    .some((manager, index) => manager[index] === id);
}

function addEmployee(
  employeeId,
  employeeFirstName,
  employeeLastName,
  ...employeeManagersAndResponsibleFor
) {
  if (!employeeManagersAndResponsibleFor[0] && !employeeManagersAndResponsibleFor[1]) {
    return data.employees.push({
      id: employeeId,
      firstName: employeeFirstName,
      lastName: employeeLastName,
      managers: [],
      responsibleFor: [],
    });
  }
  return data.employees.push({
    id: employeeId,
    firstName: employeeFirstName,
    lastName: employeeLastName,
    managers: [...employeeManagersAndResponsibleFor][0],
    responsibleFor: [...employeeManagersAndResponsibleFor][1],
  });
}

function animalCount(species) {
  const allSPeciesCountObj = {};
  animals.forEach(animal => (allSPeciesCountObj[animal.name] = animal.residents.length));

  const orderedSpeciesObj = {};
  // stackoverflow solution to order an object with sort hof
  Object.keys(allSPeciesCountObj)
    .sort()
    .forEach(key => (orderedSpeciesObj[key] = allSPeciesCountObj[key]));
  const sameSpecieCount = animals.find(animal => animal.name === species);

  if (species) return sameSpecieCount.residents.length;
  return orderedSpeciesObj;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

cle  let totalPrice = 0;

  // got hint about use Object.keys instead of Object.entries by watching other students PR's
  for (let i = 0; i < Object.keys(entrants).length; i += 1) {
    totalPrice += prices[Object.keys(entrants)[i]] * entrants[Object.keys(entrants)[i]];
  }

  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

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
