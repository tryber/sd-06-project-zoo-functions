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
const { animals } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  const result = [];
  if (ids === undefined) {
    return [];
  }

  for (let i = 0; i < ids.length; i += 1) {
    const animalsMap = animals.filter(animal => animal.id === ids[i]);
    result[i] = animalsMap[0];
  }
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const myAnimal = animals.find(species => species.name === animal);
  return myAnimal.residents.every(one => one.age >= 7);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined || employeeName === '') {
    return {};
  }
  // supondo que não tem pessoas com o mesmo primeiro nome né
  const myEmployee = data.employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return myEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  // data.employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const myEmployee = data.employees
    .find(employee => employee.id === id);
  console.log(myEmployee.managers);
  if (myEmployee.managers.length < 2) {
    // É um gerente!!!
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}


function animalCount(species) {
  // seu código aqui
  if (species === undefined || species === '') {
    const myAnimals = {};
    animals.forEach((animal) => {
      const animalName = animal.name;
      const animalNumber = animal.residents.length;
      myAnimals[animalName] = animalNumber;
    });
    return myAnimals;
  }
  const findTheAnimal = animals.find(animal => animal.name === species);
  return findTheAnimal.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === '' || Object.keys(entrants).length === 0) {
    return 0;
  }
  let entryPrice = 0;
  if (entrants.Adult) {
    entryPrice += (entrants.Adult * data.prices.Adult);
  }
  if (entrants.Child) {
    entryPrice += (entrants.Child * data.prices.Child);
  }
  if (entrants.Senior) {
    entryPrice += (entrants.Senior * data.prices.Senior);
  }
  return entryPrice;
}

function animalMap(options) {
  // seu código aqui
  const animalsByLocation = {
    animalsNE: animals.filter(animal => animal.location === 'NE'),
    animalsNW: animals.filter(animal => animal.location === 'NW'),
    animalsSE: animals.filter(animal => animal.location === 'SE'),
    animalsSW: animals.filter(animal => animal.location === 'SW'),
  }
  const result = {}
  const directions = ['NE', 'NW', 'SE', 'SW'];
  directions.forEach((direction) => {
    const myDirection = 'animals' + direction;
    // animalsByLocation[myDirection] é igual animalsNE, animalsNW, etc.
    const animalNames = animalsByLocation[myDirection].map(animal => animal.name);

    if (!options) {
      result[direction] = animalsByLocation[myDirection].map(animal => animal.name);
      return result;
    } else if (options.includeNames === true) {
      // teste.direction = 'ui';
      const residents = animalsByLocation[myDirection]
        .map(animal => animal.residents
          .map(resident => resident.name)
        );

      result[direction] = [];
      // result[direction] = animalNames.map(animal => ({ [animal]: residents }));

      for (let i = 0; i < animalNames.length; i += 1) {
        result[direction].push({ [animalNames[i]]: residents[i] });
      }
      // console.log(result[direction]);
      // result[direction] = [];

      // console.log(residents)
      // animalNames.forEach(animal => console.log(animal));
      // {
      //   NE (direction): []
      // }

      // const formattedNEResidents = [];

      // for (let i = 0; i < animalNames.length; i += 1) {
      //   formattedNEResidents.push({ [animalNames[i]]: NEResidents[i] });
      // }
    }
  });
  return result;

  // for (let i = 0; i < directions.length; i += 1) {
  //   const animalNames = animalsNE.map(animal => animal.name);
  //   const NEResidents = animalsNE
  //     .map(animal => animal.residents
  //       .map(resident => resident.name)
  //     );
  //   const formattedNEResidents = [];

  //   for (let i = 0; i < animalNames.length; i += 1) {
  //     formattedNEResidents.push({ [animalNames[i]]: NEResidents[i] });
  //   }

  // letmyVarName = 'animals' + 'NE';

  // vars[directions[i]] = 'tutou' + i;
}


animalMap({ includeNames: true });

function schedule(dayName) {
  // seu código aqui
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
