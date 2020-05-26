const compStupid= (gameboard) => {

    let x, y, lastShotTile
  
    const tiles = gameboard.getTilesArray();
  
    const shotOptions = [...tiles];
     
    function getRandomCoords() {
      let randomIndex = Math.floor(Math.random() * (shotOptions.length + 1))
      let targetTile = shotOptions[randomIndex]
      x = targetTile.x
      y = targetTile.y
      lastShotTile = targetTile;
      shotOptions.splice(randomIndex, 1)
    }
    
    getRandomCoords()

    return {
      x,
      y
    }
  };
  
  export default compStupid;
  