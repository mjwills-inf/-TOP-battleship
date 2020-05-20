import Gameboard from './gameboard.js';


test('returns player', () => {
  const testBoard = Gameboard('playerTwo');
  expect(testBoard.getPlayer()).toBe('playerTwo');
});

test('array length 100 tiles', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getTilesArray().length).toBe(100);
});

test('array index 21 is ..,y2', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getTilesArray()[21].y).toBe(2);
});

test('array index 64, (65th tile object?), is x7..', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getTilesArray()[64].x).toEqual(7);
});

test('fleet array is 5 length', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getFleet().length).toBe(5);
});

test('fleets 3rd ship is cruiser', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.getFleet()[2].getName()).toBe('Cruiser');
});

test('placeShip updates first tile occupied', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 1, 1);
  expect(testBoard.getTilesArray()[2].occupied).toBe(true);
});

test('placeShip updates next tile occupied', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 3, 3);
  expect(testBoard.getTilesArray()[23].occupied).toBe(true);
});

test('placeShip loop ends correctly', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[0];
  testBoard.placeShip(ship, 8, 1);
  expect(testBoard.getTilesArray()[75].occupied).toBe(false);
});

test('placeShip updates y axis', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 5, 1);
  expect(testBoard.getTilesArray()[60].occupied).toBe(true);
});

test('placeShip fails on illegal placement X', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 1, 9);
  expect(testBoard.getTilesArray()[9].occupied).toBe(false);
});

test('placeShip fails on illegal placement Y', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 9, 1);
  expect(testBoard.getTilesArray()[80].occupied).toBe(false);
});

test('placeShip updates tile ship ref', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  testBoard.placeShip(ship, 1, 8);
  expect(testBoard.getTilesArray()[9].shipNameRef).toBe('Cruiser');
});

test('placeShip updates tile ship section ref', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[2];
  ship.switchDirection();
  testBoard.placeShip(ship, 8, 1);
  expect(testBoard.getTilesArray()[90].shipSectionIndexRef).toBe(2);
});

test('check UPDATES BECAUSE AAHHHH', () => {
  const testBoard = Gameboard('player');
  const ship = testBoard.getFleet()[0];
  testBoard.placeShip(ship, 3, 6);
  expect(testBoard.getTilesArray()[29].shipSectionIndexRef).toBe(4);
});

test('placeShip will fail if not clear', () => {
  const testBoard = Gameboard('player');
  const ship1 = testBoard.getFleet()[2];
  const ship2 = testBoard.getFleet()[3];
  ship2.switchDirection();
  testBoard.placeShip(ship1, 2, 1);
  testBoard.placeShip(ship2, 1, 3);
  expect(testBoard.getTilesArray()[2].occupied).toBe(false);
});

// CO-ORDINATES NEEDS TO BE ABOVE 0 IDIOT

test('shot fired records on tile', () => {
  const testBoard = Gameboard('player');
  testBoard.shotHandler(1, 1);
  expect(testBoard.getTilesArray()[0].firedAt).toBe(true);
});

test('ship section updated with hit', () => {
  const testBoard = Gameboard('player');
  const ship1 = testBoard.getFleet()[2];
  testBoard.placeShip(ship1, 1, 1);
  testBoard.shotHandler(1, 2);
  expect(ship1.getSections()).toEqual([1, 0, 1]);
});

test('unactioned fleet is not sunk', () => {
  const testBoard = Gameboard('player');
  expect(testBoard.fleetSunkCheck()).toBe(false);
});

test('there must be a better way to test this - fleet sunk', () => {
  const testBoard = Gameboard('pLaYtWo');
  const ship1 = testBoard.getFleet()[0];
  const ship2 = testBoard.getFleet()[1];
  const ship3 = testBoard.getFleet()[2];
  const ship4 = testBoard.getFleet()[3];
  const ship5 = testBoard.getFleet()[4];
  testBoard.placeShip(ship1, 1, 1);
  testBoard.placeShip(ship2, 2, 1);
  testBoard.placeShip(ship3, 3, 1);
  testBoard.placeShip(ship4, 4, 1);
  testBoard.placeShip(ship5, 5, 1);
  testBoard.shotHandler(1, 1);
  testBoard.shotHandler(1, 2);
  testBoard.shotHandler(1, 3);
  testBoard.shotHandler(1, 4);
  testBoard.shotHandler(1, 5);
  testBoard.shotHandler(2, 1);
  testBoard.shotHandler(2, 2);
  testBoard.shotHandler(2, 3);
  testBoard.shotHandler(2, 4);
  testBoard.shotHandler(3, 1);
  testBoard.shotHandler(3, 2);
  testBoard.shotHandler(3, 3);
  testBoard.shotHandler(4, 1);
  testBoard.shotHandler(4, 2);
  testBoard.shotHandler(4, 3);
  testBoard.shotHandler(5, 1);
  testBoard.shotHandler(5, 2);
  expect(testBoard.fleetSunkCheck()).toBe(true);
});


test('methods returning true if successful hit', () => {
  const testBoard = Gameboard('playerOne');
  const ship1 = testBoard.getFleet()[0];
  testBoard.placeShip(ship1, 1, 1);
  expect(testBoard.shotHandler(1, 1)).toBe(true);
});
