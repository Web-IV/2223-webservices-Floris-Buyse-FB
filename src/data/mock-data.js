let LOCATIES = [{
    id: 1,
    stad: 'Gent',
    postcode: 9000,
    straat: 'Veldstraat',
    nummer: 15
  },
  {
    id: 2,
    stad: 'Gent',
    postcode: 9000,
    straat: 'Krommenelleboog',
    nummer: 1
  },
  {
    id: 3,
    stad: 'Gent',
    postcode: 9000,
    straat: 'Blaarmeersen',
    nummer: 99
  }
];

let TOESTELLEN = [{
    id: 1,
    type: 'bodyweight',
    locatie: {
      id: 3
    }
  },
  {
    id: 2,
    type: 'gewicht',
    locatie: {
      id: 1
    }
  },
  {
    id: 3,
    type: 'bodyweight',
    locatie: {
      id: 2
    }
  },
];

let OEFENINGEN = [{
    id: 1,
    spiergroep: 'triceps',
    moeilijkheidsgraad: 'medium',
    toestel: {
      id: 1
    }
  },
  {
    id: 2,
    spiergroep: 'biceps',
    moeilijkheidsgraad: 'medium',
    toestel: {
      id: 2
    }
  },
  {
    id: 3,
    spiergroep: 'abs',
    moeilijkheidsgraad: 'hard',
    toestel: {
      id: 3
    }
  },
  {
    id: 4,
    spiergroep: 'quadriceps',
    moeilijkheidsgraad: 'easy',
    toestel: {
      id: 1
    }
  },
  {
    id: 5,
    spiergroep: 'calves',
    moeilijkheidsgraad: 'easy',
    toestel: {
      id: 1
    }
  },
];

module.exports = {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
}