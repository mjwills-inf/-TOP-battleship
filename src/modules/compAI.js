const CompAI = (gameboard) => {
  let x; let y; let lastShotTile; let targetShip;
  let targetShotCount = 0;

  const tiles = gameboard.getTilesArray();

  const shotOptions = [...tiles];

  const checkSurroundingTiles = (tile) => {
    // so we are here . targetShip set (not sunk), get availible tiles around ship
    // if only one shot on ship,random pick from surrounding
    // if 2 shots on ship, then in same axis
    console.log('CHECKING SURROUNDING TILES');
    const refX = tile.x;
    const refY = tile.y;
    const tileAbove = ((refX - 1) >= 1) ? tiles.find((ele) => ele.x === (refX - 1)
        && ele.y === refY) : null;
    const tileBelow = ((refX + 1) <= 10) ? tiles.find((ele) => ele.x === (refX + 1)
        && ele.y === refY) : null;
    const tileLeft = ((refY - 1) >= 1) ? tiles.find((ele) => ele.x === refX
        && ele.y === (refY - 1)) : null;
    const tileRight = ((refY + 1) <= 10) ? tiles.find((ele) => ele.x === refX
        && ele.y === (refY + 1)) : null;

    console.log('checkSurroundingTiles -> tileAbove', tileAbove);
    console.log('checkSurroundingTiles -> tileBelow', tileBelow);
    console.log('checkSurroundingTiles -> tileLeft', tileLeft);
    console.log('checkSurroundingTiles -> tileRight', tileRight);

    console.log('CompAI -> targetShotCount', targetShotCount);

    // shotOptions.splice(chosenIndex, 1);
    targetShotCount += 1;
  };

  function getRandomCoords() {
    console.log('getRandomCoords =>', targetShip);
    const randomIndex = Math.floor(Math.random() * (shotOptions.length + 1));
    const targetTile = shotOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    lastShotTile = targetTile;
    targetShotCount = 1;
    shotOptions.splice(randomIndex, 1);
  }

  const checkShipSunk = () => {
    console.log('CHECKING SUNK');
    const shipName = lastShotTile.shipNameRef;
    const ship = gameboard.getFleet().find((ele) => ele.getName() === shipName);
    console.log('check ship sunk = ', ship);
    if (ship.getSunk() === true) {
      console.log(' if (ship.getSunk() === true) >>>>> call random coords');
      targetShip = undefined;
      getRandomCoords();
    } else {
      targetShip = ship;
      checkSurroundingTiles(lastShotTile);
    }
  };


  const chooseTarget = function chooseTarget() {
    console.log('CHOOSING TARGET');
    console.log('last shot tile = ', lastShotTile);
    console.log('target ship =', targetShip);
    if (lastShotTile === undefined) {
      getRandomCoords();
    } else if (lastShotTile.occupied === true) {
      checkShipSunk();
    } else {
      getRandomCoords();
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
