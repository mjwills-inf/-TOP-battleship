const compChoice = (gameboard) => {
  let x; let y; let
    lastShotTile;

  const tiles = gameboard.getTilesArray();

  const shotOptions = [...tiles];

  // const occupiedTiles = tiles.filter((element) => element.occupied === true);

  // const hitOccupiedTiles = occupiedTiles.filter((element) => element.firedAt === true);

  const checkSurroundingTiles = (tile) => {
    const refX = tile.x;
    const refY = tile.y;
    let tileAbove; let tileBelow; let tileLeft; let tileRight;

    if ((refX - 1) >= 1) {
      tileAbove = tiles.find((ele) => ele.x === (refX - 1) && ele.y === refY);
    }

    if (tileAbove === undefined) {
      // shot is on edge of square (ship is not sunk)
    }

    if ((refX + 1) <= 10) {
      tileBelow = tiles.find((ele) => ele.x === (refX + 1) && ele.y === refY);
    }

    if (tileBelow === undefined) {
      // shot is on edge of square (ship is not sunk)
    }

    if ((refY - 1) >= 1) {
      tileLeft = tiles.find((ele) => ele.x === refX && ele.y === (refY - 1));
    }

    if (tileLeft === undefined) {
      // shot is on edge of square (ship is not sunk)
    }
    if ((refY + 1) <= 10) {
      tileRight = tiles.find((ele) => ele.x === refX && ele.y === (refY + 1));
    }

    if (tileRight === undefined) {
      // shot is on edge of square (ship is not sunk)
    }
  };

  function getRandomCoords() {
    const randomIndex = Math.floor(Math.random() * (shotOptions.length + 1));
    const targetTile = shotOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    lastShotTile = targetTile;
    shotOptions.splice(randomIndex, 1);
  }

  const checkShipSunk = () => {
    const shipName = lastShotTile.shipNameRef;
    const ship = gameboard.getFleet().find((ele) => ele.getName() === shipName);
    if (ship.getSunk() === true) {
      getRandomCoords();
    } else {
      checkSurroundingTiles(lastShotTile);
    }
  };

  if (lastShotTile === undefined) {
    getRandomCoords();
  }

  if (lastShotTile.occupied === true) {
    checkShipSunk();
  }

  // console.log(coordinates)

  return {
    x,
    y,
  };
};

export default compChoice;
