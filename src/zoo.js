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
const { animals, employees, hours, prices } = require('./data');

const { Adult, Senior, Child } = prices;

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.filter(animalGroup =>
  animalGroup.name === animal)[0].residents.every(eachAnimal => eachAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
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
  return employees.some((employee, index) => employee.managers[index] === id);
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
  if (species !== undefined) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  return animals.reduce((animalsList, eachAnimal) =>
    ({ ...animalsList, [eachAnimal.name]: eachAnimal.residents.length })
  , {});
}

function entryCalculator(entrants) {
  if (entrants === {} || entrants === undefined) {
    return 0;
  }

  const { Adult: quantAdult = 0, Senior: quantSenior = 0, Child: quantChild = 0 } = entrants;

  return (Adult * quantAdult) + (Senior * quantSenior) + (Child * quantChild);
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];

  if (!options) {
    const animalsPerLocation = {};

    locations.forEach((location) => {
      const arrAnimals = animals
        .filter(animal => animal.location === location)
        .map(animal => animal.name);

      if (arrAnimals.length !== 0) animalsPerLocation[location] = arrAnimals;
    });
    // conferir quais animais são dessa localização
  }
}

function schedule(dayName) {
  const daysOfWeek = Object.keys(hours).reduce((daysList, day, index) =>
  ({ ...daysList,
    [day]: day === 'Monday' ? 'CLOSED' : `Open from ${Object.values(hours)[index].open}am until ${Object.values(hours)[index].close - 12}pm`,
  }), {});
  if (dayName) {
    const dayOfWeek = Object.entries(daysOfWeek).find(day => day[0] === dayName);
    const [day, hoursPerDay] = dayOfWeek;
    return { [day]: hoursPerDay };
  }
  return daysOfWeek;
}

function oldestFromFirstSpecies(id) {
  const specie = employees.find(emp => emp.id === id).responsibleFor[0];
  const animalByEmp = animals.filter(animal => animal.id === specie);
  const oldestAnimal = animalByEmp[0].residents.reduce((oldAnimal, currentAnimal) =>
  (oldAnimal.age > currentAnimal.age ? oldAnimal : currentAnimal));
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const currentPercentage = (percentage / 100) + 1;
  Object.entries(prices)
  .forEach(([key, value]) => {
    prices[key] = Math.round(value * currentPercentage * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const func = employees.reduce((acc, curr) => (
      { ...acc, [`${curr.firstName} ${curr.lastName}`]: curr.responsibleFor }
    ), {});
    return Object.keys(func).reduce((acc, curr) => ({
      ...acc,
      [curr]: func[curr].map(animalId => animals.find(animalName =>
        animalName.id === animalId).name) }
    ), {});
  }

  const emp = employees.find(employee =>
    employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName);
  const { firstName, lastName, responsibleFor } = emp;
  return { [`${firstName} ${lastName}`]: responsibleFor.map(animalId => animals.find(animalName => animalName.id === animalId).name) };
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
