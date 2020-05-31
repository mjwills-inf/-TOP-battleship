import Ship from './ship';

const Gameboard = (type) => {
  const getType = () => type;
  const fleetArray = [];
  const tilesArray = [];

  const getFleet = () => fleetArray;
  const getTilesArray = () => tilesArray;

  // fill tiles array ////////////////////////////////

  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      const tile = {
        x: i,
        y: j,
        occupied: false,
        firedAt: false,
        shipNameRef: null,
        shipSectionIndexRef: null,
      };
      tilesArray.push(tile);
    }
  }

  // fill fleet array ////////////////////////////////

  const carrier = Ship('Carrier', 5);
  const battleship = Ship('Battleship', 4);
  const cruiser = Ship('Cruiser', 3);
  const submarine = Ship('Submarine', 3);
  const destroyer = Ship('Destroyer', 2);
  fleetArray.push(carrier, battleship, cruiser, submarine, destroyer);

  // methods /////////////////////////////////////////

  const updateTile = (index, occupied, nameRef, indexRef) => {
    tilesArray[index].occupied = occupied;
    tilesArray[index].shipNameRef = nameRef;
    tilesArray[index].shipSectionIndexRef = indexRef;
  };

  const resetTile = (name) => {
    tilesArray.forEach((element) => {
      const tileObject = element;
      if (element.shipNameRef === name) {
        tileObject.occupied = false;
        tileObject.firedAt = false;
        tileObject.shipNameRef = null;
        tileObject.shipSectionIndexRef = null;
      }
    });
  };

  const placeShipValid = (ship, x, y) => {
    // ships target tiles are within square board and unoccupied
    let valid = false;
    const shipLength = ship.getLength();
    const axis = ship.getDirection();
    if (axis === 'xAxis' && (shipLength + y <= 11)) {
      const testOccupyArray = [];
      for (let i = 0; i < shipLength; i += 1) {
        const targetTileIndex = tilesArray.findIndex((element) => element.x === x
            && element.y === y + i);
        testOccupyArray.push(tilesArray[targetTileIndex]);
      }
      if (!testOccupyArray.some((element) => element.occupied === true)) {
        valid = true;
      }
    } else if (axis === 'yAxis' && (shipLength + x <= 11)) {
      const testOccupyArray = [];
      for (let i = 0; i < shipLength; i += 1) {
        const targetTileIndex = tilesArray.findIndex((element) => element.x === x + i
            && element.y === y);
        testOccupyArray.push(tilesArray[targetTileIndex]);
      }
      if (!testOccupyArray.some((element) => element.occupied === true)) {
        valid = true;
      }
    }
    return valid;
  };

  const placeShip = (ship, x, y) => {
    const validMove = placeShipValid(ship, x, y);
    const axis = ship.getDirection();
    const shipLength = ship.getLength();
    const shipName = ship.getName();

    if (validMove && axis === 'xAxis') {
      for (let i = 0; i < shipLength; i += 1) {
        const targetTileIndex = tilesArray.findIndex((element) => element.x === x
            && element.y === y + i);
        updateTile(targetTileIndex, true, shipName, i);
      }
    }

    if (validMove && axis === 'yAxis') {
      for (let i = 0; i < shipLength; i += 1) {
        const targetTileIndex = tilesArray.findIndex((element) => element.x === x + i
            && element.y === y);
        updateTile(targetTileIndex, true, shipName, i);
      }
    }
  };

  const shotValidCheck = (tile) => {
    // shot target tile has already been fire at
    let valid = false;
    const targetTile = tile;
    if (targetTile.firedAt === false) {
      valid = true;
    }
    return valid;
  };

  const shotRegister = (tile) => {
    // shot target updating ship with hit if occupied
    let shotHit = false;
    const targetTile = tile;
    const shipName = targetTile.shipNameRef;
    const shipSection = targetTile.shipSectionIndexRef;
    targetTile.firedAt = true;
    if (targetTile.occupied === true) {
      const fleetIndex = fleetArray.findIndex((element) => element.getName() === shipName);
      const targetShip = fleetArray[fleetIndex];
      targetShip.hit(shipSection);
      shotHit = true;
    }
    return shotHit;
  };

  const shotHandler = (x, y) => {
    let shotHit = false;
    const targetTileIndex = tilesArray.findIndex((element) => element.x === x
        && element.y === y);
    const targetTile = tilesArray[targetTileIndex];
    if (shotValidCheck(targetTile)) {
      shotHit = shotRegister(targetTile);
    }
    return shotHit;
  };

  const fleetSunkCheck = () => {
    let sunk;
    fleetArray.forEach((element) => {
      sunk = element.getSunk() !== false;
    });
    return sunk;
  };


  return {
    getType,
    getTilesArray,
    getFleet,
    placeShip,
    shotHandler,
    fleetSunkCheck,
    resetTile,
  };
};

export default Gameboard;
