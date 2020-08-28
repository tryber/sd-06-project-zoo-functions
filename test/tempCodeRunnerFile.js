  it('Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada e a opção `sort: true` especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados', () => {
    const options = { includeNames: true, sex: 'female', sorted: true }
    const actual = zoo.animalMap(options);
    const expected = {
      NE: [
        { lions: ['Dee', 'Zena'] },
        { giraffes: ['Gracia', 'Vicky'] }
      ],
      NW: [
        { tigers: ['Esther', 'Shu'] },
        { bears: [] },
        { elephants: ['Bea', 'Ilana'] }
      ],
      SE: [
        { penguins: ['Keri'] },
        { otters: ['Margherita', 'Mercedes'] }
      ],
      SW: [
        { frogs: ['Annice', 'Cathey'] },
        { snakes: ['Paulette'] }
      ]
    };