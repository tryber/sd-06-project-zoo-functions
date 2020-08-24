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
// ----------------------------CONVENÇÃO--DE--ABREVIAÇÕES----------------------------------
// anm = animal | anms = animals | grp = group | grps = groups | arr= array | vfy = verify
// rsd = residents | obj = object | res = result | per = person | sts = states | st = state
// cst = construct | per = person
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
  // No caso basta retornar "espalhar" os inputs recebidos na mesma ordem como foram recebidos.
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
  // Nesse caso adicionamos um novo funcionário na base de dados (data.emplyees), então podemos
  // usar um push para adionar um novo elemento ao fim do array (data.employees.push()). Como cada
  // funcionário é um objeto, temos que passar englobar todos os dados recebidos dentro de um obj
  // ({ dados }) para ser adionado pelo push.
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  // Se uma especie é passada como input, o código procura pelo grupo de animais correspondente
  // aquela espécie, senão caso não for passado nenhuma espécie como input, o código retorna todos
  // os grupos de animais (data.animals)
  const meanObj = species ? data.animals.find(obj => obj.name === species) : data.animals;

  // Aqui temos duas formas de contar o numero de animais, uma forma para o caso de termos uma
  // espécie passada como input (counterOne) e outra para contar o numero de animais caso nenhuma
  // espécie for passada como input (counterAll), que é o caso de termos todos os grupos de animais
  const counter = {
    // Aqui, como temos vários grupos de animais, construirmos um obj para retornar os dados
    // Como temos todos os grupos de animais, para cada grupo criamos, dentro do objeto de retorno,
    // um par chave e valor com o nome da espécie e o número de residentes do grupo.
    countAll: () => {
      const objToReturn = {};
      meanObj.forEach((obj) => {
        const key = obj.name;
        const value = obj.residents.length;
        objToReturn[key] = value;
      });
      return objToReturn;
    },
    // Aqui, como em meanObj só tem o grupo de animais correspondente à espécie definida, basta
    // retornarmos o número de animais residentes daquele grupo.
    countOne: () => `${meanObj.residents.length}`,
  };
  return (meanObj.length > 1) ? counter.countAll() : counter.countOne();
}


function entryCalculator(entrants) {
  // seu código aqui
  // Se o input existir e não for vazio, p/ cada chave do obj entrants ('Adult', 'Senior', 'Child')
  // realizamos a soma do valor total com um reduce. O reduce passa uma chave por vez em per,
  // pegando o preço do ingresso referente a essa chave em data.prices, o valor da chave em
  // entrants que no caso é a quantidade, e multiplica ambos e acumula em sum. Depois de o reduce
  // fazer a rotina para cada chave de entrats, ele retorna o acumulador que é a nossa soma.
  if (entrants !== undefined && Object.keys(entrants).length > 0) {
    return Object.keys(entrants).reduce((sum, per) => sum + (data.prices[per] * entrants[per]), 0);
  }
  return 0;
}


// ---------------------------------------ANIMAL MAP------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Função de apoio à animalMap para evitar complexidade cognitiva e excedente de linhas
function anmsObjCst(anmGrp, options = false) {
  // Passo 3 - Desconstrução do input
  const { includeNames, sex, sorted } = options;

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
    animalsObj[anmGrp.name] = anmGrp.residents.reduce(concatNames, []).sort();
    // Caso 4 - sex === 'male'/'female' e includeNames === true
  } else if (includeNames && sex && !sorted) {
    animalsObj[anmGrp.name] = anmGrp.residents.filter(filterSex).reduce(concatNames, []);
    // Caso 5 - sex === 'male'/'female' e includeNames === true e sorted === true
  } else if (includeNames && sex && sorted) {
    animalsObj[anmGrp.name] = anmGrp.residents.filter(filterSex).reduce(concatNames, []).sort();
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
  // Gran finale - retorna o objeto construido conforme o input
  return objToReturn;
}
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

function schedule(dayName) {
  // seu código aqui
  // Se é recebido uma string com o nome do dia, encapsulamos esse nome dentro de um array para
  // usarmos como chave de trabalho, senão caso não seja passado nenhum input, pegamos
  // todas as chaves do objeto cronograma (data.hours) para usarmos.
  const objKeys = (dayName !== undefined && dayName !== '') ? [dayName] : Object.keys(data.hours);
  const objToReturn = {};

  // Para cada chave (cada dia) pegamos o horário de abertura e de fechamento e para ficarmos no
  // padrão am/pm de horas, se o horário for maior que 12 subtraimos 12.
  // Pra construir o valor de retorno verficamos os horários! Se os horários de abertura/fechamento
  // forem iguais a zero retornamos "CLOSED" senão retornamos uma string no formato
  // "Open ${hora abertura}"am until ${hora fechamento}pm"
  // Tendo a chave (nome do dia) e o valor construído (value), para cada dia do objKeys, retornamos
  // um objeto com essa chave-valor
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
  // Passo 1 - Encontra o funcionario referente ao id recebido como input e na sequência retorna o
  // id do primeiro grupo de aniamis de que é responsável (anmGrpId).
  const anmGrpId = data.employees.find(obj => obj.id === id).responsibleFor[0];

  // Passo 2 - Tendo o id do grupo de animais (anmGrpId) procura-se pelo objeto que tem esse id,
  // ou seja procura o grupo.
  const anmGrp = data.animals.find(obj => obj.id === anmGrpId);

  // Passo 3 - Tendo o grupo, verifica-se para cada animal residente se sua idade é maior que a
  // idade do residente anterior. Assim determina-se o mais velho do grupo.
  let oldest = anmGrp.residents[0];
  anmGrp.residents.forEach((anm) => {
    oldest = (anm.age > oldest.age) ? anm : oldest;
  });
  return [oldest.name, oldest.sex, oldest.age];
}

function increasePrices(percentage) {
  // seu código aqui
  // Nesse caso recebemos uma taxa de aumento (percentage) do preço d ingresso, logo temos que
  // atualizar o preço do ingresso na base de dados (data.prices). Então pra cada tipo de ingresso
  // ('Adult', 'Senior', 'Child') que são as chaves de data.prices, atualizamos o valor.
  // Passada um chave (key) para a rotina do forEach, busca-se o preço atual correspondente aquela
  // chave (data.prices[key]) faz os calculos e atualiza o valor.
  Object.keys(data.prices).forEach((key) => {
    data.prices[key] = Math.round(((1 + (0.01 * percentage)) * data.prices[key]) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
  let objEmployees;
  const input = idOrName;
  // Se é passado um input para a função, procuramos o funcionário que possui aquele input
  // como firstName ou como lastName ou como id, e armazenamos esse objeto funcionário.
  // Se não é passado nenhum valor como input, nós pegamos todos os funcionários (data.employees)
  if (idOrName !== undefined && idOrName !== '') {
    const vfy = obj => obj.id === input || obj.firstName === input || obj.lastName === input;
    objEmployees = [data.employees.find(obj => vfy(obj))];
  } else {
    objEmployees = data.employees;
  }

  // Com os funcionários disponíveis para trabalharmos (objEmployees), para cada funcionário
  // (objEmployee) pegamos os ids dos grupos de animais de que é responsável (idsOfAnimalsCovered).
  // Tendo os ids dos animais cuidados pelo funcionário (idsOfAnimalsCovered), com um reduce,
  // para cada id procuramos o grupo de animais que possui o id em questão, e assim que encontrado
  // retorna-se o nome da espécie daquele grupo e esse nome é adicionado ao acumuluador que no caso
  // é um array.
  // Tendo esse array com o nome de todas as espécies que o funcionário cuida (value), construímos
  // uma chave com o nome completo do funcionário e adicionamos esse par chave-valor ao objeto de
  // retorno. E por último, retorna-se esse objeto de retorno (objToReturn).
  const objToReturn = {};
  objEmployees.forEach((objEmployee) => {
    const idsOfAnimalsCovered = objEmployee.responsibleFor;
    const anmGrpName = id => data.animals.find(obj => obj.id === id).name;
    const value = idsOfAnimalsCovered.reduce((res, id) => res.concat(anmGrpName(id)), []);
    const key = `${objEmployee.firstName} ${objEmployee.lastName}`;
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
