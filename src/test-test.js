const data = require("./data");
const { animals, employees, hours } = require("./data");
const { animalsByIds } = require("./zoo");

function getSpecieNameById(animalId) {
  return animals.filter((animal) => animal.id === animalId)[0];
}

function getOlder(animals) {
  let age = 0
  animals.forEach(function (animal) {
    if (animal.age > age) {
      age = animal.age;

    }
  });
  return animals.filter(animal => animal.age === age);
}

function getAnimalsIdsByEmployeeId(employeeId) {
  return employees.filter(employee => employee.id === employeeId).flatMap(employee => employee.responsibleFor);
}

function oldestFromFirstSpecies(employeeID) {
  const [firstAnimalId] = getAnimalsIdsByEmployeeId(employeeID)
  const {residents} = getSpecieNameById(firstAnimalId);
  const older = getOlder(residents)[0];
  return [older.name, older.sex, older.age]
}

console.log(oldestFromFirstSpecies('b0dc644a-5335-489b-8a2c-4e086c7819a2'))
