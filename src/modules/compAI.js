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
    targetShip = undefined;
    targetShots = [];
    surroundingTiles = [];
    initialShotOptions = [];
    lastShotIsTargetHit = undefined;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////
  const edgeTileCheck = (direction) => {
    let arr;
    if (direction === 'x') {
      arr = targetShots.filter((item) => item.y === 1 || item.y === 10);
    } else {
      arr = targetShots.filter((item) => item.x === 1 || item.x === 10);
    }
    return (arr.length > 0);
    // OR IF TILE HAS ALREADY BEEN FIRED AT EDGE OF SHIP ? YES MOTHERFUCKER
    // HEREREHREHREHREHERH
  };

  const clearRemaining = () => {
    const arr = remainingTileOptions
      .filter((item) => item.shipNameRef === targetShip.getName());
    const randomIndex = Math.floor(Math.random() * (arr.length));
    const targetTile = arr[randomIndex];
    updateShotVariables(targetTile);
  };

  const clearDirection = (direction) => {
    const axisProp = (direction === 'x') ? 'y' : 'x';
    // console.log('axisProp CHANGE (tilexy)=', axisProp);
    // console.log('direction KEEP (tilexy)=', direction);

    const tileAxisKeep = (lastShotTile[`${direction}`]);
    // console.log('tileAxisKeep (number)=', tileAxisKeep);

    console.log('initial Shot Tile (axisProp)', initialShotTile[`${axisProp}`]);
    console.log('last Shot Tile (axisProp)', lastShotTile[`${axisProp}`]);
    // //
    if (initialShotTile[`${axisProp}`] > lastShotTile[`${axisProp}`]) {
      // console.log('GOING LEFT OR UP @ initialShotTile[`$axisProp`] > lastShotTile[`$axisProp`]');
      const tileAxisChange = ((lastShotTile[`${axisProp}`]) - 1);
      // console.log('tileAxisChange (number)=', tileAxisChange);
      const targetTile = remainingTileOptions
        .filter((item) => item[`${axisProp}`] === tileAxisChange
        && item[`${direction}`] === tileAxisKeep);
      // console.log(targetTile);
      updateShotVariables(targetTile);
    } else {
      // console.log('GOING RIGHT OR DOWN @ else');
      const tileAxisChange = ((lastShotTile[`${axisProp}`]) + 1);
      // console.log('tileAxisChange (number)=', tileAxisChange);
      const targetTile = remainingTileOptions
        .filter((item) => item[`${axisProp}`] === tileAxisChange
        && item[`${direction}`] === tileAxisKeep);
      // console.log(targetTile);
      updateShotVariables(targetTile[0]);
    }
  };
  // /////////////////////////////////////////////////////////////////////////////////////////////

  const getSmartCoords = () => {
    console.log('intial shot Tile =', initialShotTile);
    const targetHealth = targetShip.getHealth();
    const targetLength = targetShip.getLength();
    // //
    if (targetShots.length === 1) {
      console.log('SMART = first hit smart');
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
    } else if (lastShotIsTargetHit === false && (targetLength - targetHealth) === 1) {
      const randomIndex = Math.floor(Math.random() * (initialShotOptions.length));
      const targetTile = initialShotOptions[randomIndex];
      updateShotVariables(targetTile);
      initialShotOptions.splice(randomIndex, 1);
      // //
    } else if (lastShotIsTargetHit === true && (targetLength - targetHealth) >= 2) {
      const direction = targetShip.getDirection().charAt(0);

      if (edgeTileCheck(direction)) {
        clearRemaining();
      } else {
        clearDirection(direction);
      }
      // //
    } else if (lastShotIsHit === false && (targetLength - targetHealth) >= 2) {
      clearRemaining();
    }
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////

  // perhaps function check after to see if any ships have been hit but are not sunk
  // incase get smart coords hits an adjacent ship (and should then know that is another target)

  const startTargeting = (targetTile) => {
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
