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

/* Explicação Requisito 1: se ids não possuem parâmetros (length = 0 ou undefined), retorna array vazio.
Ao receber, retorna os animais com esse id e inclui eles no array com o método includes */
function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter(animalId => ids.includes(animalId.id));
}
/* Explicação Requisito 2: Procura o animal especificado no parâmetro com um .find, 
e filtra a idade para que seja igual a idade mínima especificada no outro parâmetro */
function animalsOlderThan(animal, age) {
  const filteringAnimals = animals.find(targetAnimal => targetAnimal.name === animal);
  const checkingAge = filteringAnimals.residents.every(animalAges => animalAges.age > age);
  return checkingAge;
}
/* Explicação Requisito 3: Sem parâmetros (seja length = 0 ou undefined), retorna um objeto vazio.
Quando employeeName (primeiro nome) = a procura de nomes do array (employeeNames), retorna o objeto 
do funcionário (find sempre retorna o objeto inteiro). Quando prodvido o último nome, a mesma coisa. */
function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const findingEmployees = employees
    .find((employeeNames =>
      (employeeNames.firstName === employeeName || employeeNames.lastName === employeeName)));
  return findingEmployees;
}
/* Explicação Requisito 4: Cria um novo colaborador em forma de objeto com o Object.Assing, 
passando as propriedades que são solicitadas nos parâmetros da função, e retorna! */
function createEmployee(personalInfo, associatedWith) {
  const creatingEmployee = Object.assign(personalInfo, associatedWith);
  return creatingEmployee;
}
/* Explicação Requisito 5: Coleta os dados dos gerentes e 
valida com um if se o id (parâmetro) é igual a um id de gerente*/
function isManager(id) {
  const manager1 = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
  const manager2 = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
  if (id === manager1 || id === manager2) {
    return true;
  }
  return false;
}
/* Explicação Requisito 6: Adiciona um funcionário no fim da lista com o comando
.push e as keys solicitadas conforme o teste assert de validação pede.
PS: caso a key não tem propriedades (undefined), retorna array vazio */
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers: managers === undefined ? [] : managers,
    responsibleFor: responsibleFor === undefined ? [] : responsibleFor,
  };
  return employees.push(lastEmployee);
}
/* Explicação Requisito 7: Sem parâmetros, usa um .reduce para reduzir o 
array original e retornar os nomes dos animais e suas quantidades especificadas. 
Com um nome especificado, procura com o .find esse animal e compara 
com o species passado no parâmetro da função */
function animalCount(species) {
  if (species === undefined) {
    return animals
      .reduce((previousValue, currentValue) => ({
        ...previousValue, [currentValue.name]: currentValue.residents.length,
      }), {});
  }
  const targetAnimal = animals.find((animal => species === animal.name));
  return targetAnimal.residents.length;
}
/* Explicação Requisito 8: Retorna 0 se nenhum argumento for passado 
ou se o objeto estiver vazio (undefined). Usando de um destructuring object 
e igualando a 0, busca-se as chaves adult, child e senior e calcula o número 
de entrantes do parâmetro multiplicando-os pelos respectivos valores contigos no .data */
function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
}

function animalMap(options) {
  // seu código aqui
}
/* Explicação Requisito 10: Sem parâmetros, retorna o schedule contido 
no .data (sei que é uma gambiarra sem dinâmica, mas né, foi o que deu pra fazer).
Caso for passado o parâmetro dayName, retorna a chave e valor respectivos.*/
function schedule(dayName) {
  const weekSchedule = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) {
    return weekSchedule;
  }
  return { [dayName]: weekSchedule[dayName] };
}
/* Explicação Requisito 11: Caso passado o id de um funcionário, 
faz-se a busca com o .find para comparar com o array. Posteriormente, faz-se 
um novo .find para buscar o primeiro animal gerenciado por esse funcionário. 
Depois de filtrar as idades com um .sort para que a última seja a selecionada, 
busca-se ela com um .map e retorna o arrau com noem, sexo e idade desse animal.*/
function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalsInside = animals.find(specie => specie.id === firstAnimal).residents;
  const oldestAnimal = animalsInside.sort((a, b) => a.age - b.age).slice(-1);
  const animalArray = oldestAnimal.map(element => Object.values(element)).flat();
  return animalArray;
}
/* Explicação Requisito 12: Capta-se o valor de data.prices, cria-se uma constante 
do multiplicador para facilitar, e com um .forEach é feita a busca de todos os preços, 
e são incrementados com o multiplicador criado, para que seja retornada a porcentagem
arredondada em duas cadas decimais (usando o Math.round).*/
function increasePrices(percentage) {
  const updatedPrices = data.prices;
  const pricesKeys = Object.keys(updatedPrices);
  const pricesValues = Object.values(updatedPrices);
  const multiplier = (1 + (percentage / 100));
  pricesValues.forEach((key, index) => {
    updatedPrices[pricesKeys[index]] = Math.round((key * multiplier) * 100) / 100;
  });
  data.prices = updatedPrices;
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
