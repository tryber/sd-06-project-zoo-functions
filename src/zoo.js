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
const { employees, animals, hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return ids.reduce((total, id) =>
    total.concat(data.animals.filter(animal => animal.id === id))
  , []);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(obgAnimal => animal === obgAnimal.name)
  .residents.every(animalResident => animalResident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) { return {}; }
  return employees
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return data.animals.reduce((total, specie) => {
      total[specie.name] = specie.residents.length;
      return total;
    }, {});
  }
  return data.animals.find(specie => specie.name === species).residents.length;
}
// console.log(animalCount());

function entryCalculator(entrants = {}) {
  // seu código aqui
  let { Adult, Child, Senior } = entrants;
  const priceAdult = data.prices.Adult;
  const priceChild = data.prices.Child;
  const priceSenior = data.prices.Senior;
  if (!Adult) { Adult = 0; }
  if (!Child) { Child = 0; }
  if (!Senior) { Senior = 0; }
  return ((Adult * priceAdult) + (Child * priceChild) + (Senior * priceSenior));
}
// console.log(entryCalculator());

function animalMap(options = {}) {
  return animals.reduce((objLocalization, specie) => {
    const arrayExit = [];
    if (!options.includeNames) {
      arrayExit.push(specie.name);
    } else if (options.includeNames) {
      if (options.sex) {
        arrayExit.push(
          { [specie.name]: specie.residents.filter(animalSex => animalSex.sex === options.sex)
          .map(animal => animal.name) });
      } else {
        arrayExit.push({ [specie.name]: specie.residents.map(animal => animal.name) });
      }
      if (options.sorted) {
        arrayExit[0][specie.name] = arrayExit[0][specie.name].sort();
      }
    }
    if (!objLocalization[specie.location]) {
      objLocalization[specie.location] = arrayExit;
    } else {
      objLocalization[specie.location] = objLocalization[specie.location].concat(arrayExit);
    }
    return objLocalization;
  }, {});
}
// console.table(animalMap({ sex: 'female', includeNames: true }).NE[0]);

function schedule(dayName) {
  // seu código aqui
  let week = [];
  const exit = {};
  if (!dayName) {
    week = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  } else {
    week.push(dayName);
  }
  week.forEach((dayWeek) => {
    if (hours[dayWeek].open === 0 && hours[dayWeek].close === 0) {
      exit[dayWeek] = 'CLOSED';
    } else {
      exit[dayWeek] = `Open from ${hours[dayWeek].open}am until ${hours[dayWeek].close - 12}pm`;
    }
  });
  return exit;
}
// console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const idAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const { name, sex, age } = animals.find(species => species.id === idAnimal).residents
  .reduce((total, resident) => {
    if (resident.age > total.age) {
      return resident;
    }
    return total;
  });
  return [name, sex, age];
}
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  // seu código aqui
  data.prices['Adult'] = (Math.round((data.prices.Adult * ((percentage / 100) + 1)) * 100) / 100);
  data.prices['Senior'] = (Math.round((data.prices.Senior * ((percentage / 100) + 1)) * 100) / 100);
  data.prices['Child'] = (Math.round((data.prices.Child * ((percentage / 100) + 1)) * 100) / 100);
}
// increasePrices(50)
// console.log(data.prices['Adult']);

function employeeCoverage(idOrName) {
  // seu código aqui
  const arrayEmployeesName = employees.map(employee => `${employee.firstName} ${employee.lastName}`);
  const arrayResponsibleForSpecie = employees.map(employee => employee.responsibleFor).map(arrayResponsibleFor => arrayResponsibleFor.map(idResponsibleFor => animals.find(specie => specie.id === idResponsibleFor).name));
  if (!idOrName) {
    return arrayEmployeesName.reduce((exit, nameEmployee, index) => {
      exit[nameEmployee] = arrayResponsibleForSpecie[index];
      return exit;
    }, {});
  }
  const indexExit = employees.reduce((exit, employee, index) => {
    const { firstName, lastName, id } = employee;
    if (idOrName === firstName || idOrName === lastName || idOrName === id) {
      return index;
    }
    return exit;
  });
  return { [arrayEmployeesName[indexExit]]: arrayResponsibleForSpecie[indexExit] };
}
// console.log(employeeCoverage('Strauss'));

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
