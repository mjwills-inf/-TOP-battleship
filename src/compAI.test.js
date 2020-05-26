import compChoice from './compAI';
import compStupid from './compStupid'
import Player from './player';

test('coords are picked', () => {
  const human = Player('humanName');
  expect(compChoice(human.gameboard)).not.toEqual({ x: undefined, y: undefined });
});

test('cords get random pick', () => {
  const human = Player('humanName');
  expect(compStupid(human.gameboard)).not.toEqual({ x: undefined, y: undefined });
})