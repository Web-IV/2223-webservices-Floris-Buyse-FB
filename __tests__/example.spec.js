const testcases = [{
    input: 1,
    output: 1
  },
  {
    input: -1,
    output: 1
  },
  {
    input: -23,
    output: 23
  }
]

//AAA testen : Arrange, Act, Assert
describe('eerste test', () => {
  it('should succeed', () => {
    expect(2 + 2).toBe(4);
  });
  it('should succeed too', () => {
    //arrange
    const input = 1
    //act
    const result = 5 + input
    //assert
    expect(result).toBe(input + 5)
  });
});

// parameterized testen met jasmine --> for each gebruiken
describe('test met testcases', () => {
  testcases.forEach(({
    input,
    output
  }) => {
    it('should give input in a positive form', () => {
      expect(Math.abs(input)).toEqual(output)
    });
  });
});

// testen maken voor strings
describe('test met strings', () => {
  it('should return message', () => {
    const result = 'Welcome to paradise';
    expect(result).toContain('paradise'); // beter dan value te hardcoden
    expect(result).toMatch(/paradise/); // beter dan value te hardcoden
  });
});

// testen van arrays
describe('test met arrays', () => {
  it('should return locaties', () => {
    const result = ['gent', 'brugge', 'brussel', 'barcelona', 'maastricht']
    expect(result).toEqual(jasmine.arrayContaining(['gent', 'brugge', 'brussel', 'barcelona', 'maastricht']));
  });
});

// testen van objecten
describe('test met objects', () => {
  it('should return locatie met id 1', () => {
    const id = 1
    const locatie = {
      id,
      name: 'Gent'
    };
    const result = {
      id: 1,
      name: 'Gent'
    };
    expect(result).toEqual(locatie);
  });
});

function functie(string) {
  if (string !== 'hey' || string !== 'heyo erik') {
    throw new Error('Error, input should be hey or heyo erik');
  }
  return string
}


// testen exceptions
describe('functie', () => {
  it('should fail', () => {
    expect(() => functie('damn')).toThrow();

  });
});

// testen met mock