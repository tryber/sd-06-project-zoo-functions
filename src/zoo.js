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
const { animals, employees, prices, hours } = require('./data');
//rest agrupa o objeto em um ARRAY
function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(paramFound => paramFound === animal.id));
};

function animalsOlderThan(animal, age) {
  return animals.find(doubutsu => doubutsu.name === animal).residents.every(allAge => allAge.age >= age);
};

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
    return employees.find(kaishyain => kaishyain.firstName === employeeName || kaishyain.lastName === employeeName);
};

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const otherObject = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(otherObject);
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach(animal => {
      const key = animal.name;
      const value = animal.residents.length;
      obj[key] = value;
    });
    return obj;
  }
  return animals.find(doubutsu => doubutsu.name === species).residents.length
}

function entryCalculator(entrants) {
  let result = 0;
  if (entrants === undefined) return result;
  if (entrants.Adult) result += entrants.Adult * prices.Adult;
  if (entrants.Senior) result += entrants.Senior * prices.Senior;
  if (entrants.Child) result += entrants.Child * prices.Child;
  return result;
}

function animalMap(options) {
  const location = ['NE', 'SE', 'SW', 'NW'];
  if (!option) {
    const animalsPerLocation = {};
    
    locations.forEach((location) => {
      //conferir se animais sao dessa localizacao
      const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name)

      if (animals.length !== 0) animalsPerLocation[location] = animals;
    });
    return animalsPerLocation;
  }
}

function schedule(dayName) {
  const newObj = {};
  const hour = Object.entries(hours);
  if (dayName === undefined) {
    hour.map(day => {
      if (day.includes('Monday')) {
        newObj.Monday = 'CLOSED';
        return newObj;
      }
      return (newObj[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`);
    });
    return newObj;
  }
  return hour.filter(name => name[0] === dayName).map(day => {
    if (dayName === 'Monday') {
      newObj[dayName] = 'CLOSED';
      return newObj;
    }
    newObj[dayName] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    return newObj;
  })[0];
}

function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find(animal => animal.id === id).responsibleFor[0];
  const residents = animals.find(resident => resident.id === idAnimal).residents;
  const onlyValues = residents.map(transformResident => Object.values(transformResident));
  return onlyValues.sort((a, b) => b[2] - a[2])[0];
}

function increasePrices(percentage) {
  const perc = percentage / 100;
  Object.keys(prices).forEach((valor) => {
    prices[valor] = Math.round((prices[valor] + (prices[valor] * perc)) * 100) / 100;
  });
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
      const namesValues = `${element.firstName} ${element.lastName}`;
      obj[namesValues] = element.animalList;
    });
    return obj;
  }
  const people = employees.find(element => idOrName === element.id ||
      idOrName === element.firstName || idOrName === element.lastName);
  const namesValues = `${people.firstName} ${people.lastName}`;
  obj[namesValues] = people.responsibleFor.flatMap(idA => animals
    .find(animal => idA === animal.id).name);
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
