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
  const result = [];

  animals.map((animal) => {
    const { id } = animal;
    ids.forEach((element) => {
      if (element === id) {
        result.push(animal);
      }
    });
    return result;
  });
  return result;
}

function animalsOlderThan(animal, ages) {
  const filterType = animals
    .filter(({ name }) => name === animal)
    .map(({ residents }) => residents
      .every(({ age }) => age > ages));
  return filterType[0];
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find(emp => employeeName === emp.firstName || employeeName === emp.lastName);
}

// console.log(employeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  const result = { ...personalInfo, ...associatedWith };
  return result;
}

// console.log(createEmployee(personalInfo, associatedWith));

function isManager(ids) {
  const teste = employees.some(({ managers }, index) => managers[index] === ids);
  return teste;
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const empregado = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(empregado);
}

// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));

function animalCount(species) {
  if (!species) {
    const newObj = {};
    animals.forEach((animal) => {
      const { name, residents } = animal;
      const key = name;
      const value = residents.length;
      newObj[key] = value;
    });
    return newObj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

// console.log(animalCount('lions'));

function entryCalculator(entrants = 0) {
  const { Adult, Senior, Child } = prices;
  let result = 0;
  Object.keys(entrants).forEach((key) => {
    let tot = 0;
    switch (key) {
      case 'Adult':
        tot = entrants[key] * Adult;
        result += tot;
        break;
      case 'Senior':
        tot = entrants[key] * Senior;
        result += tot;
        break;
      case 'Child':
        tot = entrants[key] * Child;
        result += tot;
        break;
      default:
        console.log('Sorry, not valid');
    }
  });
  return result;
}

// console.log(entryCalculator({}))

function animalMap(options) {
  // seu código aqui
}
function schedule(dayName) {
  // seu código aqui
  const obj = {};
  const hora = Object.entries(hours);
  if (dayName === undefined) {
    hora.map((dia) => {
      if (dia.includes('Monday')) {
        obj.Monday = 'CLOSED';
        return obj;
      }
      return (obj[dia[0]] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`);
    });
    return obj;
  }
  return hora.filter(name => name[0] === dayName).map((dia) => {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
      return obj;
    }
    obj[dayName] = `Open from ${dia[1].open}am until ${dia[1].close - 12}pm`;
    return obj;
  })[0];
}
// function schedule(dayName) {
//   const newObj = {};
//   const date = Object.entries(hours);
//   if (!dayName) {
//     date.map((element) => {
//       if (element.includes('Monday')) {
//         newObj.Monday = 'CLOSED';
//         return newObj;
//       }
//       const day = element[0];
//       const hour = element[1];
//       const { open, close } = hour;
//       newObj[day] = `Open from ${open}am until ${close - 12}pm`;
//       return newObj;
//     });
//     return newObj;
//   }
//   date.map((item) => {
//     if (dayName === 'Monday') {
//       newObj.Monday = 'CLOSED';
//       return newObj;
//     }
//     const day = item[0];
//     const hour = item[1];
//     const { open, close } = hour;
//     if (day === dayName) {
//       newObj[day] = `Open from ${open}am until ${close - 12}pm`;
//       return newObj;
//     }
//   });
//   return newObj;
// }

// console.log(schedule());

function oldestFromFirstSpecies(id) {
  const result = employees.filter(element => element.id === id)[0].responsibleFor;
  const allAnimals = animals.find(animal => animal.id === result[0]).residents
  .reduce((acc, curr) => {
    if (curr.age > acc.age) {
      return curr;
    }
    return acc; // preciso retornar acc p/ no segundo loop ter valor
  });
  return [allAnimals.name, allAnimals.sex, allAnimals.age];
}

// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const adult = (Math.round(Adult * (1 + (percentage / 100)) * 100)) / 100;
  const senior = (Math.round(Senior * (1 + (percentage / 100)) * 100)) / 100;
  const child = (Math.round(Child * (1 + (percentage / 100)) * 100)) / 100;
  prices.Adult = adult;
  prices.Senior = senior;
  prices.Child = child;
  return { Adult: adult, Senior: senior, Child: child };
}

// console.log(increasePrices(50));
// console.log(increasePrices(30));

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
