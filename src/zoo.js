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
const { animals, employees, prices } = require('./data');

/* 1- Implemente a função animalsByIds: Caso receba nenhum parâmetro, necessário retornar
um array vazio. Ao receber como parâmetro um único id, retorna os animais com este id.
Ao receber mais de um id, retorna os animais que têm um desses ids. */
function animalsByIds(...ids) {
  // seu código aqui
  const animalsArray = [];
  if (ids.length === 0) {
    return [];
  }
  ids.forEach((id) => {
    animals.filter((animal) => {
      if (animal.id === id) {
        animalsArray.push(animal);
      } return undefined;
    });
  });
  return animalsArray;
}

/* 2- Implemente a função animalsOlderThan: Ao passar o nome de uma espécie e uma idade,
testa se todos os animais desta espécie possuem a idade mínima especificada */
function animalsOlderThan(animal, age) {
  // seu código aqui
  const ageArray = [];
  animals.filter((animalsName) => {
    if (animalsName.name === animal) {
      animalsName.residents.forEach(elementAnimal => ageArray.push(elementAnimal.age));
    } return undefined;
  });
  return ageArray.every(thisAge => thisAge > age);
}

/* 3- Implemente a função employeeByName: Sem parâmetros, retorna um objeto vazio.
Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
Quando provido o último nome do funcionário, retorna o objeto do funcionário */
function employeeByName(...employeeName) {
  // seu código aqui
  let worker = {};
  employeeName.forEach((objEmployyeName) => {
    employees.map((workerName) => {
      if ((workerName.firstName === objEmployyeName) || (workerName.lastName === objEmployyeName)) {
        worker = workerName;
      } return undefined;
    });
  });
  return worker;
}

/* 4- Implemente a função createEmployee: Cria um novo colaborador a partir de objetos
contendo informações pessoais e gerentes e animais gerenciados */
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign({}, personalInfo, associatedWith);
}

/* 5- Implemente a função isManager: Testa se o id passado é de um gerente */
function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.managers.includes(id));
}

/* 6- Implemente a função addEmployee: Adiciona um funcionário no fim da lista */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employeeNew = { id, firstName, lastName, managers, responsibleFor };
  employees.push(employeeNew);
  return employees;
}

/* 7- Implemente a função animalCount: Sem parâmetros, retorna animais e suas quantidades.
Com o nome de uma espécie de animal, retorna somente a quantidade */
function animalCount(species) {
  // seu código aqui
  const specie = [];
  const specieNumbers = [];
  const specieAndNumbers = {};
  animals.forEach(animal => specie.push(animal.name));
  animals.forEach(animal => specieNumbers.push(animal.residents.length));
  specie.forEach(function san(animal, index) {
    specieAndNumbers[animal] = specieNumbers[index];
  });
  if (species != null) {
    const amount = animals.find(animal => animal.name === species);
    return amount.residents.length;
  }
  return specieAndNumbers;
}

/* 8- Implemente a função entryCalculator:
Retorna 0 se nenhum argumento for passado. Retorna 0 se um objeto vazio for passado.
Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos */
function entryCalculator(entrants) {
  // seu código aqui
  let result = 0;
  if ((!entrants) || (entrants === undefined)) {
  return result;
  }
  Object.keys(entrants).forEach((vAtual, index) => {
    result += prices[vAtual] * Object.values(entrants)[index];
  });
  return result;
}

/* 9- Implemente a função animalMap:
Sem parâmetros, retorna animais categorizados por localização
Com a opção includeNames: true especificada, retorna nomes de animais
Com a opção sorted: true especificada, retorna nomes de animais ordenados
Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais macho/fêmea
Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada */
function animalMap(options) {
  // seu código aqui
}

/* 10- Implemente a função schedule:
Sem parâmetros, retorna um cronograma legível para humanos
Se um único dia for passado, retorna somente este dia em um formato legível para humanos */
function schedule(dayName) {
//   // seu código aqui
//   function lock (hora) {
//     if (hora > 12) {
//      return hora -= 12;
//     }
//   };
//   console.log(lock(hours.Tuesday.close))
//   let allDay = {
//     'Tuesday': `Open from ${hours.Tuesday.open}am until ${lock(hours.Tuesday.close)}pm`,
//     'Wednesday': `Open from ${hours.Wednesday.open}am until ${lock(hours.Wednesday.close)}pm`,
//     'Thursday': `Open from ${hours.Thursday.open}am until ${lock(hours.Thursday.close)}pm`,
//     'Friday': `Open from ${hours.Friday.open}am until ${lock(hours.Friday.close)}pm`,
//     'Saturday': `Open from ${hours.Saturday.open}am until ${lock(hours.Saturday.close)}pm`,
//     'Sunday': `Open from ${hours.Sunday.open}am until ${lock(hours.Sunday.close)}pm`,
//     'Monday': `CLOSED`
//   };
//   let day = `${dayName}: Open from ${hours[dayName].open}am until ${hours[dayName].close}pm`;
//   if (dayName === 'Monday') {
//     day = `${dayName}: CLOSED`;
//     return day;
//   } else if (!dayName) {
//     return allDay;
//   }
//   return day;
}
// console.log(schedule('Tuesday'))

/* 11- Implemente a função oldestFromFirstSpecies:
Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado
pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie */

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const specieById = employees.find(worker => worker.id === id).responsibleFor[0];
  const searchInSpecie = animals.find(specie => specie.id === specieById).residents;
  searchInSpecie.sort((a, b) => {
    if (a.age > b.age) {
      return -1;
    }
    if (a.age < b.age) {
      return 1;
    }
    return 0;
  });
  return Object.values(searchInSpecie[0]);
}

/* 12- Implemente a função increasePrices:
Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais */
function increasePrices(percentage) {
  // seu código aqui
  function calcPercentage(number) {
    return Math.round((number + (number * percentage * 0.01)) * 100) / 100;
  }
  Object.keys(prices).forEach(function run(vAtual, index) {
    prices[vAtual] = calcPercentage(prices[vAtual]);
  });
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
/*
PRINCIPAIS REFERENCIAS
GITHUB CONSULTADOS:
ANDERSSON STUBER, HAVYNER CAETANO, ISADORA KOGA, MARIO DUARTE,
MATHEUS COUTINHO CAVALCANTE, WILIAM GOMES.

OUTROS SITES:
https://developer.mozilla.org
https://www.w3schools.com
https://medium.com
https://www.devmedia.com.br
https://pt.stackoverflow.com
https://desenvolvimentoparaweb.com
https://javascript.info
https://www.it-swarm.dev/
https://www.linhadecomando.com/

YOUTUBE = "tantaum de canal"

DESENVOLVIDO COM O APOIOD DE:
ANDERSSON STUBER, CLEBER FONTINELE, ISADORA KOGA, MARIO DUARTE, PAULO LINS E WILIAM GOMES.
AGRADECIMETNOS ESPECIAIS:
ANDERSSON STUBER QUE ME AJUDOU DO INCIO AO FIM DO PROJETO!
E A MARIO DUARTE QUE NOS CEDEU GRANDE PARTE DE SEU DOMINGO!
*/
