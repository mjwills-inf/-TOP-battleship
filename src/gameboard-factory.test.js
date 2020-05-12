import Gameboard from './gameboard-factory';

test('returns player', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getPlayer).toBe('player');
});

test('array length 100 tiles', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.tilesArray.length).toBe(100);
});

test('array index 10 is x2,y1', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.tilesArray[10]).toEqual({
    x: 2, y: 1, occupied: false, firedAt: false,
  });
});

test('array index 64, (65th tile object?), is x7y5', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.tilesArray[64]).toEqual({
    x: 7, y: 5, occupied: false, firedAt: false,
  });
});

test('fleet array is 5 length', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.fleet.length).toBe(5);
});

test('fleets 3rd ship is cruiser', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.fleet[2].getName()).toBe('Cruiser');
});