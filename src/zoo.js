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
const { animals, employees } = require('./data');

// 1rs requirement
function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}

// 2nd requirement
function animalsOlderThan(animal, age) {
  const chosenAnimal = animals.find(element => element.name === animal);
  const chosenResident = chosenAnimal.residents;
  const checkAge = chosenResident.every(element => element.age >= age);
  return checkAge;
}

// 3rdrequirement
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

// 4th requirement
function createEmployee(personalInfo, associatedWith) {
  const { managers, responsibleFor } = associatedWith;
  const { firstName, lastName, id } = personalInfo;

  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

// 5th requirement
function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

// 6th requirement
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

// 7th requirement
function animalCount(species) {
  if (!species) {
    return animals.reduce((result, animal) => {
      result[animal.name] = animal.residents.length;
      return result;
    }, {});
  }
  return animals.filter(animal => animal.name === species)
  .reduce((result, animal) => result + animal.residents.length, 0);
}

// 8th requirement
function entryCalculator(entrants) {
  if (!entrants || entrants.length === 0) {
    return 0;
  }
  let totalChild = 0;
  let totalSenior = 0;
  let totalAdult = 0;
  if (entrants.Adult) totalAdult += entrants.Adult * data.prices.Adult;
  if (entrants.Senior) totalSenior += entrants.Senior * data.prices.Senior;
  if (entrants.Child) totalChild += entrants.Child * data.prices.Child;
  const total = totalChild + totalSenior + totalAdult;
  return total;
}

// 9th requirement

function animalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const animals = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);
      if (animals.length !== 0)animalsPerLocation[location] = animals;
  });
  return animalsPerLocation;
}

function includeName(locations, sorted, sex) {
  const animalLocationObject = {};
  locations.forEach((location) => {
    const animalKey = animalsObject
      .filter(loc => loc.location === location)
      .map((name) => {
        const nameKey = name.name;
        const namevalue = name.residents
          .filter((gender) => {
            if (sex) return gender.sex === sex;
            return true;
          })
          .map(item => item.name);
        if (sorted) namevalue.sort();
        return { [nameKey]: namevalue };
      });
    animalLocationObject[location] = animalKey;
  });
  return animalLocationObject;
}

function animalMap(options = {}) {
  // aula com Oliva
  // os parametros (options) podem ser:
  // includeNames: true or false;
  // sex: 'female' ou 'male';
  // sorted: true or false;
  // requisito 01
  // Sem parâmetros, retorna animais categorizados por localização
  // preciso mapear as localizacoes
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return animalsPerLocation(locations);
  const { includeNames, sorted, sex } = options;
  if (!includeNames) return animalsPerLocation(locations);
  return includeName(locations, sorted, sex);
}

// 10th requirement
function schedule(dayName) {
  const daysOfTheWeek = (dayName !== undefined && dayName !== '') ? [dayName] : Object.keys(data.hours);
  const answer = {};
  // aqui foi recebido o dayName.
  // Caso seja uma string, guardamos o nome num array para buscarmos as infos desse dia.
  // Caso seja undefined, pegamos todas as keys de opcoes de dias dentro do objeto hours

  daysOfTheWeek.forEach((key) => {
    let { open, close } = data.hours[key];
    close = (close > 12) ? close - 12 : close;
    open = (open > 12) ? open - 12 : open;
    const hour = (open !== 0 && close !== 0) ? `Open from ${open}am until ${close}pm` : 'CLOSED';
    answer[key] = hour;
  });
  // no forEach pegamos cada dia, e, para manter no padrao de 12hrs, diminuimos 12 do valor.
  // Exemplo: Se fecha as 18hrs (18-12=6hrs) fecha as
  // 6hrs da tarde, e criamos uma string com esses dados.
  // Se o horario for igual a 0, retornamos 'CLOSED'.
  return answer;
}

// 11th requirement
function oldestFromFirstSpecies(id) {
  const animalId = (data.employees.find(employee => employee.id === id).responsibleFor[0]);
  return (Object
    .values(data.animals
      .find(animal => animal.id === animalId)
      .residents.sort((a, b) => b.age - a.age)[0]));
}

// 12th requirement
function increasePrices(percentage) {
  const entrancePrices = Object.keys(data.prices);
  entrancePrices.forEach((key) => {
    data.prices[key] = Math.round(((1 + (0.01 * percentage)) * data.prices[key]) * 100) / 100;
  });
  // para cada key (adult, senior ou child) alteramos o valor
  // Usamos math.round para arredondar o valor.
  // fazemos *100 e depois /100 para arredondar em duas casas decimais.
}

// 13th requirement
function employeeCoverage(idOrName) {
  const obj = {};
  employees.map((employee) => {
    employee.animalList = employee.responsibleFor.map(idAnimal => animals.find(animal =>
      animal.id === idAnimal).name);
    return employee;
  });
  if (idOrName === undefined) {
    employees.forEach((element) => {
      const nomes = `${element.firstName} ${element.lastName}`;
      obj[nomes] = element.animalList;
    });
    return obj;
  }
  const people = employees.find(element => idOrName === element.id ||
      idOrName === element.firstName || idOrName === element.lastName);
  const nomes = `${people.firstName} ${people.lastName}`;
  obj[nomes] = people.responsibleFor.flatMap(idAni => animals
    .find(ani => idAni === ani.id).name);
  return obj;
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
