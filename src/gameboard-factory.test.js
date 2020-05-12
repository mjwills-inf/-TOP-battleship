import Gameboard from './gameboard-factory';

test('returns player', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getPlayer).toBe('player');
});

test('array length 100 tiles', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getTilesArray.length).toBe(100);
});

test('array index 10 is ..,y1', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getTilesArray[10].y).toBe(1);
});

test('array index 64, (65th tile object?), is x7..', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getTilesArray[64].x).toEqual(7);
});

test('fleet array is 5 length', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getFleet.length).toBe(5);
});

test('fleets 3rd ship is cruiser', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getFleet[2].getName()).toBe('Cruiser');
});

test('what tile', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.placeShip(1, 5, 5)).toBe(44);
});
