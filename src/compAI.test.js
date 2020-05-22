import compChoice from './compAI';
import Player from './player';

test('coords are picked', () => {
  const human = Player('humanName');
  expect(compChoice(human.gameboard)).not.toEqual({ x: undefined, y: undefined });
});
