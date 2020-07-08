const CompAI = (gameboard) => {
  let x;
  let y;
  let initialShotTile;
  let lastShotTile;
  let lastShotIsHit;
  let lastShotIsTargetHit;
  let initialShotOptions = [];
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

  const updateShotVariables = (targetTile) => {
    console.log('updateShotVariables');
    x = targetTile.x;
    y = targetTile.y;

    if (targetTile.occupied === true) {
      lastShotIsHit = true;
    } else {
      lastShotIsHit = false;
    }
    if (targetTile.shipNameRef === targetShip.getName()) {
      lastShotIsTargetHit = true;
    } else {
      lastShotIsTargetHit = false;
    }
    targetShots.push(targetTile);
    const index = remainingTileOptions.findIndex((item) => (item.x === targetTile.x
        && item.y === targetTile.y));
    remainingTileOptions.splice(index, 1);
    lastShotTile = targetTile;
  };

  const clearShotVariables = () => {
    console.log('clearShotVariables');
    targetShip = undefined;
    targetShots = [];
    surroundingTiles = [];
    initialShotOptions = [];
    lastShotIsTargetHit = undefined;
  };

  const edgeTileCheck = (direction) => {
    console.log('edgeTileCheck');
    let arr;
    if (direction === 'x') {
      arr = targetShots.filter((item) => item.y === 1 || item.y === 10);
    } else {
      arr = targetShots.filter((item) => item.x === 1 || item.x === 10);
    }
    return (arr.length > 0);
  };

  const clearRemaining = () => {
    console.log('clearRemaining');
    const arr = remainingTileOptions
      .filter((item) => item.shipNameRef === targetShip.getName());
    const randomIndex = Math.floor(Math.random() * (arr.length));
    const targetTile = arr[randomIndex];
    updateShotVariables(targetTile);
  };

  const clearDirection = (direction) => {
    console.log('clearDirection');
    const axisProp = (direction === 'x') ? 'y' : 'x';
    const tileAxisKeep = (lastShotTile[`${direction}`]);
    if (initialShotTile[`${axisProp}`] > lastShotTile[`${axisProp}`]) {
      const tileAxisChange = ((lastShotTile[`${axisProp}`]) - 1);
      const targetTile = remainingTileOptions
        .filter((item) => item[`${axisProp}`] === tileAxisChange
        && item[`${direction}`] === tileAxisKeep);
      if (targetTile.length === 1) {
        updateShotVariables(targetTile[0]);
      } else {
        clearRemaining();
      }
    } else {
      const tileAxisChange = ((lastShotTile[`${axisProp}`]) + 1);
      const targetTile = remainingTileOptions
        .filter((item) => item[`${axisProp}`] === tileAxisChange
        && item[`${direction}`] === tileAxisKeep);
      if (targetTile.length === 1) {
        updateShotVariables(targetTile[0]);
      } else {
        clearRemaining();
      }
    }
  };

  // ////////////////////////////////////////////////////////////////////////////////////
  const getSmartCoords = () => {
    console.log('getSmartCoords');
    const targetHealth = targetShip.getHealth();
    const targetLength = targetShip.getLength();
    // //
    // Second shot following a hit - get surrounding Tiles and target them
    // //
    if (targetShots.length === 1) {
      console.log('getSmartCoords = 2nd shot on surroundings');
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
      updateShotVariables(targetTile);
      initialShotOptions.splice(randomIndex, 1);
      // //
      // Third shot if second missed - continue target of surrounding tiles
      // //
    } else if (lastShotIsTargetHit === false && (targetLength - targetHealth) === 1) {
      console.log('getSmartCoords = 3rd shot after miss on surroundings');
      const randomIndex = Math.floor(Math.random() * (initialShotOptions.length));
      const targetTile = initialShotOptions[randomIndex];
      updateShotVariables(targetTile);
      initialShotOptions.splice(randomIndex, 1);
      // //
      // Third shot onwards if second hit - continue target in axis of hits
      // //
    } else if (lastShotIsTargetHit === true && (targetLength - targetHealth) >= 2) {
      // GOES BACK HERE BECAUSE THE DIRECTION SHOT IS TRUE FROM CLEARREAMAING

      console.log('getSmartCoords = 3rd onwards for direction');
      const direction = targetShip.getDirection().charAt(0);
      console.log('if (edgeTileCheck(direction)) =', edgeTileCheck(direction));
      if (edgeTileCheck(direction)) {
        clearRemaining();
      } else {
        clearDirection(direction);
      }
      // //
      // Third shot onwards if last shot has missed (and so reached boundary of ship)
      // //
    } else if (lastShotIsHit === false && (targetLength - targetHealth) >= 2) {
      console.log('getSmartCoords = 3rd onwards for clearing ship');
      clearRemaining();
    } else {
      console.log('getSmartCoords = ELSE ... WHAT');
    }
  };
  // ////////////////////////////////////////////////////////////////////////////////////

  const startTargeting = (targetTile) => {
    console.log('startTargeting');
    const shipName = targetTile.shipNameRef;
    targetShip = gameboard.getFleet().find((ele) => ele.getName() === shipName);
    targetShots.push(targetTile);
    lastShotIsHit = true;
    initialShotTile = targetTile;
    if (lastShotIsTargetHit === undefined) {
      lastShotIsTargetHit = true;
    }
  };

  function getRandomCoords() {
    console.log('getRandomCoords');
    const randomIndex = Math.floor(Math.random() * (remainingTileOptions.length));
    const targetTile = remainingTileOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    lastShotTile = targetTile;
    if (targetTile.shipNameRef !== null) {
      startTargeting(targetTile);
    }
    remainingTileOptions.splice(randomIndex, 1);
  }

  const checkOtherTargets = () => {
    console.log('checkOtherTargets');
    const fleet = gameboard.getFleet();
    const damagedShips = fleet
      .filter((item) => item.getSunk() === false
      && item.getHealth() < item.getLength());
    console.log(damagedShips);
    if (damagedShips.length === 0) {
      getRandomCoords();
    } else {
      targetShip = damagedShips[0];
      const hitTile = tiles.filter((item) => item.shipNameRef === targetShip.getName()
        && item.firedAt === true);
      console.log('hitTile', hitTile);
      targetShots.push(hitTile[0]);
      lastShotTile = hitTile[0];
      initialShotTile = hitTile[0];
      lastShotIsHit = true;
      lastShotIsTargetHit = true;
      getSmartCoords();
    }
  };

  const checkShipSunk = () => {
    console.log('checkShipSunk');
    if (targetShip.getSunk() === true) {
      clearShotVariables();
      checkOtherTargets();
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
    console.log('returns = ', { x, y });
    console.log('ENDTURNOFCHOOSETARGET.............................................');
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
