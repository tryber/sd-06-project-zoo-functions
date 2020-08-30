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

// 1 - Implemente a função animalsByIds:
// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids
function animalsByIds(...ids) {
  // seu código aqui
  const emptyArray = [];
  if (ids.length === 0) return emptyArray;
  if (ids.length === 1) {
    return animals.filter(singleId => singleId.id === ids[0]);
  }
  if (ids.length > 1) {
    return animals.filter(moreThanOneId => ids.includes(moreThanOneId.id));
  }
  return undefined;
}

// 2- Implemente a função animalsOlderThan:
// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a idade mínima especificada
function animalsOlderThan(animal, age) {
  // seu código aqui
  const speciesName = animals.filter(species => species.name === animal);
  const allAnimals = speciesName.flatMap(animalList => animalList.residents);
  return allAnimals.every(animalAge => animalAge.age >= age);
}

// 3- Implemente a função employeeByName:
// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário
function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const providedName = employees
    .filter(name => name.firstName === employeeName || name.lastName === employeeName);
  return providedName[0];
}

// 4- Implemente a função createEmployee:
// Cria um novo colaborador a partir de objetos contendo informações
// pessoais e gerentes e animais gerenciados.
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign(personalInfo, associatedWith);
}

// 5- Implemente a função isManager:
// Testa se o id passado é de um gerente
function isManager(id) {
  // seu código aqui
  return employees.some(manager => manager.managers.includes(id));
}

// 6- Implemente a função addEmployee:
// Adiciona um funcionário no fim da lista
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const neyEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(neyEmployee);
}

// 7- Implemente a função animalCount:
// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade
function animalCount(species) {
  // seu código aqui
  // **** com reduce ****
  if (!species) {
    return data.animals.reduce((accumulator, currentValue) =>
      ({ ...accumulator, [currentValue.name]: currentValue.residents.length }), {});
  }
  return data.animals.find(specieName => specieName.name === species).residents.length;
}
// **** com for ****
// const retorno1 = {};
// for (const animal of data.animals) {
//   retorno1[animal.name] = animal.residents.length;
// }
// console.log(retorno1);

// **** com forEach ****
// const retorno2 = {};
// data.animals.forEach(animal => {
//   retorno2[animal.name] = animal.residents.length;
// });
// console.log(retorno2);
// if (!species) return (retorno2);

// 8- Implemente a função entryCalculator:
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  if (Object.entries(entrants).length === 0) return 0;
  // Object.entries(objeto) converte o objeto em um array
  let totalPrice = 0;
  if (entrants.Adult) {
    totalPrice += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Senior) {
    totalPrice += entrants.Senior * data.prices.Senior;
  }
  if (entrants.Child) {
    totalPrice += entrants.Child * prices.Child;
  }
  console.log(totalPrice);
  return totalPrice;
}

// 9- Implemente a função animalMap:
// Sem parâmetros, retorna animais categorizados por localização
// Com a opção includeNames: true especificada, retorna nomes de animais
// Com a opção sorted: true especificada, retorna nomes de animais ordenados
// Com a opção sex: 'female' ou sex: 'male' especificada,
// retorna somente nomes de animais macho/fêmea
// Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
// retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
// A function recoverAnimalsByLocation e foi criada para refturar o código
// A function recoverAnimalsByLocationName e foi criada para refturar o código
function recoverAnimalsByLocation(animalLocation) {
  const animalsByLocation = {};
  animalLocation.forEach((location) => {
    const animals1 = data.animals
      .filter(animal => animal.location === location)
      .map(animal => animal.name);

    if (animals1.length !== 0) animalsByLocation[location] = animals1;
  });
  return animalsByLocation;
}

function recoverAnimalsByLocationName(animalLocationName, sorted, sex) {
  const animalsByLocationName = {};
  animalLocationName.forEach((location) => {
    const animals2 = data.animals
      .filter(animal => animal.location === location)
      .map((animal) => {
        const speciesName = animal.name;
        const animalName = animal.residents
          .filter((resident) => {
            const filterTheSex = sex !== undefined;
            return filterTheSex ? resident.sex === sex : true;
            // if (filterTheSex) {
            //   return resident.sex === sex;
            // } else {
            //   return true;
            // }
          })
          .map(resident => resident.name);

        if (sorted) animalName.sort();

        return { [speciesName]: animalName };
      });
    animalsByLocationName[location] = animals2;
  });
  return animalsByLocationName;
}

function animalMap(options) {
  // seu código aqui
  const animalLocation = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return recoverAnimalsByLocation(animalLocation);

  const { includeNames, sorted, sex } = options;
  // const includeNames = options.includeNames;
  // const sorted = options.sorted;
  // const sex = options.sex;

  if (!includeNames) return recoverAnimalsByLocation(animalLocation);
  // if (includeNames) return recoverAnimalsByLocationName(animalLocation, sorted, sex);
  return recoverAnimalsByLocationName(animalLocation, sorted, sex);
}

// 10- Implemente a função schedule:
// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos
function schedule(dayName) {
  // seu código aqui
  const allDays = Object.keys(data.hours);
  const openingHours = {};
  allDays.forEach((day) => {
    if (day === 'Monday') {
      openingHours[day] = 'CLOSED';
    } else {
      const dayOpen = hours[day].open;
      const dayClose = hours[day].close - 12;
      openingHours[day] = `Open from ${dayOpen}am until ${dayClose}pm`;
    }
  });
  console.log(openingHours);

  if (!dayName) return openingHours;
  return { [dayName]: openingHours[dayName] };
}

// 11- Implemente a função oldestFromFirstSpecies:
// Passado o id de um funcionário,
// encontra a primeira espécie de animal gerenciado pelo funcionário,
// e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
function oldestFromFirstSpecies(id) {
  // seu código aqui
  const speciesOfAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const specieResident = animals.find(animal => animal.id === speciesOfAnimal).residents;
  console.log(specieResident);
  const olderAnimal = specieResident
    .reduce((accumulator, { name, sex, age }) =>
      (age > accumulator.age ? [name, sex, age] : accumulator));
  return olderAnimal;
}

// 12- Implemente a função increasePrices:
// Ao passar uma porcentagem, incrementa todos os preços,
// arrendondados em duas casas decimais
function increasePrices(percentage) {
  // seu código aqui
  const percent = percentage / 100;

  const adultPrice = data.prices.Adult + Math.round(data.prices.Adult * percentage) / 100;
  data.prices.Adult = parseFloat(adultPrice.toFixed(2));

  data.prices.Senior = Math.round((data.prices.Senior + (data.prices.Senior * percent)) * 100) / 100;
  
  data.prices.Child = Math.round((data.prices.Child + (data.prices.Child * percent)) * 100) / 100;
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
