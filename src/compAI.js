const compChoice = (gameboard) => {
  let x, y, lastShot


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
    let shotOption = false
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
    let lastShot = tiles.find((element) => { element.x === xRef 
        && element.y ===yRef
    })
  }
 
  const updateCoords = (newX, newY) => {
    x = newX
    y = newY
    updateLastShot(x, y)
  };

  


  if (hitOccupiedTiles.length === 0) {
    updateCoords(randomNumber(1, 10), randomNumber(1, 10));
  };

  // console.log(coordinates)

  // if hits tiles around them
  // if hits and all around them not occupied then back to random

  return {
    x,
    y
  }
};

export default compChoice;
