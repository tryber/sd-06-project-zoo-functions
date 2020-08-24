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
const { animals, prices, hours } = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) { // Agrupando em um array com rest
  // seu código aqui
  const consultedIds = [];// aqui já irá fornecer o array vazio
  ids.forEach(idOfAnimal => consultedIds // correndo com forEach o array
    .push(animals // preenchendo o array com a informação dos animais encontrados com o find
    .find(animal => animal.id === idOfAnimal)));
  return consultedIds;
}
// tentar fazer com filter

function animalsOlderThan(animal, age) {
  // seu código aqui
  const species = animals.filter(specieReceveid => specieReceveid.name === animal);
  const ages = species[0].residents.every(ageReceveid => ageReceveid.age >= age);
  return ages;
}

function employeeByName(employeeName) {
  // seu código aqui
  const firstNameEmployee = employees.find(firstN => firstN.firstName === employeeName);
  const lastNameEmployee = employees.find(lastN => lastN.lastName === employeeName);
  if (firstNameEmployee) {
    return firstNameEmployee;
  } else if (lastNameEmployee) {
    return lastNameEmployee;
  } return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const verifyManager = employees.some(searchManager => searchManager.managers
    // reforço: some retorna true ou false por isso coloquei a HOF find na saída dela
    .find(managerId => managerId === id));
  return verifyManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newWorker = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  return employees.push(newWorker);
}

function animalCount(species) {
  // seu código aqui
  const animalNumber = {};
  animals.forEach(animal => (animalNumber[animal.name] = animal.residents.length));
  if (species === undefined) {
    return animalNumber;
  }
  return animalNumber[species];
  // Tentativa com Reduce (rever)
  // const numbersAnimals = animals.length;
  // const sumAnimals = animals.reduce((acc, animal) => acc + (animals.name))
  // console.log(sumAnimals);
}

function entryCalculator(entrants) {
  // seu código aqui
  // if para retornar 0 caso o parâmetro não seja definido
  if (entrants === undefined) {
    return 0;
  }
  // destructuring a estrutura entrants e colocando 0 como retorno padrão,
  // caso um objeto vazio for passado
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  let total = 0;
  total = Adult * prices.Adult;
  total += Senior * prices.Senior;
  total += Child * prices.Child;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const calendar = Object.assign({}, hours);
  const days = Object.keys(calendar);
  days.forEach((day) => {
    calendar[day] = `Open from ${calendar[day].open}am until ${calendar[day].close - 12}pm`;
    if (day === 'Monday') calendar[day] = 'CLOSED'; // monday está como 0 em data, retorno 'CLOSED'
  });
  if (dayName === undefined) {
    return calendar;
  }
  const readableSchedule = {};
  readableSchedule[dayName] = calendar[dayName];
  return readableSchedule;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const idEmployee = employees.find(employee => employee.id === id);
  const idAnimal = idEmployee.responsibleFor[0];
  const animalReturned = animals.find(animal => animal.id === idAnimal);
  const { name, sex, age } = animalReturned.residents.sort((a, b) => b.age - a.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const valuePercentage = (percentage / 100) + 1; // valor recebido + 1 inteiro
  // toFixed não deu certo arredonda para baixo
  // usei Math.round o *100)/100 é erro arredond devido inacurácia de aritmética de pto flutuante
  prices.Senior = Math.round(prices.Senior * valuePercentage * 100) / 100;
  prices.Adult = Math.round(prices.Adult * valuePercentage * 100) / 100;
  prices.Child = Math.round(prices.Child * valuePercentage * 100) / 100;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  // Sem parâmetros, retorna lista de funcionários e os animais pelos quais eles são responsáveis
  const employeesResponsibleForAnimals = {};
  if (idOrName === undefined) {
    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const animalsCared = animalsByIds(...employee.responsibleFor);
      animalsCared.forEach((animal, index, array) => (array[index] = animal.name));
      employeesResponsibleForAnimals[fullName] = animalsCared;
    });
    return employeesResponsibleForAnimals;
  }
  // Pelo id, 1o nome ou último nome de um funcionário,
  // retorna os animais pelos quais o funcionário é responsável
  const worker = employees.find(employee =>
    employee.id === idOrName || employee.firstName ===
    idOrName || employee.lastName === idOrName);
  const fullName = `${worker.firstName} ${worker.lastName}`;
  const animalsCared = animalsByIds(...worker.responsibleFor);
  animalsCared.forEach((animal, index, array) => (array[index] = animal.name));
  employeesResponsibleForAnimals[fullName] = animalsCared;
  return employeesResponsibleForAnimals;
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
