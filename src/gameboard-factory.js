import Ship from './ship-factory';

const Gameboard = (player) => {
  const fleet = [];
  const tilesArray = [];

  const getPlayer = () => player;
  const getFleet = () => fleet;
  const getTilesArray = () => tilesArray;

  // fill tiles array

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

  // fill fleet array

  const carrier = Ship('Carrier', 5, player);
  const battleship = Ship('Battleship', 4, player);
  const cruiser = Ship('Cruiser', 3, player);
  const submarine = Ship('Submarine', 3, player);
  const destroyer = Ship('Destroyer', 2, player);
  fleet.push(carrier, battleship, cruiser, submarine, destroyer);

  // methods

  const updateTile = (index, occupied, nameRef, indexRef) => {
    tilesArray[index].occupied = occupied;
    tilesArray[index].shipNameRef = nameRef;
    tilesArray[index].shipSectionIndexRef = indexRef;
  };

  const resetTile = (name) => {
    tilesArray.forEach((item) => {
      const tileObject = item;
      if (item.shipNameRef === name) {
        tileObject.occupied = false;
        tileObject.firedAt = false;
        tileObject.shipNameRef = null;
        tileObject.shipSectionIndexRef = null;
      }
    });
  };

  const placeShipValidate = (ship, x, y) => {
    let valid = false;
    if (ship.getDirection() === 'xAxis' && (ship.getLength() + x <= 10)) {
      valid = true;
    } else if (ship.getDirection() === 'yAxis'
        && (ship.getLength() + y <= 10)) {
      valid = true;
    }
    return valid;
  };

  const placeShip = (ship, x, y) => {
    const validMove = placeShipValidate(ship, x, y);
    const axis = ship.getDirection();
    const shipLength = ship.getLength();
    const shipName = ship.getName();

    if (validMove && axis === 'xAxis') {
      for (let i = 0; i < shipLength; i += 1) {
        const targetTileIndex = tilesArray.findIndex((item) => item.x === x
            && item.y === y + i);
        updateTile(targetTileIndex, true, shipName, i);
      }
    }

    if (validMove && axis === 'yAxis') {
      for (let i = 0; i < shipLength; i += 1) {
        const targetTileIndex = tilesArray.findIndex((item) => item.x === x + i
            && item.y === y);
        updateTile(targetTileIndex, true, shipName, i);
      }
    }
  };

  return {
    getPlayer,
    getTilesArray,
    getFleet,
    placeShip,
  };
};

export default Gameboard;
