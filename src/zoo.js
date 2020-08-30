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

const { animals, employees, prices, hours } = data;

// -----------------------------------------------------------------------

// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna os animais com este id
// Ao receber mais de um id, retorna os animais que têm um desses ids

function animalsByIds(...ids) { // rest paramenter returns []
  if (ids.length === 0) {
    return [];
  }

  const result = [];
  ids.forEach(currentValue => result.push(animals.find(element => element.id === currentValue)));

  return result;
}

// console.log(animalsByIds());
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce',_
// 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

// ----------------------------------------------------------------------

// Ao passar o nome de uma espécie e uma idade, testa se todos os animais
// desta espécie possuem a idade mínima especificada
function animalsOlderThan(animal, age) {
  return animals
  .find(element => element.name === animal).residents // filtrar apenas 1
  .every(currentValue => currentValue.age >= age); // todos mais velhos que
}

// console.log(animalsOlderThan('otters', 7));
// console.log(animalsOlderThan('penguins', 10));

// -----------------------------------------------------------------------

// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna {} do funcionário
// Quando provido o último nome do funcionário, retorna {} do funcionário

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }

  return employees
    .find(element => element.firstName === employeeName || element.lastName === employeeName);
}

// console.log(employeeByName());
// console.log(employeeByName('Emery'));
// console.log(employeeByName('Wishart'));

// -----------------------------------------------------------------------
// Fonte: Mozzila
// O método Object.assign() é usado para copiar valores de todas as propriedades de UM ou MAIS
// objetos de origem para UM objeto destino, retornando o objeto de destino
// Sintaxe: Object.assign(destino, ...origens)

// Cria um novo colaborador a partir de objetos contendo informações pessoais,
// gerentes e animais gerenciados

// Na função createEmployee UM objeto destino vazio {}, recebe os objetos origens
// personalInfo && associatedWith recebidos por parâmetro

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

// const personalInfo = {
//   id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
//   firstName: 'John',
//   lastName: 'Doe',
// };

// const associatedWith = {
//   managers: [
//     'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     '9e7d4524-363c-416a-8759-8aa7e50c0992'
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'
//   ]
// };

// console.log(createEmployee(personalInfo, associatedWith));

// -----------------------------------------------------------------------

// Testa se o id passado é de um gerente'

function isManager(id) {
  const manager = [];
  employees.forEach(employee => manager.push(employee.managers
    .find(element => element === id)));

  return manager.some(value => value === id);
}

  // console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));
  // console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

// -----------------------------------------------------------------------

// Adiciona um funcionário no fim da lista

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObj = {};
  newObj.id = id;
  newObj.firstName = firstName;
  newObj.lastName = lastName;
  newObj.managers = managers;
  newObj.responsibleFor = responsibleFor;
  employees.push(newObj);
  return employees.length;
}

// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));

// -----------------------------------------------------------------------

// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach((animal) => {
      const specieName = animal.name;
      const totalResidents = animal.residents.length;
      obj[specieName] = totalResidents;
    });
    return obj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

// console.log(animalCount());
// console.log(animalCount('lions'));
// console.log(animalCount('snakes'));

// -----------------------------------------------------------------------

// Retorna 0 se nenhum argumento for passado'
// Retorna 0 se um objeto vazio for passado'
// Retorna o preço total a ser cobrado dado o número de adultos,_
// crianças e idosos'

function entryCalculator(entrants = {}) {
  if (Object.keys(entrants).length === 0) {
    return 0;
  }

  const { Adult: totalAdults, Child: totalChilds, Senior: totalSeniors } = entrants;

  const priceAdult = prices.Adult;
  const priceChild = prices.Child;
  const priceSenior = prices.Senior;

  const totalPriceAdults = totalAdults !== undefined ? totalAdults * priceAdult : 0;
  const totalPriceChilds = totalChilds !== undefined ? totalChilds * priceChild : 0;
  const totalPriceSeniors = totalSeniors !== undefined ? totalSeniors * priceSenior : 0;

  return totalPriceAdults + totalPriceChilds + totalPriceSeniors;
}

// console.log(entryCalculator());
// console.log(entryCalculator({}));
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));
// console.log(entryCalculator({ 'Adult': 1 }));
// console.log(entryCalculator({ 'Senior': 1 }));
// console.log(entryCalculator({ 'Child': 1 }));
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 }));

// -----------------------------------------------------------------------

// A solução desse requisito foi baseada na solução guiada realizada pelo Gabriel Oliva.
// Sem parâmetros, retorna animais categorizados por localização
// Com a opção includeNames: true especificada, retorna nomes de animais
// Com a opção sorted: true especificada, retorna nomes de animais ordenados
// Com a opção sex: \'female\' ou sex: \'male\` especificada,
// retorna somente nomes de animais macho/fêmea
// Com a opção sex: \'female\' ou sex: \'male\' especificada e a opção sort: true especificada,
// retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados

function retrieveSpeciesByLocation(regions) {
  const speciesByLocationObject = {};

  regions.forEach((region) => {
    const animalsBySpecies = animals
      .filter(animal => animal.location === region)
      .map(animal => animal.name);

    if (animalsBySpecies.length !== 0) {
      speciesByLocationObject[region] = animalsBySpecies;
    }
  });
  return speciesByLocationObject;
}

function retrieveSpecies(regions, sorted, sex) {
  const speciesAndNamesByLocationObject = {};

  regions.forEach((region) => {
    const animalsBySpeciesAndNames = animals
      .filter(animal => animal.location === region)
      .map((animal) => {
        const nameKey = animal.name;
        const nameValues = animal.residents
        .filter((resident) => {
          if (sex !== undefined) { // daria para usar operador ternário, mas preferi deixar raiz
            return resident.sex === sex; // true: retorna array filtrada por sex (male/female).
          }
          return true; // false: retorna todo arrau sem filtrar nada (passa-tudo).
        })
        .map(resident => resident.name); // map, pois residents = []

        if (sorted) nameValues.sort(); // nameValues é uma [] de strings, assim sort() puro

        return { [nameKey]: nameValues }; // retorna objeto para 'animalsBySpeciesAndNames'
      });

    if (animalsBySpeciesAndNames.length !== 0) {
      speciesAndNamesByLocationObject[region] = animalsBySpeciesAndNames;
    }
  });
  return speciesAndNamesByLocationObject;
}

function animalMap(obj = {}) {
  const regions = ['NE', 'NW', 'SE', 'SW'];
  const { includeNames, sorted, sex } = obj; // undefined || true / true / male || female

  if (Object.keys(obj).length === 0 || !includeNames) return retrieveSpeciesByLocation(regions);
  return retrieveSpecies(regions, sorted, sex);
}

// console.log(animalMap());
// console.log(animalMap({ includeNames: true }));
// console.log(animalMap({ includeNames: true, sorted: true}));
// console.log(animalMap({ includeNames: true, sorted: true}));
// console.log(animalMap({ includeNames: true, sex: 'female'}));

// -----------------------------------------------------------------------

// A solução desse requisito foi baseada na solução guiada realizada pelo Gabriel Oliva.
// Sem parâmetros, retorna um cronograma legível para humanos'
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos

function schedule(dayName) {
  const daySchedule = {};
  const days = Object.keys(hours);

  days.forEach((day) => {
    if (day === 'Monday') {
      daySchedule[day] = 'CLOSED';
    } else {
      const opening = hours[day].open;
      const closing = hours[day].close - 12;
      daySchedule[day] = `Open from ${opening}am until ${closing}pm`;
    }
  });

  if (dayName === undefined || dayName.length === 0) {
    return daySchedule;
  }
  return { [dayName]: daySchedule[dayName] };
}

// console.log(schedule());
// console.log(schedule(''));
// console.log(schedule('Monday'));
// console.log(schedule('Tuesday'))

// -----------------------------------------------------------------------

// Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo
// funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie

function oldestFromFirstSpecies(id) {
  const animalID = employees.find(employee => employee.id === id).responsibleFor;
  const firstAninalId = animalID[0];
  const species = animals.find(animal => animal.id === firstAninalId).residents;
  species.sort((entry1, entry2) => (entry1.age < entry2.age ? 1 : -1));
  const obj = species.find(animal => animal.age > 0);
  const result = [obj.name, obj.sex, obj.age];
  return result;
}

// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

// -----------------------------------------------------------------------

// Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais

function increasePrices(percentage) {
  const adultPrice = prices.Adult;
  const childPrice = prices.Child;
  const seniorPrice = prices.Senior;

  const increasedAdultPrice = adultPrice * (1 + (percentage / 100));
  prices.Adult = (Math.round(increasedAdultPrice * 100) / 100);

  const increasedseniorPrice = seniorPrice * (1 + (percentage / 100));
  prices.Senior = (Math.round(increasedseniorPrice * 100) / 100);

  const increasedChildPrice = childPrice * (1 + (percentage / 100));
  prices.Child = (Math.round(increasedChildPrice * 100) / 100);
}

// -----------------------------------------------------------------------

// A solução desse requisito foi baseada na solução guiada realizada pelo Icaro Harry.
// Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são
// responsáveis.
// Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável.
// Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é
// responsável.
// Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é
// responsável.

function retrieveSpeciesName(speciesIds) {
  const speciesName = [];
  speciesIds.forEach(id => speciesName.push(animals.find(animal => animal.id === id).name));
  return speciesName;
}

function employeeCoverage(idOrName) {
  if (!idOrName || idOrName.length === 0) {
    const obj = {};
    employees.forEach((employee) => {
      const nameKey = `${employee.firstName} ${employee.lastName}`;
      const speciesIds = employee.responsibleFor;
      const species = retrieveSpeciesName(speciesIds);
      obj[nameKey] = species;
    });
    return obj;
  }
  const obj = {};
  const foundEmployee = employees
  .find(el => el.id === idOrName || el.firstName === idOrName || el.lastName === idOrName);
  const nameKey = `${foundEmployee.firstName} ${foundEmployee.lastName}`;
  const speciesIds = foundEmployee.responsibleFor;
  const species = retrieveSpeciesName(speciesIds);
  obj[nameKey] = species;
  return obj;
}
// console.log(employeeCoverage(''));
// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
// console.log(employeeCoverage('Stephanie'));
// console.log(employeeCoverage('Azevado'));

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
