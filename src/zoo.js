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

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return ids.map(element => data.animals.find(arrayAnimals => element === arrayAnimals.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(element => element.name === animal).residents
  .every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = { id, firstName, lastName, managers, responsibleFor };
  return employee;
}

function isManager(id) {
  return data.employees.some(element => element.managers.includes(id) === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id, firstName, lastName, managers, responsibleFor,
  });
}

function animalCount(species) {
  const count = data.animals.find(animal => animal.name === species);
  const animalObject = {};
  if (count) {
    return count.residents.length;
  }
  data.animals.forEach((element) => {
    const animalKey = element.name;
    const animalValue = element.residents.length;
    animalObject[animalKey] = animalValue;
  });
  return animalObject;
}

function entryCalculator(entrants) {
  // Object.keys -> transformas as keys em um array
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  // desestruturando o parametro entrants
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // multiplica a quantidade de cada ingresso fornecido por entrants, pelo valor
  const totalPrice = (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const obj = {};
  const day = data.hours;
  if (!dayName) {
    obj.Tuesday = `Open from ${day.Tuesday.open}am until ${day.Tuesday.close - 12}pm`;
    obj.Wednesday = `Open from ${day.Wednesday.open}am until ${day.Wednesday.close - 12}pm`;
    obj.Thursday = `Open from ${day.Thursday.open}am until ${day.Thursday.close - 12}pm`;
    obj.Friday = `Open from ${day.Friday.open}am until ${day.Friday.close - 12}pm`;
    obj.Saturday = `Open from ${day.Saturday.open}am until ${day.Saturday.close - 12}pm`;
    obj.Sunday = `Open from ${day.Sunday.open}am until ${day.Sunday.close - 12}pm`;
    obj.Monday = 'CLOSED';
  }
  if (dayName === 'Monday') {
    obj[dayName] = 'CLOSED';
  } else if (Object.keys(day).includes(dayName)) {
    obj[dayName] = `Open from ${day[dayName].open}am until ${day[dayName].close - 12}pm`;
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  // guardar o id do primeiro animal que o func gerencia
  const animalId = data.employees.find(element => element.id === id).responsibleFor[0];
  // buscar o animal
  const findAnimal = data.animals.find(element => element.id === animalId);
  // testar qual animal mais velho- para isso:
  // percorrer o array residents e comparar 1 posição com a 2,
  // salvar a que for maior, depois comparar com a 3, e assim por diante
  // variavel que será retornada com o mais velho
  let theOldest = findAnimal.residents[0];
  findAnimal.residents.forEach((element) => {
    if (element.age > theOldest.age) {
      theOldest = element;
    }
  });
  return Object.values(theOldest);
}

function increasePrices(percentage) {
  return Object.keys(data.prices)
  .forEach((element) => {
    data.prices[element] = (Math.round(element * (1 + (percentage / 100)) * 100) / 100);
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
