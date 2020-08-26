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
  const arrayResult = [];// array para receber animais advindos do rest
  ids.forEach(id => arrayResult // array push tds animais filtrados de id igual retornados no filter
    .push(...animals
      .filter(animal => animal.id === id)));
  return arrayResult;
}

function animalsOlderThan(animal, age) { // array com tds animals/animal
  const animalCollectionType = animals.filter(animalType => animalType.name === animal);
  return animalCollectionType.every(animalCollectionResident => animalCollectionResident.residents
    .every(animalResidents => animalResidents.age > age));
}// s/ este every ele ñ percorre atributo age

function employeeByName(employeeName) {
  if (!employeeName) return {};// Destructuring do employeeName
  const condicao = ({ firstName, lastName }) => // qq q preencha a condição
    (firstName === employeeName || lastName === employeeName);
  const result = employees.filter(condicao);
  return result[0];
}

function createEmployee(personalInfo, associatedWith) { // assign p/ 'mesclar' as 2 entradas
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) { // 2 some intercalados 2 x percorrer
  return employees.some(element => element.managers.some(el => el === id));
}
// default value, push manda p/ último
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const returnObject = {};
  animals.forEach(function (element) {
    returnObject[element.name] = element.residents.length;
  });
  if (species === undefined) {
    return returnObject;
  }
  const animalNumber = returnObject[species];
  return animalNumber;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants) === undefined) return 0;
  const ageEntrants = Object.keys(entrants);// faixa etária dos visitantes {}
  const numOfEntrants = Object.values(entrants);// quantos entraram {}
  let loopBillValue = 0;            // acumulador,   valor idade/preço, index
  const totalBillValue = ageEntrants.reduce((totalBill, ageValue, i) => {
    loopBillValue = prices[ageValue] * numOfEntrants[i];
    // cada loop pega preço tb * numero de visitantes
    return totalBill + loopBillValue;
  }, 0);
  return totalBillValue;
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

// PARAMETROS PODEM TER:
// includeNames: true
// sex: 'female'
// sorted: true

function animalMap(options) {    // Uso do data defido ao nome igual ao destructuring do começo
  // const locations = ['NE', 'NW', 'SE', 'SW'];

  // if (!options) {
  //   const animalsPerLocation = {};
  //   locations.forEach((location) => {
  //     const animals = data.animals
  //     .filter(animal => animal.location === location)
  //     .map(animal => animal.name);
  //     if (animals.length !== 0) animalsPerLocation[location] = animals;
  //   });
  //   return animalsPerLocation;
  // }
}

function schedule(dayName) {
  const dayObject = Object.keys(hours);// array dos dias
  const visitTime = Object.values(hours);// array hs obs: acesso pelo .open/.close
  const newObject = {};// objeto p/ salvar dias/linhas do resultado/template string
  dayObject.forEach((day, i) => { // p/ cada dia cria um value/template,obs: monday = close
    if (day === 'Monday') {
      newObject[day] = 'CLOSED';
    } else {
      newObject[day] = `Open from ${visitTime[i].open}am until ${visitTime[i].close - 12}pm`;
    }
  });
  if (dayName === undefined) {
    return newObject;
  }
  const line = {};// objeto resposta default
  line[dayName] = newObject[dayName];
  return line;
}

function oldestFromFirstSpecies(id) {
  const firstSpecie = employees // id da primeira especie q employee/id é responsável
  .find(employee => employee.id === id).responsibleFor[0];
  const residentAgeArray = animals // filtrar  residents
  .find(animal => animal.id === firstSpecie).residents;
  const agesArray = [];// array com idades/animais
  residentAgeArray.forEach(animal => agesArray.push(animal.age));
  const higherAge = agesArray.sort((a, b) => b - a)[0];
  const elFinale = residentAgeArray.find(animal => (animal.age === higherAge));
  return [elFinale.name, elFinale.sex, elFinale.age];
}
console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

function increasePrices(percentage) {
  const percentageValue = (percentage / 100) + 1;// base percentual/aumento advinda via parâmetro
  prices.Adult = (Math.round((prices.Adult * percentageValue) * 100) / 100);
  prices.Senior = (Math.round((prices.Senior * percentageValue) * 100) / 100);
  prices.Child = (Math.round((prices.Child * percentageValue) * 100) / 100);
  return prices;
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
