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

// test('placeShip will fail if not clear', () => {
//   const ship1 = testBoard.getFleet()[2];
//   const ship2 = testBoard.getFleet()[3];
//   ship2.switchDirection();
//   testBoard.placeShip(ship1, 0, 0);
//   testBoard.placeShip(ship2, 0, 1);
//   expect(testBoard.getTilesArray()[11].occupied).toBe(false)
// });


// functions are working upto the error inside placeShip (on above function in console)

// const Ship = (name, length, player) => {
//   let health = length * 1;
//   let sunk = false;
//   let direction = 'xAxis';
//   const shipSections = Array(length).fill(1);

//   const getName = () => name;
//   const getLength = () => length;
//   const getPlayer = () => player;
//   const getSunk = () => sunk;
//   const getDirection = () => direction;
//   const getSections = () => shipSections;

//   const isSunkCheck = () => {
//     if (health <= 0) {
//       sunk = true;
//     }
//   };
//   const hit = (section) => {
//     shipSections[section] = 0;
//     health -= 1;
//     isSunkCheck();
//   };

//   const switchDirection = () => {
//     if (direction === 'xAxis') {
//       direction = 'yAxis';
//     } else {
//       direction = 'xAxis';
//     }
//   };

//   return {
//     getName,
//     getLength,
//     getPlayer,
//     getSunk,
//     getSections,
//     getDirection,
//     switchDirection,
//     hit,
//   };
// };
// undefined
// const Gameboard = (player) => {
//   const fleet = [];
//   const tilesArray = [];

//   const getPlayer = () => player;
//   const getFleet = () => fleet;
//   const getTilesArray = () => tilesArray;

//   // fill tiles array ////////////////////////////////

//   for (let i = 1; i <= 10; i += 1) {
//     for (let j = 1; j <= 10; j += 1) {
//       const tile = {
//         x: i,
//         y: j,
//         occupied: false,
//         firedAt: false,
//         shipNameRef: null,
//         shipSectionIndexRef: null,
//       };
//       tilesArray.push(tile);
//     }
//   }

//   // fill fleet array ////////////////////////////////

//   const carrier = Ship('Carrier', 5, player);
//   const battleship = Ship('Battleship', 4, player);
//   const cruiser = Ship('Cruiser', 3, player);
//   const submarine = Ship('Submarine', 3, player);
//   const destroyer = Ship('Destroyer', 2, player);
//   fleet.push(carrier, battleship, cruiser, submarine, destroyer);

//   // methods /////////////////////////////////////////

//   const updateTile = (index, occupied, nameRef, indexRef) => {
//     tilesArray[index].occupied = occupied;
//     tilesArray[index].shipNameRef = nameRef;
//     tilesArray[index].shipSectionIndexRef = indexRef;
//   };

//   const resetTile = (name) => {
//     tilesArray.forEach((item) => {
//       const tileObject = item;
//       if (item.shipNameRef === name) {
//         tileObject.occupied = false;
//         tileObject.firedAt = false;
//         tileObject.shipNameRef = null;
//         tileObject.shipSectionIndexRef = null;
//       }
//     });
//   };

//   const placeShipClear = (ship, x, y) => {
//     // ships target tiles are free from other ships
//     const shipLength = ship.getLength();
//     const axis = ship.getDirection();
//     let valid = true;

//     if (axis === 'xAxis') {
//       for (let i = 0; i < shipLength; i += 1) {
//         const targetTileIndex = tilesArray.findIndex((item) => item.x === x
//             && item.y === y + i);
//         if (tilesArray[targetTileIndex].occupied === true) {
//           valid = false;
//         }
//       }
//     }

//     if (axis === 'yAxis') {
//       for (let i = 0; i < shipLength; i += 1) {
//         const targetTileIndex = tilesArray.findIndex((item) => item.x === x + i
//             && item.y === y);
//         if (tilesArray[targetTileIndex].occupied === true) {
//           valid = false;
//         }
//       }
//     }
//     return valid;
//   };


//   const placeShipValid = (ship, x, y) => {
//     // ships target tiles are within square board
//     let valid = false;
//     if (ship.getDirection() === 'xAxis' && (ship.getLength() + x <= 10)) {
//       valid = true;
//     } else if (ship.getDirection() === 'yAxis'
//         && (ship.getLength() + y <= 10)) {
//       valid = true;
//     }
//     return valid;
//   };

//   const placeShip = (ship, x, y) => {
//     const validMove = placeShipValid(ship, x, y);
//     const clearMove = placeShipClear(ship, x, y);
//     const axis = ship.getDirection();
//     const shipLength = ship.getLength();
//     const shipName = ship.getName();

//     if (validMove && clearMove && axis === 'xAxis') {
//       for (let i = 0; i < shipLength; i += 1) {
//         const targetTileIndex = tilesArray.findIndex((item) => item.x === x
//             && item.y === y + i);
//         updateTile(targetTileIndex, true, shipName, i);
//       }
//     }

//     if (validMove && clearMove && axis === 'yAxis') {
//       for (let i = 0; i < shipLength; i += 1) {
//         const targetTileIndex = tilesArray.findIndex((item) => item.x === x + i
//             && item.y === y);
//         updateTile(targetTileIndex, true, shipName, i);
//       }
//     }
//   };

//   return {
//     getPlayer,
//     getTilesArray,
//     getFleet,
//     placeShip,
//     placeShipClear,
//     updateTile,
//   };
// };
// undefined
// let testBoard = Gamboard('playerOne')
// VM578:1 Uncaught ReferenceError: Gamboard is not defined
//     at <anonymous>:1:17
// (anonymous) @ VM578:1
// let testBoard = Gameboard('playerOne')
// undefined
// testBoard.updateTile(0, true, 'TeSt', 0)
// undefined
// testBoard.getTilesArray()[0]
// {x: 1, y: 1, occupied: true, firedAt: false, shipNameRef: "TeSt", …}
// const ship1 = testBoard.getFleet()[2];
// undefined
// const ship2 = testBoard.getFleet()[3];
// undefined
// ship2.switchDirection();