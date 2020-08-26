/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const animalsGroup = [];
  if (ids.length === 0) {
    return animalsGroup;
  }
  ids.forEach(id =>
    animals.filter((animal) => {
      if (animal.id === id) {
        animalsGroup.push(animal);
      }
      return 'error';
    }),
  );
  return animalsGroup;
  // console.log(id);
}
// id == animals.id ? animals : [])
function animalsOlderThan(animal, age) {
  return animals
    .filter(oneAnimal => animal === oneAnimal.name)[0]
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.filter(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  )[0];
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee =>
    employee.managers.some(manager => manager === id),
  );
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce(
      (acc, { name, residents }) =>
        Object.assign(acc, { [name]: residents.length }),
      {},
    );
  }
  return animals.find(item => item.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (acc, cur) => acc + (entrants[cur] * prices[cur]),
    0,
  );
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return Object.values(hours).reduce((acc, { open, close }, key) => {
      if (Object.keys(hours)[key] !== 'Monday') {
        return Object.assign(acc, {
          [Object.keys(hours)[key]]: `Open from ${[open]}am until ${[close] - 12}pm`,
        });
      }
      return Object.assign(acc, {
        [Object.keys(hours)[key]]: 'CLOSED',
      });
    }, {});
  }
  if (dayName !== 'Monday') {
    return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
  }
  return { [dayName]: 'CLOSED' };
}

function oldestFromFirstSpecies(id) {
  const animalsId = employees.find(employee => employee.id === id).responsibleFor[0];
  const { name, sex, age } = animals.filter(species => species.id === animalsId)[0].residents
  .reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
  return [name, sex, age];
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
