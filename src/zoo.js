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
  if (!ids) {
    return [];
  }
  return animals.filter((animal) => ids.includes(animal.id));

}
//console.log(animalsByIds('e8481c1d-42ea-4610-8e11-1752cfc05a46'))

function animalsOlderThan(animal, age) {
  let response;
  const filterName = animals.filter(options => options.name === animal)
  .forEach(position => {
    response = position.residents.every(animalAge => animalAge.age >= age)
  });
  return response
  //const filterAnimals = animals.filter((options)=> animal.includes(options.name))
}
//console.log(animalsOlderThan('penguins', 6));

function employeeByName(employeeName) {
if (!employeeName) {
    return [];
  }

}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

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



/*  const numbers = [19, 21, 30, 3, 45, 22, 15];

const verifyEven = (number) => number % 2 === 0;

const isEven = numbers.filter(verifyEven);

console.log(isEven); // [ 30, 22 ]

Outra forma de ser realizada sem a necessidade de criar uma nova função.
const isEven2 = numbers.filter((number) => number % 2 === 0);

console.log(isEven2); // [ 30, 22 ] */

/*
const arrr = [1, 2];
console.log(arrr.includes(1,2))

const br = [1, 2, 3];
console.log(br.includes(1, 1))
// true



function verifyNote (student){
  if (student.note >= 80) {
    student.approved = 'Aprovado';
  } else {
    student.approved = 'Recuperação';
  }
}

students.forEach(verifyNote);

console.log(students);*/

/*
const animals = [
  {
    id: '0938aa23-f153-4937-9f88-4858b24d6bce',
    name: 'lions',
    popularity: 4,
    location: 'NE',
    residents: [
      {
        name: 'Zena',
        sex: 'female',
        age: 12
      },
      {
        name: 'Maxwell',
        sex: 'male',
        age: 15
      },
      {
        name: 'Faustino',
        sex: 'male',
        age: 7
      },
      {
        name: 'Dee',
        sex: 'female',
        age: 14
      }
    ]
  },

]
position = animals[0].residents
console.log(position[0].age)

const students = [
  { name: 'Maria', note: 70, approved: '' },
  { name: 'José', note: 56, approved: '' },
  { name: 'Roberto', note: 90, approved: '' },
  { name: 'Ana', note: 81, approved: '' }
];

const position = students[0].name;

console.log(position)




const notes = [
  {
    portugues: 7,
    matematica: 7,
    ingles: 5,
  },
  {
    portugues: 4,
    matematica: 7,
    ingles: 5,
  },
]
const verifyNotes = (studentNotes) => {
  return studentNotes.every((note) => note.portugues >= 5);
};

console.log(verifyNotes(notes));*/