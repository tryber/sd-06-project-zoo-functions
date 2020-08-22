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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return ids.map(id => animals.find(specie => specie.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal).residents
    .every(individual => individual.age >= age);
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} :
    employees.find(employee =>
      employee.firstName.includes(employeeName) || employee.lastName.includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((ac, animal) => ({ ...ac, [animal.name]: animal.residents.length }), {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  const { Adult: pAdult, Child: pChild, Senior: pSenior } = prices;
  return (pAdult * Adult) + (pChild * Child) + (pSenior * Senior);
}

function animalMap({ includeNames = false, sorted = false, sex } = 0) {
  if (includeNames && sex) {
    return animals.reduce((acc, animal) => ({
      ...acc,
      [animal.location]: animals
        .filter(a => a.location === animal.location)
        .map(a => ({ [a.name]: sorted ?
            a.residents.filter(an => an.sex === sex)
            .map(an => an.name).sort() :
            a.residents
            .filter(an => an.sex === sex)
            .map(an => an.name) })),
    }), { NE: [], NW: [], SE: [], SW: [] });
  }

  if (includeNames) {
    return animals.reduce((acc, animal) => ({
      ...acc,
      [animal.location]: animals
        .filter(a => a.location === animal.location)
        .map(a => ({ [a.name]: sorted ?
            a.residents.map(an => an.name).sort() :
            a.residents.map(an => an.name) })),
    }), { NE: [], NW: [], SE: [], SW: [] });
  }

  return animals.reduce((acc, animal) => ({
    ...acc,
    [animal.location]: animals
      .filter(a => a.location === animal.location)
      .map(a => a.name),
  }), { NE: [], NW: [], SE: [], SW: [] });
}

function schedule(dayName) {
  if (dayName) {
    const operatingHours = hours[dayName];
    return {
      [dayName]: (dayName === 'Monday') ? 'CLOSED' :
      `Open from ${operatingHours.open}am until ${operatingHours.close - 12}pm`,
    };
  }
  return Object.entries(hours).reduce((acc, [day, { open, close }]) => ({
    ...acc,
    [day]: (day === 'Monday') ? 'CLOSED' :
    `Open from ${open}am until ${close - 12}pm`,
  }), {});
}

function oldestFromFirstSpecies(id) {
  const firstSpecieId = employees.find(employee => employee.id === id).responsibleFor[0];
  const specieResidents = animals.find(specie => specie.id === firstSpecieId).residents;
  return specieResidents.reduce((result, { name, sex, age }) =>
    (age > result.age ? [name, sex, age] : result),
  );
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
