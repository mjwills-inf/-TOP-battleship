const CompAI = (gameboard) => {
  let x;
  let y;
  let initialShotTile;
  console.log('CompAI -> initialShotTile', initialShotTile);
  let lastShotTile;
  let lastShotIsHit;
  const initialShotOptions = [];
  let surroundingTiles = [];
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
    const returnArray = [];
    tileArray.forEach((item) => {
      if (item !== null) {
        returnArray.push(item);
      }
    });
    return returnArray;
  };

  const updateShotVariables = (targetTile, targetIndex) => {
    x = targetTile.x;
    y = targetTile.y;

    if (targetTile.occupied === true) {
      lastShotIsHit = true;
    } else {
      lastShotIsHit = false;
    }
    targetShots.push(targetTile);
    initialShotOptions.splice(targetIndex, 1);
    remainingTileOptions.splice(targetIndex, 1);
  };

  const clearShotVariables = () => {
    targetShip = undefined;
    targetShots = [];
    surroundingTiles = [];
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////
  const getSmartCoords = () => {
    const targetHealth = targetShip.getHeath();
    const targetLength = targetShip.getLength();

    // first shot after finding a valid hit on ship
    if (targetShots.length === 1) {
      initialShotTile = lastShotTile;

      const refX = lastShotTile.x;
      const refY = lastShotTile.y;

      surroundingTiles = getSurroundingTiles(refX, refY);

      surroundingTiles.forEach((item) => {
        if (item.firedAt === false) {
          initialShotOptions.push(item);
        }
      });

      const randomIndex = Math.floor(Math.random() * (initialShotOptions.length));
      const targetTile = initialShotOptions[randomIndex];
      updateShotVariables(targetTile, randomIndex);
    }

    // surrounding tiles still not have hit (only 1 damage) - work through initial shot options)
    if (lastShotIsHit === false && (targetLength % targetHealth) === 1) {
      const randomIndex = Math.floor(Math.random() * (initialShotOptions.length));
      const targetTile = initialShotOptions[randomIndex];
      updateShotVariables(targetTile, randomIndex);
    }
    if (lastShotIsHit === true && (targetLength % targetHealth) === 2) {
      // once damage is 2, work in axis of damage continuing in same direction
    }
    if (lastShotIsHit === false && (targetLength % targetHealth) > 2) {
      // damage over 2 and a miss (then target ships actual cuz we know)
    }
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////

  // perhaps function check after to see if any ships have been hit but are not sunk
  // incase get smart coords hits an adjacent ship (and should then know that is another target)

  function getRandomCoords() {
    const randomIndex = Math.floor(Math.random() * (remainingTileOptions.length));
    const targetTile = remainingTileOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    lastShotTile = targetTile;
    if (targetTile.shipNameRef !== null) {
      const shipName = lastShotTile.shipNameRef;
      targetShip = gameboard.getFleet().find((ele) => ele.getName() === shipName);
      targetShots.push(targetTile);
      lastShotIsHit = true;
    }
    remainingTileOptions.splice(randomIndex, 1);
  }

  const checkShipSunk = () => {
    if (targetShip.getSunk() === true) {
      clearShotVariables();
      getRandomCoords();
    } else {
      getSmartCoords();
    }
  };

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
