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
  // seu código aqui
  const ARRAY = [];
  for (let i = 0; i < ids.length; i += 1) {
    const TODOSANIMAIS = data.animals.filter(item => item.id === ids[i]);
    ARRAY[i] = TODOSANIMAIS[0];
  }
  return ARRAY;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(item => item.name === animal).residents.every(item => item.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === '' || !employeeName) {
    return {};
  }
  return data.employees.find(item =>
    item.firstName === employeeName ||
    item.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(item => item.managers.find(item1 => item1 === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const NEWEMPLOYEE = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(NEWEMPLOYEE);
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    const ANIMAIS = {};
    data.animals.forEach((item) => { ANIMAIS[item.name] = item.residents.length; });
    return ANIMAIS;
  }
  return data.animals.find(item => item.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  let total = 0;
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const ADULT = data.prices.Adult;
  const ANCIENT = data.prices.Senior;
  const INFANT = data.prices.Child;
  if (entrants.Adult) {
    total += entrants.Adult * ADULT;
  }
  if (entrants.Senior) {
    total += entrants.Senior * ANCIENT;
  }
  if (entrants.Child) {
    total += entrants.Child * INFANT;
  }
  return total;
}

function animalMap(options = { includeNames: false, sorted: false, sex: ['male', 'female'] }) {
  // seu código aqui
  const ZONES = { NE: [], NW: [], SE: [], SW: [] };
  const LOCAL = Object.keys(ZONES);
  LOCAL.forEach((zone) => {
    const ONEZONE = data.animals.filter(item => item.location === zone);
    if (!options.includeNames) {
      ZONES[zone] = ONEZONE.map(obj => obj.name);
    }
    if (options.includeNames) {
      ONEZONE.forEach((item) => {
        const ANIMAIS = item.name;
        let nomes = item.residents.map(obj => obj.name);
        if (options.sex === 'female') {
          const females = item.residents.filter(sexo => sexo.sex === 'female');
          nomes = females.map(obj => obj.name);
        }
        if (options.sorted) {
          nomes.sort();
        }
        ZONES[zone].push({ [ANIMAIS]: nomes });
      });
    }
  });
  return ZONES;
}

function schedule(dayName) {
  // seu código aqui
  const HORARIO = {};
  Object.keys(data.hours).forEach((item) => {
    if (item === 'Monday') {
      HORARIO[item] = 'CLOSED';
    } else {
      HORARIO[item] = `Open from ${data.hours[item].open}am until ${data.hours[item].close - 12}pm`;
    }
  });
  if (!dayName) return HORARIO;
  const THISDAY = {};
  THISDAY[dayName] = HORARIO[dayName];
  return THISDAY;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const RESPONSIBLE = (data.employees.find(employee => employee.id === id)).responsibleFor;
  const ANIMAIS = data.animals.find(item => item.id === RESPONSIBLE[0]).residents;
  let olders = { name: '', sex: '', age: 0 };
  ANIMAIS.forEach(((item) => {
    if (item.age > olders.age) olders = item;
  }));
  return [olders.name, olders.sex, olders.age];
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(data.prices).forEach((item) => {
    data.prices[item] *= (1 + (percentage / 100));
    data.prices[item] = (Math.floor(Number((data.prices[item]) * 100) + 1) / 100).toFixed(2);
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const RESULT = {};
  function iden(employee) {
    RESULT[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map(itemMap => data.animals.find(item => item.id === itemMap).name);
  }
  if (!idOrName) {
    data.employees.forEach((employee) => {
      employee = iden(employee);
    });
    return RESULT;
  }
  const SELECAO = data.employees.find(employee =>
    (employee.id === idOrName || employee.firstName === idOrName ||
      employee.lastName === idOrName));
  iden(SELECAO);
  return RESULT;
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
