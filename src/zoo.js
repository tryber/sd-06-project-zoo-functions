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
// ----------------------------------------------------------------------------------------
// Convenção de abreviações
// anm = animal | anms = animals | grp = group | grps = groups | arr= array | vfy = verify
// rsd = residents | obj = object | res = result | per = person | sts = states | st = state
// cst = construct
// ----------------------------------------------------------------------------------------
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  // crossAnmArraySearchingId: dado um id a função percorre todo o array data.animals...
  // passando por cada grupo de animal e verificando se o grupo possui o id passado, ...
  // se der match esse grupo é retornados dentro do acumulador grpsWithId.
  // OBS: se mais de um grupo de animais possuir um mesmo id, ambos os grupos serão retornados...
  // nessa implementação.
  const crossAnmArrSearching = (id) => {
    const vfyAnmGrp = (grpsWithId, anmGrp) => {
      const comparison = anmGrp.id === id ? anmGrp : grpsWithId;
      return comparison;
    };
    return data.animals.reduce(vfyAnmGrp);
  };

  // Se soubessemos que só tem um id para procuramos, a função acima bastaria para fazer isso...
  // mas como não sabemos implementamos um reduce para percorrer todo o input id, pois pode ser...
  // um único valor ou um array de ids.
  // E para cumprir o requisito de retornar um array vazio caso a função seja chamada sem passar...
  // nenhum valor, iniciamos o acumulador anmsGrpsThatMatchIds como um array vazio.
  return ids.reduce((anmsGrpsWithIds, id) => anmsGrpsWithIds.concat(crossAnmArrSearching(id)), []);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Tendo vários objetos em animals, precisamos do objeto que engloba a espécie definida em animal
  // No caso sabemos que só tem um objeto para cada espécie, então basta achar o primeiro objeto...
  // que satisfaz a condição de conter a espécie com o find
  // objThatInc (Object That Includes Species)
  const objThatInc = data.animals.find(obj => obj.name === animal);

  // Tendo o objeto basta verificarmos se todos os animas (residents) tem idade igual ou acima...
  // da idade especificada.
  const response = objThatInc.residents.every(eachRsd => eachRsd.age >= age);
  return response;
}

function employeeByName(employeeName) {
  // seu código aqui
  // Tendo o input, precisamos percorrer cada objeto do array employees contido em data...
  // e verificar se o firstName ou o lastName do objeto é igual ao input, caso seja, retornamos...
  // o objeto que satisfaz a condição, senão, retornamos um objeto vazio.
  const { employees } = data;
  const name = employeeName;
  const identify = employees.find(obj => obj.firstName === name || obj.lastName === name);
  return identify || {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  // Precisamos achar dentro de employees contido em data, o objeto que tem id igual ao input
  // Encontrado esse objeto precisamos verificar se a propriedade responsibleFor é vazia ou nao.
  return data.employees.some(obj => obj.managers.includes(id));
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const meanObj = species ? data.animals.find(obj => obj.name === species) : data.animals;
  const counter = {
    countAll: () => {
      const objToReturn = {};
      meanObj.forEach((obj) => {
        const key = obj.name;
        const value = obj.residents.length;
        objToReturn[key] = value;
      });
      return objToReturn;
    },
    countOne: () => `${meanObj.residents.length}`,
  };
  return (meanObj.length > 1) ? counter.countAll() : counter.countOne();
}


function entryCalculator(entrants) {
  // seu código aqui
  if (entrants !== undefined && Object.keys(entrants).length > 0) {
    return Object.keys(entrants).reduce((sum, per) => sum + (data.prices[per] * entrants[per]), 0);
  }
  return 0;
}


// ---------------------------------------ANIMAL MAP------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Função de apoio à animalMap para evitar complexidade cognitiva e excedente de linhas
function anmsObjCst(anmGrp, options) {
  // Passo 3 - Desconstrução do input
  const keysOfInput = (options !== undefined) ? Object.keys(options) : [];
  const includeNames = keysOfInput.includes('includeNames') ? options.includeNames : false;
  const sex = keysOfInput.includes('sex') ? options.sex : false;
  const sorted = keysOfInput.includes('sorted') ? options.sorted : false;

  // Passo 4 - Essa é a parte que varia conforma os inputs recebidos
  let animalsObj = {};
  const concatNames = (anmNames, anm) => anmNames.concat(anm.name);
  const filterSex = anm => (anm.sex === sex);
  // Caso 2 - includeNames === true
  if (includeNames && !sex && !sorted) {
    animalsObj[anmGrp.name] = anmGrp.residents.reduce(concatNames, []);
    // Caso 1 - nenhum parâmetro | // Caso 6 - includeNames === false
  } else if (!includeNames) {
    animalsObj = anmGrp.name;
    // Caso 3 - sorted === true e includeNames === true
  } else if (includeNames && !sex && sorted) {
    animalsObj[anmGrp.name] = anmGrp.residents.reduce(concatNames, [])
    animalsObj[anmGrp.name] = animalsObj[anmGrp.name].sort();
    // Caso 4 - sex === 'male'/'female' e includeNames === true
  } else if (includeNames && sex && !sorted) {
    animalsObj[anmGrp.name] = anmGrp.residents.filter(filterSex)
    animalsObj[anmGrp.name] = animalsObj[anmGrp.name].reduce(concatNames, []);
    // Caso 5 - sex === 'male'/'female' e includeNames === true e sorted === true
  } else if (includeNames && sex && sorted) {
    animalsObj[anmGrp.name] = anmGrp.residents.filter(filterSex)
    animalsObj[anmGrp.name] = animalsObj[anmGrp.name].reduce(concatNames, [])
    animalsObj[anmGrp.name] = animalsObj[anmGrp.name].sort();
  }
  return animalsObj;
}

function animalMap(options) {
  // Passo 1
  // Primeiro passo é encontrar quais são os estados para depois verificarmos quais grupos de ...
  // animais estão localizados no estado, e posteriormente retornarmos os animais conforme as ...
  // especificações recebidas como options. Nessa implementação percorremos o array data.animals...
  // e pegamos todos os valores de location. Porém pode haver repetições de um mesmo estado,...
  // então para tirar essa redundância passamos para um novo array (allStates) apenas os valores...
  // que ele não possui ainda.
  const statesWithRedundance = data.animals.reduce((sts, obj) => sts.concat(obj.location), []);
  const allStates = [];
  statesWithRedundance.forEach((st) => { if (!allStates.includes(st)) allStates.push(st); });

  // Passo 2
  // Aqui nós percorremos todo o array de estados (allStates), e para cada estado (state),...
  // percorremos todo o array data.animals para ver quais grupos de animais possuem localização...
  // igual ao estado (location === state).
  const objToReturn = {};
  allStates.forEach((st) => {
    objToReturn[st] = data.animals.reduce((anmInSt, anmGrp) => {
      const res = (anmGrp.location === st) ? anmInSt.concat(anmsObjCst(anmGrp, options)) : anmInSt;
      return res;
    }, []);
  });
  // Grand finale - retorna o objeto construido conforme o input
  return objToReturn;
}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

function schedule(dayName) {
  // seu código aqui
  const objToReturn = {};
  const objKeys = (dayName !== undefined && dayName !== '') ? [dayName] : Object.keys(data.hours);
  objKeys.forEach((key) => {
    let { open, close } = data.hours[key];
    close = (close > 12) ? close - 12 : close;
    open = (open > 12) ? open - 12 : open;
    const value = (open !== 0 && close !== 0) ? `Open from ${open}am until ${close}pm` : 'CLOSED';
    objToReturn[key] = value;
  });
  return objToReturn;
}

function oldestFromFirstSpecies(id) {
  // seu código
  const anmGrpId = data.employees.find(obj => obj.id === id).responsibleFor[0];
  const anmGrp = data.animals.find(obj => obj.id === anmGrpId);
  let oldest = anmGrp.residents[0];
  anmGrp.residents.forEach((anm) => {
    oldest = (anm.age > oldest.age) ? anm : oldest;
  });
  return [oldest.name, oldest.sex, oldest.age];
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(data.prices).forEach((key) => {
    data.prices[key] = Math.round(((1 + (0.01 * percentage)) * data.prices[key]) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
  let objEmployees;
  const input = idOrName;
  if (idOrName !== undefined && idOrName !== '') {
    const vfy = obj => obj.id === input || obj.firstName === input || obj.lastName === input;
    objEmployees = [data.employees.find(obj => vfy(obj))];
  } else {
    objEmployees = data.employees;
  }
  const objToReturn = {};
  objEmployees.forEach((objEmployee) => {
    const idsOfAnimalsCovered = objEmployee.responsibleFor;
    const key = `${objEmployee.firstName} ${objEmployee.lastName}`;
    const anmGrpName = id => data.animals.find(obj => obj.id === id).name;
    const value = idsOfAnimalsCovered.reduce((res, id) => res.concat(anmGrpName(id)), []);
    objToReturn[key] = value;
  });
  return objToReturn;
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
