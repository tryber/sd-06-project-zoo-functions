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
const data = require('./data.js');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const arr = [];
  if (ids === undefined) {
    return arr;
  }
  ids.map(id => arr.push(animals.find(animal => animal.id === id)));
  return arr;
}

function animalsOlderThan(animal, age) {
  const animalsName = animals.find(animalName => animalName.name === animal);
  const checkAge = animalsName.residents.every(residentAge => age < residentAge.age);
  return checkAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const findEmployee = employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName);
  return findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const findManager = employees.some(employee => employee.managers.includes(id));
  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    const animalsName = animals.find(animal => animal.name === species);
    return animalsName.residents.length;
  }
  const animalsCount = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  return animalsCount;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}
// função que recupera animais por localização
function retrieveAnimalsPerLocation(arrLocation) {
  const animalsPerLocation = {};
  // Para cada localização, filtra o animal que possui tal localização na data
  arrLocation.forEach((location) => {
    const animalsNameWithLocation = animals.filter(animal => animal.location === location)
    // Transforma o retorno do filtro em um array com as localizações por nome
    .map(animal => animal.name);
    // Atribui ao obj vazio uma key com a localização e um array com o nome dos animais.
    if (animalsNameWithLocation.length !== 0) {
      animalsPerLocation[location] = animalsNameWithLocation;
    }
  });

  return animalsPerLocation;
}
// Recebe as localizações ['NE', 'SW', 'NW', 'SE']
function retrieveAnimals(arrLocation, sorted, sex) {
  const animalsPerLocationWithName = {};

  arrLocation.forEach((location) => { // Para cada localização
    // filtra o obj animal pela
    const animalsLocationWithName = animals.filter(animal => animal.location === location)
    // localização e retorna o obj inteiro
    .map((animal) => { // transforma o obj animal
      const nameKey = animal.name; // cria a chave do obj a partir do obj filtrado
      const nameValues = animal.residents
      .filter((resident) => {
        const isFilteringSex = sex !== undefined;
        return (isFilteringSex ? resident.sex === sex : true);
      })
      .map(resident => resident.name); // retorna um array com o nome dos residentes

      if (sorted) { nameValues.sort(); }

      return { [nameKey]: nameValues }; // retorna o obj transformado
    });
    // retorna o obj vazio criado no formato:
    // 'localização' : [ { [animal]:['nome dos residentes'] } ]
    animalsPerLocationWithName[location] = animalsLocationWithName;
    return animalsPerLocationWithName;
  });
  // retorna o obj anterior para fora da função
  return animalsPerLocationWithName;
}

// Sem parâmetros, retorna animais categorizados por localização'
function animalMap(options) {
  const arrLocation = ['NE', 'SW', 'NW', 'SE'];
  // Se não houver parametros ou se os parametros forem undefined
  if (!options) {
    return retrieveAnimalsPerLocation(arrLocation);
  }

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return retrieveAnimalsPerLocation(arrLocation);
  // Caso {includeNames:true} retorna os animais por localização e o nome de seus residentes
  return retrieveAnimals(arrLocation, sorted, sex);
}


function schedule(dayName) {
  const scheduleFormated = {};
  const daysOfWeek = Object.keys(hours);
  daysOfWeek.forEach((day) => {
    if (day === 'Monday') {
      scheduleFormated[day] = 'CLOSED';
    } else {
      scheduleFormated[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });

  if (!dayName) {
    return scheduleFormated;
  }

  return { [dayName]: scheduleFormated[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employeeResponsibleFor = employees.find(employee => employee.id === id).responsibleFor[0];

  const animalsManaged = animals.find(animal => animal.id === employeeResponsibleFor)
  .residents.sort((a, b) => b.age - a.age)[0];
  return [animalsManaged.name, animalsManaged.sex, animalsManaged.age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((price) => {
    prices[price] = Math.round((prices[price] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  const result = {};
  let filteredEmployees;

  if (!idOrName) {
    filteredEmployees = employees;
  } else {
    filteredEmployees = employees.filter(
      employee => employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName);
  }

  filteredEmployees.forEach((employee) => {
    const mappedAnimals = employee.responsibleFor.map((animalIdResponsibleFor) => {
      const findAnimalName = animals.find(animal => animal.id === animalIdResponsibleFor).name;
      return findAnimalName;
    });

    result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
  });

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
