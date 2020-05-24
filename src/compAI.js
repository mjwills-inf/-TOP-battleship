const compChoice = (gameboard) => {

  let x, y, lastShotTile

  const tiles = gameboard.getTilesArray();

  const tilesRemaining = [...tiles];

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
 
  function getRandomCoords() {
    let randomIndex = Math.floor(Math.random() * (tilesRemaining.length + 1))
    let targetTile = tilesRemaining[randomIndex]
    x = targetTile.x
    y = targetTile.y
    lastShotTile = targetTile;
    tilesRemaining.splice(randomIndex, 1)
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

  // if hits tiles around them
  // if hits and all around them not occupied then back to random

  return {
    x,
    y
  }
};

export default compChoice;
