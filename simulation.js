console.log('Running the simulation...');

// Good enough shuffle https://stackoverflow.com/q/2450954/
function arrayShuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function CardGenerator(length, specials) {
  let cards = Array.apply(null, {length});
  let next = 0;

  specials.forEach((s, i) => {
    cards[i] = s;
  });

  cards = arrayShuffle(cards);

  function getCard() {
    let card = null;
    if (next < length) {
      card = cards[next];
    } else {
      next = 0;
      // shuffle cards before starting over
      cards = arrayShuffle(cards);
      card = cards[0];
    }

    next += 1;
    return card;
  }

  return getCard;
}

const JAIL = 10;

// this matches our cards... may be missing some
const Cards = {
  cha: CardGenerator(16, [
    {type: 'goto', value: 5},
    {type: 'goto', value: 0},
    {type: 'near', value: 'rr'},
    {type: 'near', value: 'rr'},
    {type: 'near', value: 'util'},
    {type: 'goto', value: 39},
    {type: 'goto', value: JAIL},
    {type: 'goto', value: 24},
    {type: 'move', value: -3},
  ]),
  com: CardGenerator(15, [
    {type: 'goto', value: JAIL},
    {type: 'goto', value: 0},
  ]),
}

const SPACES = [
  'norm',
  'norm',
  'com',
  'norm',
  'norm',
  'rr',
  'norm',
  'cha',
  'norm',
  'norm',
  'jail',
  'norm',
  'util',
  'norm',
  'norm',
  'rr',
  'norm',
  'com',
  'norm',
  'norm',
  'norm',
  'norm',
  'cha',
  'norm',
  'norm',
  'rr',
  'norm',
  'norm',
  'util',
  'norm',
  'goto',
  'norm',
  'norm',
  'com',
  'norm',
  'rr',
  'cha',
  'norm',
  'norm',
  'norm',
];

function rollDice() {
  return Math.floor(Math.random() * 11 + 2) 
}

let position = 0;
let rolls = 0;
const visitCounts = new Map();

function move(num) {
  position += num;
  if (position >= SPACES.length) {
    position = position - SPACES.length;
  }
  if (position < 0) {
    position = SPACES.length + position;
  }
}

for (let i = 0; i < 100000000; i++) {
  move(rollDice());

  let terminal = false;
  while (!terminal) {
    switch(SPACES[position]) {
      case 'goto':
        position = JAIL;
        terminal = true;
        break;
      case 'com':
      case 'cha':
        const card = Cards[SPACES[position]]();
        if (!card) {
          terminal = true;
          break;
        }

        switch(card.type) {
          case 'goto':
            position = card.value;
            terminal = true;
            break;
          case 'near':
            while (SPACES[position] !== card.value) {
              move(1);
            }

            terminal = true;
            break;
          case 'move':
            move(card.value);
            break;
        }

        break;
       default:
        terminal = true;
        break;
    }
  }

  visitCounts.set(position, visitCounts.get(position) + 1 || 1);
  rolls +=1;
}

const values = Array.from(visitCounts.values());
const rawMax = Math.max(...values);
// Remove the largest value for more clear diffs (this is always jail fwiw)
const valuesAdjusted = values.filter(v => v !== rawMax);
const max = Math.max(...valuesAdjusted);
const min = Math.min(...valuesAdjusted);

function normalizeVisitValue(value, scaleMin, scaleMax) {
  if (value === undefined) {
    return scaleMin;
  }
  return Math.round(((value - min) / (max - min)) * (scaleMax - scaleMin) + scaleMin);
}


console.log('----------------');
console.log('Rolls:', rolls);
console.log('Max visits:', max);
console.log('Min visits:', min);

SPACES.forEach((space, i) => {
  const visitCount = visitCounts.get(i);
  const normalized = normalizeVisitValue(visitCount, 0, 50);
  console.log(
    space.padStart(4),
    visitCounts.get(i) ? (Math.round((visitCounts.get(i) / min) * 100) / 100).toString().padStart(4) : '',
    "=".repeat(normalized)
   );
});

