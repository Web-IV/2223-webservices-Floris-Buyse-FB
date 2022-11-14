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
    locatieid: 3
  },
  {
    id: 2,
    type: 'gewicht',
    locatieid: 1
  },
  {
    id: 3,
    type: 'bodyweight',
    locatieid: 2
  },
];

let OEFENINGEN = [{
    id: 1,
    spiergroep: 'triceps',
    moeilijkheidsgraad: 'medium',
    toestelid: 1
  },
  {
    id: 2,
    spiergroep: 'biceps',
    moeilijkheidsgraad: 'medium',
    toestelid: 2
  },
  {
    id: 3,
    spiergroep: 'abs',
    moeilijkheidsgraad: 'hard',
    toestelid: 3
  },
  {
    id: 4,
    spiergroep: 'quadriceps',
    moeilijkheidsgraad: 'easy',
    toestelid: 1
  },
  {
    id: 5,
    spiergroep: 'calves',
    moeilijkheidsgraad: 'easy',
    toestelid: 1
  },
];

module.exports = {
  LOCATIES,
  TOESTELLEN,
  OEFENINGEN
}