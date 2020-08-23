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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return (
    data
      .animals
      .find(anim => anim.name === animal)
      .residents
      .every(resident => resident.age >= age)
  );
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  return (
    data
      .employees
      .find(emp => emp.firstName === employeeName || emp.lastName === employeeName)
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, lastName, id } = personalInfo;
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
  return (
    data
      .employees
      .some(employee => employee.managers.includes(id))
  );
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees = [...data.employees, newEmployee];
}

function animalCount(species) {
  if (species) {
    return (
      data
        .animals
        .find(animal => animal.name === species)
        .residents
        .length
    );
  }

  return (
    data
      .animals
      .reduce((start, next) => {
        // this all could be 1 line, but left like this for clarity.
        const specie = next.name;
        const count = next.residents.length;
        return { ...start, [specie]: count };
      }, {})
  );
}

function entryCalculator(entrants = 0) {
  return (
    Object
      .keys(data.prices)
      .reduce((start, next) => start + (data.prices[next] * (entrants[next] || 0)), 0)
  );
}

function buildStructure() {
  return (
    data
      .animals
      .reduce((start, next) => {
        start = { ...start, [next.location]: [] };
        return start;
      }, {})
  );
}

function addOptedAnimals(sex, sorted, currentAnimal) {
  return (
    currentAnimal
      .residents
      .filter((res) => {
        if (sex) {
          return res.sex === sex;
        }
        return true;
      })
      .map(res => res.name)
      .sort((a, b) => {
        if (sorted) {
          return a.localeCompare(b);
        }
        return 0;
      })
  );
}

function animalMap(options = {}) {
  const { includeNames, sorted, sex } = options;
  // builds structure
  const possibleLocs = buildStructure();

  return (
    data
      .animals
      .reduce((locations, next) => {
        if (!includeNames) {
          locations[next.location].push(next.name);
          return locations;
        }

        const objAnimal = { [next.name]: addOptedAnimals(sex, sorted, next) };

        locations[next.location].push(objAnimal);
        return locations;
      }, possibleLocs)
  );
}

function schedule(dayName) {
  const fullSchedule = (
    Object
      .entries(data.hours)
      .reduce((start, next) => {
        // could also be reduced in lines but left like this for clarity.
        const day = next[0];
        const open = next[1].open;
        const close = next[1].close - 12;

        const phrase = (open) ? (`Open from ${open}am until ${close}pm`) : ('CLOSED');

        return { ...start, [day]: phrase };
      }, {})
  );

  if (dayName) {
    return { [dayName]: fullSchedule[dayName] };
  }

  return fullSchedule;
}

function oldestFromFirstSpecies(id) {
  const animalId = (
    data
      .employees
      .find(employee => employee.id === id)
      .responsibleFor[0]
  );
  return (
    Object
      .values(
        data
          .animals
          .find(animal => animal.id === animalId)
          .residents
          .sort((a, b) => b.age - a.age)[0], //reduce also works. Maybe it's even better.
      )
  );
}

function increasePrices(percentage) {
  const priceTiers = Object.keys(data.prices);

  priceTiers.forEach((tier) => {
    const oldPrice = data.prices[tier];
    const newPrice = (Math.round((oldPrice * ((percentage / 100) + 1)) * 100) / 100).toFixed(2);
    data.prices[tier] = Number(newPrice);
  });
}

function addAnimalsNamesToEmployeeData() {
  return (
    data
    .employees
    .map((emp) => {
      const animalList = (
        emp
          .responsibleFor
          .map(anID => data.animals.find(animal => animal.id === anID).name)
      );
      return { ...emp, responsibleFor: animalList };
    })
  );
}

function employeeCoverage(idOrName) {
  const employeesAndAnimals = addAnimalsNamesToEmployeeData();

  if (idOrName) {
    const searchedEmp = (
      employeesAndAnimals
      .find(emp => emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName)
    );

    const empName = `${searchedEmp.firstName} ${searchedEmp.lastName}`;
    return { [empName]: searchedEmp.responsibleFor };
  }

  return (
    employeesAndAnimals
      .reduce((start, next) => {
        const empName = `${next.firstName} ${next.lastName}`;
        const empAnim = { [empName]: next.responsibleFor };
        return { ...start, ...empAnim };
      }, {})
  );
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
