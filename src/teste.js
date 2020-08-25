const data = require('./data');
const {
  animals,
  employees,
  prices,
  hours,
} = require('./data');

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(elem => elem.id === id).responsibleFor[0];
  return (animals.find(animal => animal.id === animalId).residents)
  .map(elem => Object.values(elem))
  .sort((a, b) => b[2] - a[2])[0];
}
console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
