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

function animalsByIds(...ids) {
  // hint about includes received from Icaro
  const getAnimalById = animals.filter(animal => ids.includes(animal.id));
  return getAnimalById;
}

function animalsOlderThan(animalName, animalAge) {
  const getAnimalByName = animals.find(animal => animal.name === animalName);
  const animalsResidentsObj = getAnimalByName.residents;
  return animalsResidentsObj.every(animal => animal.age >= animalAge);
}

function employeeByName(employeeName) {
  const getEmployeeByName = employees.find(
    employee => employee.firstName === employeeName || employee.lastName === employeeName,
  );
  if (!employeeName) return {};
  return getEmployeeByName;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  };
}

function isManager(id) {
  return employees
    .map(employee => employee.managers)
    .some((manager, index) => manager[index] === id);
}

function addEmployee(
  employeeId,
  employeeFirstName,
  employeeLastName,
  ...employeeManagersAndResponsibleFor
) {
  if (!employeeManagersAndResponsibleFor[0] && !employeeManagersAndResponsibleFor[1]) {
    return data.employees.push({
      id: employeeId,
      firstName: employeeFirstName,
      lastName: employeeLastName,
      managers: [],
      responsibleFor: [],
    });
  }
  return data.employees.push({
    id: employeeId,
    firstName: employeeFirstName,
    lastName: employeeLastName,
    managers: [...employeeManagersAndResponsibleFor][0],
    responsibleFor: [...employeeManagersAndResponsibleFor][1],
  });
}

function animalCount(species) {
  const allSPeciesCountObj = {};
  animals.forEach(animal => (allSPeciesCountObj[animal.name] = animal.residents.length));

  const orderedSpeciesObj = {};
  // stackoverflow solution to order an object with sort hof
  Object.keys(allSPeciesCountObj)
    .sort()
    .forEach(key => (orderedSpeciesObj[key] = allSPeciesCountObj[key]));
  const sameSpecieCount = animals.find(animal => animal.name === species);

  if (species) return sameSpecieCount.residents.length;
  return orderedSpeciesObj;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

  let totalPrice = 0;

  // got hint about use Object.keys instead of Object.entries by watching other students PR's
  for (let i = 0; i < Object.keys(entrants).length; i += 1) {
    totalPrice += prices[Object.keys(entrants)[i]] * entrants[Object.keys(entrants)[i]];
  }

  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const allDays = Object.keys(hours);
  const mondayObj = { Monday: 'CLOSED' };

  if (dayName === 'Monday') {
    return mondayObj;
  }

  let showScheduleToCustomer = {};

  allDays.forEach(day => (showScheduleToCustomer[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`));

  if (!dayName) {
    showScheduleToCustomer = Object.assign(showScheduleToCustomer, mondayObj);
  } else {
    return {
      // ES6 and Babel new feature found at StackOverflow
      [dayName]: showScheduleToCustomer[dayName],
    };
  }
  return showScheduleToCustomer;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

const increasePrices = (percentage) => {
  const percentageAdjust = (percentage / 100) + 1;

  prices.Adult = (Math.round(prices.Adult * percentageAdjust * 100)) / 100;
  prices.Senior = (Math.round(prices.Senior * percentageAdjust * 100)) / 100;
  prices.Child = (Math.round(prices.Child * percentageAdjust * 100)) / 100;

  return prices;
};

// plantão 25.08 requisito 13
const allEmployeesAndAnimals = () => {
  const allEmployeesOutput = {};

  employees.forEach((employee) => {
    allEmployeesOutput[`${employee.firstName} ${employee.lastName}`] = [];
    employee.responsibleFor.forEach((id) => {
      const animalName = animals.find(animal => animal.id === id).name;
      allEmployeesOutput[`${employee.firstName} ${employee.lastName}`].push(animalName);
    });
  });

  return allEmployeesOutput;
};

const employeeCoverage = (idOrName) => {
  let getEmployeeCoverage = {};

  if (!idOrName) return allEmployeesAndAnimals();

  // filtered employee's id, name or last name
  const getEmployee = employees.filter(
    employee => employee.firstName === idOrName ||
    employee.lastName === idOrName || employee.id === idOrName,
  );

  // get employee's animals by id's found at responsibleFor array
  const employeeAnimalsNames = getEmployee[0].responsibleFor.map(
    animalId => animals.find(animal => animal.id === animalId).name,
  );

  getEmployeeCoverage = {
    [`${getEmployee[0].firstName} ${getEmployee[0].lastName}`]: employeeAnimalsNames,
  };

  return getEmployeeCoverage;
};

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
