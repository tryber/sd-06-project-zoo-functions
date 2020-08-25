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
const { animals, hours, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(element => element.name === animal).residents
    .every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const objEmpty = {};
  if (employeeName === undefined) {
    return objEmpty;
  }
  const empl = employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return empl;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach((element) => {
      const value = element.residents.length;
      const key = element.name;
      obj[key] = value;
    });
    return obj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  let result = 0;
  if (entrants === undefined) return result;
  const { Adult: AdultPrice, Senior: SeniorPrice, Child: ChildPrice } = prices;
  const { Adult = 0, Senior = 0, Child = 0} = entrants;
  return (AdultPrice * Adult) + (SeniorPrice * Senior) + (ChildPrice * Child);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const obj = {};
  const hora = Object.entries(hours);
  if (dayName === undefined) {
    hora.map((dia) => {
      if (dia.includes('Monday')) {
        obj.Monday = 'CLOSED';
        return obj;
      }
      return (obj[dia[0]] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`);
    });
    return obj;
  }
  return hora.filter(name => name[0] === dayName).map((dia) => {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
      return obj;
    }
    obj[dayName] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`;
    return obj;
  })[0];
}

function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const residAnimals = animals.find(animal => animal.id === idAnimal).residents;
  const onlyValues = residAnimals.map(element => Object.values(element));
  return onlyValues.sort((a, b) => b[2] - a[2])[0];
}

function increasePrices(percentage) {
  const perc = percentage / 100;
  prices.Adult = Math.round((prices.Adult + (prices.Adult * perc)) * 100) / 100;
  prices.Senior = Math.round((prices.Senior + (prices.Senior * perc)) * 100) / 100;
  prices.Child = Math.round((prices.Child + (prices.Child * perc)) * 100) / 100;
}

function employeeCoverage(idOrName) {
  const obj = {};
  employees.map((employee) => {
    employee.animalList = employee.responsibleFor.map(idAnimal => animals.find(animal =>
      animal.id === idAnimal).name);
    return employee;
  });
  if (idOrName === undefined) {
    employees.forEach((element) => {
      const nomes = `${element.firstName} ${element.lastName}`;
      obj[nomes] = element.animalList;
    });
    return obj;
  }
  const people = employees.find(element => idOrName === element.id ||
      idOrName === element.firstName || idOrName === element.lastName);
  const nomes = `${people.firstName} ${people.lastName}`;
  obj[nomes] = people.responsibleFor.flatMap(idAni => animals
    .find(ani => idAni === ani.id).name);
  return obj;
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
