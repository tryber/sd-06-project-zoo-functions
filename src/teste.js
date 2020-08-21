const data = [
  {
    name: 'Bob',
    gender: 'male',
    age: 34,
  },
  {
    name: 'Carol',
    gender: 'female',
    age: 36,
  },
  {
    name: 'Ted',
    gender: 'male',
    age: 38,
  },
  {
    name: 'Alice',
    gender: 'female',
    age: 40,
  },
];

const bob = data[0];
const carol = data[1];
const result = Object.assign({ bob }, { carol });

console.log(result);

