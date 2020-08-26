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

const { prices, hours } = data;

function animalsByIds(...ids) {
  return data.animals.filter(species => ids.includes(species.id));
}

function animalsOlderThan(animal, age) {
  return (data.animals.find(species => species.name === animal)
  .residents.every(species => species.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return (
    data.employees.find(emp => emp
    .firstName === employeeName || emp.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, lastName, id } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { firstName, lastName, id, managers, responsibleFor };
}

function isManager(id) {
  return (data.employees.some(employee => employee.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmp = { id, firstName, lastName, managers, responsibleFor };
  return (data.employees.push(newEmp));
}

function animalCount(species) {
  if (species !== undefined) {
    return (data.animals.find(element => (element.name === species)).residents.length);
  }
  const animals = {};
  data.animals.forEach(each => (animals[each.name] = each.residents.length));
  return animals;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(options) {

}
function schedule(dayName) {
  const allSchedule = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) return allSchedule;
  return {
    [dayName]: `${allSchedule[dayName]}`,
  };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const percent = 1 + (percentage / 100);
  Object.keys(data.prices).forEach((entries) => {
    data.prices[entries] = (Math.round((100 * data.prices[entries] * percent)) / 100);
  });
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
