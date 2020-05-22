import compChoice from './compAI';
import Player from './player';

test('returns tiles', () => {
  const human = Player('humanName');
  expect(compChoice(human.gameboard)).toEqual({x: 0, y: 0});
});

test