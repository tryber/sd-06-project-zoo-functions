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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(allAnimals => allAnimals.name === animal)
    .some(pets => pets.residents.every(pet => pet.age >= age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((emp) => {
    const emplo = employeeName;
    return (emp.firstName === emplo || emp.lastName === emplo);
  });
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(emplo => (emplo.managers.find(ids => ids === id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return data.animals.map((animal) => {
      const nome = animal.name;
      return {
        [nome]: animal.residents.length,
      };
    }).reduce((acc, i) => Object.assign(acc, i));
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce((total, key) =>
  total + (data.prices[key] * entrants[key]), 0);
}

function animalMap({ includeNames = false, sorted = false, sex } = false) {
  if (includeNames && sex) {
    return data.animals.reduce((acc, animal) => ({
      ...acc,
      [animal.location]: data.animals
        .filter(ani => ani.location === animal.location)
        .map(ani => (
        (sorted) ?
        ({ [ani.name]: ani.residents.filter(a => a.sex === sex).map(name => name.name).sort() }) :
        ({ [ani.name]: ani.residents.filter(a => a.sex === sex).map(name => name.name) })
        )),
    }), {});
  }

  if (includeNames) {
    return data.animals.reduce((acc, animal) => ({
      ...acc,
      [animal.location]: data.animals
        .filter(ani => ani.location === animal.location)
        .map(ani => (
        ((sorted) ?
        { [ani.name]: ani.residents.map(a => a.name).sort() } :
        { [ani.name]: ani.residents.map(a => a.name) })
        )),
    }), {});
  }

  return data.animals.reduce((acc, animal) => ({
    ...acc,
    [animal.location]: data.animals
      .filter(ani => ani.location === animal.location)
      .map(a => a.name),
  }), {});
}

function schedule(dayName) {
  const hours = Object.entries(data.hours);
  if (!dayName) {
    const name = {};
    hours.map((hour) => {
      if (hour[0] === 'Monday') {
        name.Monday = 'CLOSED';
        return name;
      }
      return (name[hour[0]] = `Open from ${hour[1].open}am until ${hour[1].close - 12}pm`);
    });
    return name;
  }
  return hours.filter(hour => hour[0] === dayName).map((hour) => {
    if (dayName === 'Monday') {
      return {
        [dayName]: 'CLOSED',
      };
    }
    return {
      [dayName]: `Open from ${hour[1].open}am until ${hour[1].close - 12}pm`,
    };
  })[0];
}

function oldestFromFirstSpecies(id) {
  const func = data.employees.filter(emp => emp.id === id);
  const resp = data.animals.filter(animal => animal.id === func[0].responsibleFor[0]);
  const result = resp[0].residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(result);
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach(key =>
  (data.prices[key] = Math.round((data.prices[key] * ((percentage / 100) + 1)) * 100) / 100));
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const empId = data.employees.map(emp => emp.responsibleFor);
    const empName = data.employees.flatMap(emp => `${emp.firstName} ${emp.lastName}`);
    const animals = empId.map(emp => emp.flatMap(e => data.animals.filter(ani => ani.id === e)));
    const nameAnimals = animals.map(animal => animal.map(ani => ani.name));
    return nameAnimals.reduce((acc, ani, index) => ({ ...acc, [empName[index]]: ani }), {});
  }
  const empName = data.employees
    .filter(emp => (idOrName === emp.id ||
      idOrName === emp.firstName ||
      idOrName === emp.lastName))
    .flatMap(ani => [`${ani.firstName} ${ani.lastName}`, ani.responsibleFor]);
  const animals = empName[1].flatMap(emp => data.animals
    .filter(ani => ani.id === emp))
    .map(ani => ani.name);
  return {
    [empName[0]]: animals,
  };
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
