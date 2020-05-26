const compChoice = (gameboard) => {

  let x, y, lastShotTile

  const tiles = gameboard.getTilesArray();

  const shotOptions = [...tiles];

  const occupiedTiles = tiles.filter((element) => {
    element.occupied === true
  });

  const hitOccupiedTiles = occupiedTiles.filter((element) => {
    element.firedAt === true
  });

  const checkSurroundingTiles = (element) => {

    let refX = element.x
    let refY = element.y
    let tileAbove, tileBelow, tileLeft, tileRight

    if ((refX - 1) >= 1) {
      tileAbove = tiles.find((element) => { element.x === (refX - 1)
          && element.y === refY });
    }
    
    if (tileAbove === undefined) {
      // shot is on edge of square (ship is not sunk)
    }

    if ((refX + 1) <= 10) {
    tileBelow = tiles.find((element) => { element.x === (refX + 1)
        && element.y === refY });
    }

    if (tileBelow === undefined) {
      // shot is on edge of square (ship is not sunk)
    }    

    if ((refY - 1) >= 1) {
    tileLeft = tiles.find((element) => { element.x === refX
        && element.y === (refY - 1) });
    }

    if (tileLeft === undefined) {
      // shot is on edge of square (ship is not sunk)
    }
    if ((refY + 1) <= 10) {
    tileRight = tiles.find((element) => { element.x === refX
        && element.y === (refY + 1) });    
    }

    if (tileRight === undefined) {
      // shot is on edge of square (ship is not sunk)
    }
  }
 
  function getRandomCoords() {
    let randomIndex = Math.floor(Math.random() * (shotOptions.length + 1))
    let targetTile = shotOptions[randomIndex]
    x = targetTile.x
    y = targetTile.y
    lastShotTile = targetTile;
    shotOptions.splice(randomIndex, 1)
  }
  
  const checkShipSunk = () => {
    let shipName = lastShotTile.shipNameRef
    let ship = gameboard.getFleet().find((element) => element.getName() === shipName)
    if (ship.getSunk() === true) {
      getRandomCoords()
    } else {
      checkSurroundingTiles(lastShotTile)
    }
  }

  if (lastShotTile === undefined) {
    getRandomCoords()
  };

  if (lastShotTile.occupied === true) {
    checkShipSunk()
  }

  // console.log(coordinates)

  return {
    x,
    y
  }
};

export default compChoice;
