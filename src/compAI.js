const compChoice = (gameboard) => {
  let x, y, lastShotTile


  const tiles = gameboard.getTilesArray();

  const occupiedTiles = tiles.filter((element) => {
    element.occupied === true
  });

  const hitOccupiedTiles = occupiedTiles.filter((element) => {
    element.firedAt === true
  });

  const checkSurroundingTiles = (element) => {
    let refX = element.x
    let refY = element.y
    
    let tileAbove = tiles.find((element) => { element.x === (refX - 1)
        && element.y === refY });
    let tileBelow = tiles.find((element) => { element.x === (refX + 1)
        && element.y === refY });
    let tileLeft = tiles.find((element) => { element.x === refX
        && element.y === (refY - 1) });
    let tileRight = tiles.find((element) => { element.x === refX
        && element.y === (refY + 1) });
    
  }

  // const currentHitTile = hitOccupiedTiles.filter((element) => {
    
  // })

  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const updateLastShot = (xRef, yRef) => {
    let lastShotTile = tiles.find((element) => { element.x === xRef 
        && element.y ===yRef
    })
  } 
  const updateCoords = (newX, newY) => {
    x = newX
    y = newY
    updateLastShot(x, y)
  };  

  const checkShotValid = (xRef, yRef) => {
    let targetTile = tiles.find((element) => { element.x === xRef
        && element.y === yRef });
    if (targetTile.firedAt === true) {
      checkShotValid (randomNumber(1, 10), randomNumber(1, 10))
    }  else {
      updateCoords(xRef, yRef)
    }
  }

  const checkShipSunk = () => {
    let shipName = lastShotTile.shipNameRef
    let ship = gameboard.getFleet().find((element) => element.getName() === shipName)
    if (ship.getSunk() === true) {
      checkShotValid(randomNumber(1, 10), randomNumber(1, 10))
    } else {
      checkSurroundingTiles(lastShotTile)
    }

  }


  if (lastShotTile === undefined) {
    checkShotValid(randomNumber(1, 10), randomNumber(1, 10));
  };

  if (lastShotTile.occupied === true) {
    checkShipSunk()
  }



  // console.log(coordinates)

  // if hits tiles around them
  // if hits and all around them not occupied then back to random

  return {
    x,
    y
  }
};

export default compChoice;
