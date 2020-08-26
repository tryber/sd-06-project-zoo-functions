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
// const { animals, employees } = require('./data');
// const { employees } = require('./data');
// const { employees } = require('./data');
//  const { animals } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(animale => animale.name === animal)
  .residents.every(animalee => animalee.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return data.employees.find(name =>
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(idManeger => idManeger.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employeeAdd = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(employeeAdd);
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
//   if (!entrants) return 0;
//   if (entrants !== {}) return 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const allDays = Object.keys(data.hours);
  const workDay = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      workDay[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      workDay[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });
  if (dayName === undefined) return workDay;
  return { [dayName]: workDay[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
  // sem paramentro retorna todos os animais
  // com id retorna somente um animal
  // com nome retorna somente um animal
  // com sobrenome retorna somente um animal
  // resolução no plantão
  // const result = {};
  // if (!idOrName) {
  //   data.employees.forEach(employee => {
  //     result [`${employee.firstName} ${employee.lastName}`] = '';
  //     employee.responsibleFor.forEach(animalIdResponsibleFor => {
  //       const foundAnimalName = data.animals.find(animal =>
  //          animal.id === animalIdResponsibleFor).name;
  //       result [`${employee.firstName} ${employee.lastName}`].push(foundAnimalName);
  //     });
  //   });
  // }
  // return result;
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
