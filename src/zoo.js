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

function animalsByIds(...ids) {
  if (ids === []) {
    return [];
  } else if (ids.lenght === 1) {
    return data.animals.filter(animal => animal.id === ids[0]);
  }
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(animal2 => animal2.name === animal)
  .some(animal3 => animal3.residents.every(idade => idade.age > age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.filter(funcionario => (
    funcionario.firstName === employeeName || funcionario.lastName === employeeName))[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}


function isManager(id) {
  return data.employees.some(funcionario => funcionario.managers[0] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) managers = [];
  if (responsibleFor === undefined) responsibleFor = [];
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.map((animal) => {
      const nomeAnimal = animal.name;
      return { [nomeAnimal]: animal.residents.length };
    })
    .reduce((previousValue, currentValue) => Object.assign(previousValue, currentValue));
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  let soma = 0;
  if (entrants.Adult) soma += (data.prices.Adult * entrants.Adult);
  if (entrants.Child) soma += (data.prices.Child * entrants.Child);
  if (entrants.Senior) soma += (data.prices.Senior * entrants.Senior);
  return soma;
}

// Com a opção includeNames: true especificada, retorna nomes de animais
// Com a opção sorted: true especificada, retorna nomes de animais ordenados
// Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais macho/fêmea
// Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada

//Função Principal
function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return retornarAnimaisPorLocalizacao(locations);
  const {includeNames, sorted, sex} = options
  if (!includeNames) return retornarAnimaisPorLocalizacao(locations);
  return retornarAnimaisPorLocalizacaoComNome(locations, sorted, sex);
}

const retornarAnimaisPorLocalizacao = (locations) => {
  const animaisPorLocalizacao = {};
  locations.forEach(localizacao => {
    const animais = data.animals.filter(animal => animal.location === localizacao)
    .map(animal => animal.name);
    if (animais.length !== 0) animaisPorLocalizacao[localizacao] = animais;
  });
  return animaisPorLocalizacao
}

const retornarAnimaisPorLocalizacaoComNome = (locations, sorted, sex) => {
  const animaisPorLocalizacaoComNome = {};
  locations.forEach(localizacao => {
    const animais = data.animals.filter(animal => animal.location === localizacao)
    .map(animal => {
      const nameKey = animal.name
      if (sex) {
        let nameValues = animal.residents.filter(animal=> animal.sex === sex).map(resident => resident.name)
        if (sorted) nameValues.sort();
        return {[nameKey]:nameValues}
      } else {
        let nameValues = animal.residents.map(resident => resident.name)
        if (sorted) nameValues.sort();
        return {[nameKey]:nameValues}
      }
    });
    if (animais.length !== 0) animaisPorLocalizacaoComNome[localizacao] = animais;
  });
  return animaisPorLocalizacaoComNome
}

function schedule(dayName) {
  const agenda = Object.entries(data.hours);
  if (dayName === undefined) {
    const agendaNova = {};
    agenda.map((horario) => {
      if (horario[0] === 'Monday') {
        agendaNova.Monday = 'CLOSED';
        return agendaNova;
      }
      agendaNova[horario[0]] = `Open from ${horario[1].open}am until ${horario[1].close - 12}pm`;
      return agendaNova;
    });
    return agendaNova;
  }
  return agenda.filter(horario => horario[0] === dayName).map((horario) => {
    if (horario[0] === 'Monday') return { [dayName]: 'CLOSED' };
    return { [dayName]: `Open from ${horario[1].open}am until ${horario[1].close - 12}pm` };
  })[0];
}

function oldestFromFirstSpecies(id) {
  const funcionario = data.employees.filter(funcionario1 => funcionario1.id === id);
  const animal = data.animals.filter(animal1 => animal1.id === funcionario[0].responsibleFor[0]);
  const resultado = animal[0].residents.reduce((prev, curr) => (prev.age > curr.age ? prev : curr));
  return Object.values(resultado);
}

function increasePrices(percentage) {
  let { Adult, Senior, Child } = data.prices;
  Adult = Math.round((Adult + ((Adult * percentage) / 100)) * 100) / 100;
  Senior = Math.round((Senior + ((Senior * percentage) / 100)) * 100) / 100;
  Child = Math.round((Child + ((Child * percentage) / 100)) * 100) / 100;
  data.prices.Adult = Adult;
  data.prices.Senior = Senior;
  data.prices.Child = Child;
}


function employeeCoverage(idOrName) {
  const listaDeFuncionario = {};
  let funcionariosFiltrados;
  if (!idOrName) {
    funcionariosFiltrados = data.employees;
  } else {
    funcionariosFiltrados = data.employees.filter(
      funcionario =>
      funcionario.id === idOrName ||
      funcionario.firstName === idOrName ||
      funcionario.lastName === idOrName,
    );
  }
  funcionariosFiltrados.forEach((funcionario) => {
    const mappedAnimals = funcionario.responsibleFor.map(responsibleId =>
      data.animals.find(animal => animal.id === responsibleId).name);
    listaDeFuncionario[`${funcionario.firstName} ${funcionario.lastName}`] = mappedAnimals;
  });
  return listaDeFuncionario;
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
