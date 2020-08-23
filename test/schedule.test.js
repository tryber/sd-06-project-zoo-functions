const assert = require('assert');
const zoo = require('../src/zoo');

describe('Implemente a função schedule', () => {
  it('Sem parâmetros, retorna um cronograma legível para humanos', () => {
    const actual = zoo.schedule();
    const expected = {
      'Tuesday': 'Open from 8am until 6pm',
      'Wednesday': 'Open from 8am until 6pm',
      'Thursday': 'Open from 10am until 8pm',
      'Friday': 'Open from 10am until 8pm',
      'Saturday': 'Open from 8am until 10pm',
      'Sunday': 'Open from 8am until 8pm',
      'Monday': 'CLOSED'
    };

    assert.deepEqual(actual, expected);
  })

  it('Se um único dia for passado, retorna somente este dia em um formato legível para humanos', () => {
    let actual = zoo.schedule('Monday');
    let expected = {
      'Monday': 'CLOSED'
    };
    assert.deepEqual(actual, expected);

    actual = zoo.schedule('Tuesday');
    expected = {
      'Tuesday': 'Open from 8am until 6pm'
    };
    assert.deepEqual(actual, expected);
  });
});

function schedule(dayName) {
  const agenda = Object.entries(data.hours);
  if (dayName === undefined) {
  const agendaNova = {}
  agenda.map (horario => {
    if (horario[0] === 'Monday') return agendaNova.Monday = 'CLOSED'
    agendaNova[horario[0]] = `Open from ${horario[1].open}am until ${horario[1].close - 12}pm`
    
  })
  return agendaNova
  }
  agenda.filter((horario) => horario[0] === dayName).map((horario2) => {
    if (dayName === 'Monday') return {[dayName]: 'CLOSED',};
    return {[dayName] : `Open from ${horario2[1].open}am until ${horario2[1].close - 12}pm`,}
  })[0]; 
}