const CompAI = (gameboard) => {
  let x;
  let y;
  let lastShotTile;
  let lastShotIsHit;
  let targetShip;
  let targetShots = [];
  const tiles = gameboard.getTilesArray();
  const remainingTileOptions = [...tiles];

  // helper functions
  const getSurroundingTiles = (refX, refY) => {
    const tileAbove = ((refX - 1) >= 1) ? tiles.find((ele) => ele.x === (refX - 1)
        && ele.y === refY) : null;
    const tileBelow = ((refX + 1) <= 10) ? tiles.find((ele) => ele.x === (refX + 1)
        && ele.y === refY) : null;
    const tileLeft = ((refY - 1) >= 1) ? tiles.find((ele) => ele.x === refX
        && ele.y === (refY - 1)) : null;
    const tileRight = ((refY + 1) <= 10) ? tiles.find((ele) => ele.x === refX
        && ele.y === (refY + 1)) : null;
    const tileArray = [tileAbove, tileBelow, tileLeft, tileRight];
    const surroundingTiles = [];
    tileArray.forEach((item) => {
      if (item !== null) {
        surroundingTiles.push(item);
      }
    });
    return surroundingTiles;
  };

  // if there is a target ship / if target ship is not sunk
  const checkSurroundingTiles = (lastTile) => {
    let tileToAnalyse;
    let initialShot

    const notFiredAt = [];
    // if only one shot on ship,random pick from surrounding
    // if 2 shots on ship, then in same axis
    console.log('CHECKING SURROUNDING TILES');
    console.log('checkSurroudingTiles -> targetShip', targetShip);

    if (targetShots.length === 1) {
      tileToAnalyse = lastTile;

      const refX = tileToAnalyse.x;
      const refY = tileToAnalyse.y;

      const surroundingTiles = getSurroundingTiles(refX, refY);

      surroundingTiles.forEach((item) => {
        if (item.firedAt === false) {
          notFiredAt.push(item);
        }
      });

      const randomIndex = Math.floor(Math.random() * (notFiredAt.length));
      const targetTile = notFiredAt[randomIndex];

      x = targetTile.x;
      y = targetTile.y;
    }

    // remainingTileOptions.splice(chosenIndex, 1);
    // targetShots.push(...targetTile...);
  };

  function getRandomCoords() {
    console.log('getRandomCoords =>', targetShip);
    const randomIndex = Math.floor(Math.random() * (remainingTileOptions.length));
    const targetTile = remainingTileOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    lastShotTile = targetTile;
    if (targetTile.shipNameRef !== null) {
      const shipName = lastShotTile.shipNameRef;
      targetShip = gameboard.getFleet().find((ele) => ele.getName() === shipName);
      targetShots.push(targetTile);
    }
    remainingTileOptions.splice(randomIndex, 1);
  }

  const checkShipSunk = () => {
    console.log('check sunk');
    if (targetShip.getSunk() === true) {
      targetShip = undefined;
      targetShots = [];
      getRandomCoords();
    } else {
      checkSurroundingTiles(lastShotTile);
    }
  };

  // needs check on if target ship in place then to check surrouding tiles
  // incase checksurrouding results is miss on possibile shots

  const chooseTarget = function chooseTarget() {
    if (lastShotTile === undefined) {
      getRandomCoords();
    } else if (targetShip !== undefined) {
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
