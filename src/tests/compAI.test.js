import compChoice from '../modules/compAI';
import Player from '../modules/player';

test('coords are picked', () => {
  const human = Player('humanName');
  expect(compChoice(human.gameboard)).not.toEqual({ x: undefined, y: undefined });
});
