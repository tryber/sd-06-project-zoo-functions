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

// 1- Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids

const data = require('./data');
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  const filteredAnimals = animals.filter(animal => ids.includes(animal.id));
  return filteredAnimals;
}

// 2 - Ao passar o nome de uma espécie e uma idade, testa se todos os animais
// desta espécie possuem a idade mínima especificada

function animalsOlderThan(animal, age) {
  return animals.find(eachAnimal => eachAnimal.name === animal)
    .residents.every(residents => residents.age >= age);
}

// 3 - Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  const employee = employees.find(eachEmployee => eachEmployee.firstName === employeeName
    || eachEmployee.lastName === employeeName);
  return employee;
}

// 4- Cria um novo colaborador a partir de objetos contendo informações pessoais
// e gerentes e animais gerenciados.

function createEmployee(personalInfo, associatedWith) {
  return ({
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  });
}

// 5 - Testa se o id passado é de um gerente

function isManager(id) {
  return employees.some(manager => manager.managers.includes(id));
}

// 6 - Adiciona um funcionário no fim da lista

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

//  7- Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species = '') {
  if (species === '') {
    const animalsCount = animals.reduce((acc, cur) => {
      acc[cur.name] = cur.residents.length;
      return acc;
    }, {});
    return animalsCount;
  }
  return animals.find(wantedSpecie => wantedSpecie.name === species).residents.length;
}

// 8- Implemente a função entryCalculator:
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const keys = Object.keys(entrants);
  const values = Object.values(entrants);
  const totalBill = keys.reduce((acc, cur, index) =>
    acc + (prices[cur] * values[index]), 0);
  return totalBill;
}

// 9 - Sem parâmetros, retorna animais categorizados por localização
// Com a opção includeNames: true especificada, retorna nomes de animais
// Com a opção sorted: true especificada, retorna nomes de animais ordenados
// Com a opção sex: 'female' ou sex: 'male' especificada,
// retorna somente nomes de animais macho/fêmea
// Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
// retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada

const animalLocation = location => animals
    .filter(element => element.location === location)
    .map(animal => animal.name);

const getResidents = (animal, animalGender) => animals
    .find(animalWanted => animalWanted.name === animal).residents
    .filter(animalWanted => animalWanted.sex === animalGender || !animalGender)
    .map((element => element.name));

function animalMap(options) {
  const { includeNames, sorted, sex } = options || {};
  const result = {};
  const locations = animals.map(animal => animal.location)
  .reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
  }, []);
  locations.forEach((location) => {
    result[location] = [];
    animalLocation(location).forEach((animal) => {
      if (!options || includeNames !== true) {
        result[location].push(animal);
      } else if (sorted === true) {
        result[location].push({ [animal]: getResidents(animal, sex).sort() });
      } else {
        result[location].push({ [animal]: getResidents(animal, sex) });
      }
    });
  });
  return result;
}

const changeHour = (hour) => {
  if (hour > 12) {
    hour -= 12;
    return hour;
  }
  return hour;
};

const convertHours = (eachDay, newSchedule) => {
  const { open, close } = hours[eachDay];
  if (open === 0 && close === 0) {
    newSchedule[eachDay] = 'CLOSED';
  } else {
    newSchedule[eachDay] = `Open from ${changeHour(open)}am until ${changeHour(close)}pm`;
  }
  return newSchedule;
};

function schedule(dayName) {
  const newSchedule = {};
  if (!dayName) {
    Object.keys(hours).forEach(eachDay => convertHours(eachDay, newSchedule));
  } else {
    convertHours(dayName, newSchedule);
  }
  return newSchedule;
}

function oldestFromFirstSpecies(id) {
  const employeeResponsibleForId = employees
  .find(responsabible => responsabible.id === id).responsibleFor[0];

  const oldestAnimalObject = animals
  .find(animal => animal.id === employeeResponsibleForId)
  .residents.reduce((acc, cur) => {
    const oldestAnimal = acc.age > cur.age ? acc : cur;
    return oldestAnimal;
  });

  const { name, sex, age } = oldestAnimalObject;
  const oldestAnimalArray = [name, sex, age];
  return oldestAnimalArray;
}

function increasePrices(percentage) {
  const percentToIncrease = number =>
  Math.round((number + (number * percentage * 0.01)) * 100) / 100;
  Object.keys(prices).forEach((element) => {
    prices[element] = percentToIncrease(prices[element]);
  });
}

const searchResponsibleForId = element => element.responsibleFor
  .map(animalResponsableId => animalResponsableId);

const searchAnimalNameByResponsibleForId = id => animals
  .find(animal => animal.id === id).name;

const identifyParamater = parameter =>
    employees.find(employee =>
    employee.id === parameter || employee.firstName === parameter
    || employee.lastName === parameter);

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const employeeFullList = employees.reduce((acc, cur) => {
      acc[`${cur.firstName} ${cur.lastName}`] = searchResponsibleForId(cur)
      .map(id => searchAnimalNameByResponsibleForId(id));
      return acc;
    }, {});
    return employeeFullList;
  }
  const holder = {};
  const { firstName, lastName } = identifyParamater(idOrName);
  holder[`${firstName} ${lastName}`] = searchResponsibleForId(identifyParamater(idOrName))
  .map(id => searchAnimalNameByResponsibleForId(id));
  return holder;
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
