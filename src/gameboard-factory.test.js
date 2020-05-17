import Gameboard from './gameboard-factory';

const testBoard = Gameboard('player');

test('returns player', () => {
  expect(testBoard.getPlayer()).toBe('player');
});

test('array length 100 tiles', () => {
  expect(testBoard.getTilesArray().length).toBe(100);
});

test('array index 10 is ..,y1', () => {
  expect(testBoard.getTilesArray()[10].y).toBe(1);
});

test('array index 64, (65th tile object?), is x7..', () => {
  expect(testBoard.getTilesArray()[64].x).toEqual(7);
});

test('fleet array is 5 length', () => {
  expect(testBoard.getFleet().length).toBe(5);
});

test('fleets 3rd ship is cruiser', () => {
  expect(testBoard.getFleet()[2].getName()).toBe('Cruiser');
});

test('placeShip updates first tile occupied', () => {
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 5, 1);
  expect(testBoard.getTilesArray()[40].occupied).toBe(true);
});

test('placeShip updates next tile occupied', () => {
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 5, 1);
  expect(testBoard.getTilesArray()[41].occupied).toBe(true);
});

test('placeShip loop ends correctly', () => {
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 5, 1);
  expect(testBoard.getTilesArray()[43].occupied).toBe(false);
});

test('placeShip updates y axis', () => {
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 5, 1);
  expect(testBoard.getTilesArray()[40].occupied).toBe(true);
});

test('placeShip fails on illegal placement', () => {
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 9, 1);
  expect(testBoard.getTilesArray()[80].occupied).toBe(false);
});

test('placeShip updates tile ship ref', () => {
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 8, 1);
  expect(testBoard.getTilesArray()[80].shipNameRef).toBe('Cruiser');
});

test('placeShip updates tile ship section ref', () => {
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 8, 1);
  expect(testBoard.getTilesArray()[90].shipSectionIndexRef).toBe(2);
});

test('placeShip will fail if not clear', () => {
  const ship1 = testBoard.getFleet()[2];
  const ship2 = testBoard.getFleet()[3];
  ship2.switchDirection();
  testBoard.placeShip(ship1, 1, 1);
  testBoard.placeShip(ship2, 1, 2);
  expect(testBoard.getTilesArray()[11].occupied).toBe(false)
});

// CO-ORDINATES NEEDS TO BE ABOVE 0 IDIOT
