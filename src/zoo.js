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
const { animals, prices, employees, hours } = require('./data');


//  requisito1 - ok
function animalsByIds(...ids) {
  const listOfAnimals = animals.filter(animal => ids.filter(id => id === animal.id).length > 0);
  return listOfAnimals;
}


//  requisito2 - ok
function animalsOlderThan(specie, age) {
  const list = animals.filter(animal => animal.name === specie);
  const residents = list.filter(zoo => zoo.residents.every(resident => resident.age > age));
  return (residents.length > 0);
}


//  requisito3 - ok
function employeeByName(employeeName) {
  if (employeeName == null) {
    return {};
  }
  const employee = employees.find(emp =>
  (emp.firstName === employeeName) || (emp.lastName === employeeName));

  return employee;
}


//  requisito4 - ok
function createEmployee(personalInfo, associatedWith) {
  const employee = {
    ...personalInfo,
    ...associatedWith,
  };
  return employee;
}


//  requisito5 - ok
function isManager(id) {
  const teste = employees.filter(empregado => empregado.managers.some(manager => manager === id));
  return (teste.length > 0);
}


//  requisito6 - ok
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


//  requisito7 - ok
function animalCount(specie) {
  if (specie == null) {
    const grupoAnimais = {};
    animals.forEach((animal) => { grupoAnimais[animal.name] = animal.residents.length; });
    return grupoAnimais;
  }
  const quantSpecie = animals.find(animal => animal.name === specie).residents;
  return quantSpecie.length;
}


//  requisito8 - ok fonte: https://medium.com/cleytonbrasil/javascript-como-saber-se-um-objeto-est%C3%A1-vazio-a6a153f4f81f - https://docs.w3cub.com/javascript/global_objects/object/entries/
function entryCalculator(entrants) {
  let result = 0;
  if ((entrants == null) || (Object.entries(entrants).length === 0)) {
    return result;
  }
  Object.entries(entrants).forEach(([key, value]) => {
    result += prices[key] * value;
  });
  return result;
}


//  requisito9 -
function animalMap(options) {
  // seu código aqui
}

//  requisito10 - ok
function schedule(dayName) {
  const completeSchedule = {};
  Object.entries(hours).forEach(([key, value]) => {
    if (key === 'Monday') {
      completeSchedule[key] = 'CLOSED';
    } else {
      const openValue = value.open;
      const closeValue = value.close - 12;
      completeSchedule[key] = `Open from ${openValue}am until ${closeValue}pm`;
    }
  });
  if (!dayName) return completeSchedule;
  return { [dayName]: completeSchedule[dayName] };
}


// requisito 11 - ok
function oldestFromFirstSpecies(id) {
  const employee = employees.find(empregado => empregado.id === id);
  const animalId = employee.responsibleFor[0];
  const specie = animals.find(animal => animal.id === animalId);

  let result = [];
  let biggerAge = 0;
  specie.residents.forEach((resident) => {
    if (resident.age > biggerAge) {
      biggerAge = resident.age;
      result = [resident.name, resident.sex, resident.age];
    }
  });
  return result;
}


// requisito 12
function increasePrices(percentage) {
  Object.entries(data.prices).forEach(([key, value]) => {
    data.prices[key] = Math.round((value * ((percentage / 100) + 1)) * 100) / 100;
  });
}


// requisito 13
function employeeCoverage(idOrName) {
  const result = {};
  if (!idOrName) {
    employees.forEach((employee) => {
      result[`${employee.firstName} ${employee.lastName}`] = [];
      employee.responsibleFor.forEach((idResponsibleFor) => {
        const idAnimal = animals.find(animal => animal.id === idResponsibleFor).name;
        result[`${employee.firstName} ${employee.lastName}`].push(idAnimal);
      });
    });
  }
  return result;
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
