import Gameboard from './gameboard-factory';

const testBoard = Gameboard('player');

test('returns player', () => {
  expect(testBoard.getPlayer).toBe('player');
});

test('array length 100 tiles', () => {
  expect(testBoard.getTilesArray.length).toBe(100);
});

test('array index 10 is ..,y1', () => {
  expect(testBoard.getTilesArray[10].y).toBe(1);
});

test('array index 64, (65th tile object?), is x7..', () => {
  expect(testBoard.getTilesArray[64].x).toEqual(7);
});

test('fleet array is 5 length', () => {
  expect(testBoard.getFleet.length).toBe(5);
});

test('fleets 3rd ship is cruiser', () => {
  expect(testBoard.getFleet[2].getName()).toBe('Cruiser');
});

// /////////////////////////// internal checks
test('validate', () => {
  expect(testBoard.placeShipValidate(testBoard.getFleet[2], 2, 2)).toBe(true);
});

test('validate', () => {
  expect(testBoard.placeShipValidate(testBoard.getFleet[2], 8, 2)).toBe(false);
});
// ///////////////////////////

// test('what tile', () => {
//   expect(testBoard.placeShip(1, 5, 5)).toBe(44);
// });
