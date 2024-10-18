const transitionsTable = [
  ['OPEN', 'Close', 'CLOSING'],
  ['CLOSING', 'Close sensor', 'CLOSED'],
  ['CLOSED', 'Open', 'OPENING'],
  ['OPENING', 'Open sensor', 'OPEN'],
];
function tableFSM(state, input) {
  const next = transitionsTable.find(x => x[0] === state && x[1] === input)
  return next ? next[2] : state;
}

function switchCaseFSM(state, input) {
  let nextState = state;
  switch (state) {
    case 'OPEN':
      if (input === 'Close') {
        nextState = 'CLOSING'
      }
      break;

    case 'CLOSING':
      if (input === 'Closed sensor') {
        nextState = 'CLOSED'
      }
      break;

    case 'CLOSED':
      if (input === 'Open') {
        nextState = 'OPENING'
      }
      break;

    case 'OPENING':
      if (input === 'Closed sensor') {
        nextState = 'OPEN'
      }
      break;
  }
  return nextState;
}

const JSONconfig = {
  'OPEN': { 'Close': 'CLOSING' },
  'CLOSING': { 'Close sensor': 'CLOSED' },
  'CLOSED': { 'Open': 'OPENING' },
  'OPENING': { 'Open sensor': 'OPEN' },
}

function JSONFSM(state, input) {
  const next = JSONconfig[state]?.[input];
  return next || state;
}