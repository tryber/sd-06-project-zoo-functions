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
  // const returnObject = {};
  // if (species === undefined) {
  //   animals.forEach(function (element) {
  //     returnObject[element.name] = element.residents.length;
  // });}
  // animals.find(function(element){
  //   if (element.name === species){
  //     return element.name.length;
  // }
  // });
  // return returnObject;
}
// console.log(animalCount());
// console.log(animalCount('lions'));// 2
// console.log(animalCount('snakes'));// 4

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

function animalMap(options) {
  // seu código aqui
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
  // seu código aqui
}

function increasePrices(percentage) {
  const percentageValue = (percentage / 100) + 1;
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
