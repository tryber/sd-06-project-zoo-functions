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
// 1- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
function animalsByIds(...ids) {
  return data.animals.filter(types => ids.includes(types.id));
}
// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a idade mínima especificada
function animalsOlderThan(animal, age) {
  return data.animals.find(types => types.name === animal)
    .residents.every(types => types.age >= age);
}
// 3- Implemente a função employeeByName:
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário
function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return data.employees.find(types => types.firstName === employeeName ||
    types.lastName === employeeName);
}
// 4- Implemente a função createEmployee:
// Cria um novo colaborador a partir de objetos contendo
// informações pessoais e gerentes e animais gerenciados.
function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}
// 5- Implemente a função isManager:
// Testa se o id passado é de um gerente
function isManager(id) {
  return data.employees.some(types => types.managers.includes(id));
}
// 6- Implemente a função addEmployee:
// Adiciona um funcionário no fim da lista
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}
// 7- Implemente a função animalCount:
// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operador_Virgula
function animalCount(species) {
  if (species === undefined) {
    return Object.fromEntries(data.animals.map(types => [types.name, types.residents.length]));
  } return data.animals.find(types => types.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
}
// Resolução retirada do plantão realizado pelo especialista Oliva, no dia 25/08.
function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);
    if (animals.length !== 0) animalsPerLocation[location] = animals;
  });

  return animalsPerLocation;
}

function retrieveAnimals(locations, sorted, sex) {
  const animalsPerLocationWithName = {};

  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map((animal) => {
        const nameKey = animal.name;
        const nameValues = animal.residents
          .filter((resident) => {
            const isFilteringSex = sex !== undefined;
            return isFilteringSex ? resident.sex === sex : true;
          })
          .map(resident => resident.name);

        if (sorted) nameValues.sort();

        return { [nameKey]: nameValues };
      });

    animalsPerLocationWithName[location] = animals;
  });

  return animalsPerLocationWithName;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames, sorted, sex } = options;

  if (!includeNames) return retrieveAnimalsPerLocation(locations);

  return retrieveAnimals(locations, sorted, sex);
}
// Resolução retirada do fechamento do dia 25/08, feita pelo especialista Oliva
function schedule(dayName) {
  const allDays = Object.keys(data.hours);
  const schedulee = {};
  allDays.forEach((day) => {
    if (day === 'Monday') {
      schedulee[day] = 'CLOSED';
    } else {
      const hours = data.hours[day];
      schedulee[day] = `Open from ${hours.open}am until ${hours.close - 12}pm`;
    }
  });
  if (!dayName) return schedulee;
  return { [dayName]: schedulee[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  return Object.keys(data.prices).forEach((types) => {
    data.prices[types] = Math.round(data.prices[types] * ((percentage / 100) + 1) * 100) / 100;
  });
}
// Resolução retirada do plantão do dia 25/08, feita pelo especialista Ícaro
function employeeCoverage(idOrName) {
  const result = {};
  let filteredEmployees;
  if (!idOrName) {
    filteredEmployees = data.employees;
  } else {
    filteredEmployees = data.employees.filter(employee => employee.id === idOrName ||
    employee.firstName === idOrName ||
    employee.lastName === idOrName);
  }
  filteredEmployees.forEach((employee) => {
    const mappedAnimals = employee.responsibleFor.map((animalIdResponsableFor) => {
      const foundAnimalName = data.animals.find(animal => animal.id === animalIdResponsableFor)
    .name;
      return foundAnimalName;
    });
    result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
  });
  console.log(result);
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
