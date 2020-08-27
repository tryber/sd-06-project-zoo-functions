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
const { animals, employees, hours } = require('./data');

const animalsByIds = (...ids) => {
  const retorno = [];
  ids.forEach(id => retorno.push(data.animals.find(animal => animal.id === id)));
  return retorno;
};

const animalsOlderThan = (name, age) =>
animals.find(animal => animal.name === name).residents.every(bixo => bixo.age > age);

const employeeByName = (employeeName) => {
  if (!employeeName) return {};
  return employees.find(funcionario =>
  funcionario.firstName === employeeName ||
  funcionario.lastName === employeeName);
};

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

const isManager = id =>
  data.employees.find(employee => employee.id === id)
  .managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992';

function addEmployee(...value) {
  if (value[3] === undefined) {
    value[3] = [];
    value[4] = [];
  }
  const objeto = {
    id: value[0],
    firstName: value[1],
    lastName: value[2],
    managers: value[3],
    responsibleFor: value[4],
  };
  return data.employees.push(objeto);
}

const namesOfAnimals = data.animals.map(animal => animal.name);
const population = data.animals.map(animal => animal.residents.length);

function animalCount(species) {
  const populationOfAnimals = {};
  if (species) {
    return data.animals.find(animal => animal.name === species).residents.length;
  }
  namesOfAnimals.forEach((nameOfAnimal, index) => {
    populationOfAnimals[nameOfAnimal] = population[index];
  });
  return populationOfAnimals;
}

// refatorado a function entryCalculator.
// eu demorei mais de 6 horas pra nao conseguir fazer essa implementação
// entao eu fui buscar pro uma luz e coletei o conhecimento para concluilo
// no projeto do henrique rezendo da turma 3, ele é meu amigo.
// eu vou explicar o código aqui no comentário no entando se caso eu cair
// em uma entrevista onde eu tenha que explicalo no futuro,
// é relevante que o comentario seja apagado.
// a function retorna 0 se nao receber um objeto e 0 se o objeto estiver vazio.
// o obj segue um padrão de chave e valor, então eu separei as chaves num array.
// eu passei um reduce nesse array com um acomulador e um valor do array que é uma chave.
// no acomulador eu atribui o numero de vezes que a chave do obj que eu recebi tinha.
// vezes o valor da chave do objeto price no data tem.
// tenho certeza absoluto que consigo explicar esse código,
// certeza eu nunca chegaria nessa solução
// uma vez que eu nem sabia a sintaxe para acessar o valor de um objeto.
// depois de refletir sobre essa function lembrei
// que já ate tinha usado a sintaxe de acessar um valor
// de um objeto, na function anterior, para implementar esse valor a um objeto.
// nao consegui fazer essa assimilação,
// por tanto venho atravez deste corrigir meu comentario a respeito
// disso com a errata de que consolidei firmimente esse atributo.

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (Object.values(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, entrant) =>
  acc + (data.prices[entrant] * entrants[entrant]), 0);
}

function animalMap(options) {
  // seu código aqui
}

const retorno = {};
const o = Object.values(hours)
Object.keys(hours).forEach((day, index) => {
  retorno[day] = `Open from ${o[index].open}am until ${(o[index].close) - 12}pm`;
});
retorno['Monday'] = `CLOSED`;

function schedule(dayName) {
  if(!dayName) {
    return retorno;
  }
  const resposta = {};
  resposta[dayName] = Object.entries(retorno).find(value => dayName === value[0])[1];
  return resposta;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
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
