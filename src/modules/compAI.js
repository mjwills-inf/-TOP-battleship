const CompAI = (gameboard) => {
  let x; let y; let lastShotTile; let targetShip;
  // possibly let target shots = 0

  const tiles = gameboard.getTilesArray();

  const shotOptions = [...tiles];

  // const occupiedTiles = tiles.filter((element) => element.occupied === true);

  // const hitOccupiedTiles = occupiedTiles.filter((element) => element.firedAt === true);

  const checkSurroundingTiles = (tile) => {

    // so we are here . targetShip set (not sunk), get availible tiles around ship
    // if only one shot on ship,random pick from surrounding
    // if 2 shots on ship, then in same axis
  
    console.log('checking surrounds tiles');
    const refX = tile.x;
    const refY = tile.y;
    let tileAbove; let tileBelow; let tileLeft; let tileRight;
  };

  function getRandomCoords() {
    console.log('getting random coords');
    const randomIndex = Math.floor(Math.random() * (shotOptions.length + 1));
    const targetTile = shotOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    lastShotTile = targetTile;
    shotOptions.splice(randomIndex, 1);
  }

  const checkShipSunk = () => {
    console.log('checking last shot ship has been sunk');
    const shipName = lastShotTile.shipNameRef;
    const ship = gameboard.getFleet().find((ele) => ele.getName() === shipName);
    if (ship.getSunk() === true) {
      getRandomCoords();
    } else {
      targetShip = ship;
      checkSurroundingTiles(lastShotTile);
    }
  };


  const chooseTarget = function chooseTarget() {
    if (lastShotTile === undefined || lastShotTile.occupied === false) {
      getRandomCoords();
    }
    if (lastShotTile.occupied === true) {
      checkShipSunk();
    }
    return {
      x,
      y,
    };
  };

  return {
    chooseTarget,
  };
};

export default CompAI;

// if ((refX - 1) >= 1) {
//   tileAbove = tiles.find((ele) => ele.x === (refX - 1) && ele.y === refY);
// }

// if (tileAbove === undefined) {
//   // shot is on edge of square (ship is not sunk)
// }

// if ((refX + 1) <= 10) {
//   tileBelow = tiles.find((ele) => ele.x === (refX + 1) && ele.y === refY);
// }

// if (tileBelow === undefined) {
//   // shot is on edge of square (ship is not sunk)
// }

// if ((refY - 1) >= 1) {
//   tileLeft = tiles.find((ele) => ele.x === refX && ele.y === (refY - 1));
// }

// if (tileLeft === undefined) {
//   // shot is on edge of square (ship is not sunk)
// }
// if ((refY + 1) <= 10) {
//   tileRight = tiles.find((ele) => ele.x === refX && ele.y === (refY + 1));
// }

// if (tileRight === undefined) {
//   // shot is on edge of square (ship is not sunk)
// }

// const compStupid = (gameboard) => {
//   let x; let y;

//   const tiles = gameboard.getTilesArray();

//   const shotOptions = [...tiles];

//   function getRandomCoords() {
//     const randomIndex = Math.floor(Math.random() * (shotOptions.length + 1));
//     const targetTile = shotOptions[randomIndex];
//     x = targetTile.x;
//     y = targetTile.y;
//     shotOptions.splice(randomIndex, 1);
//   }

//   getRandomCoords();

//   return {
//     x,
//     y,
//   };
// };
