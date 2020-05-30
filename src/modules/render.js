const renderGrid = (gameboard) => {
  const tiles = gameboard.getTilesArray();
  
  const humanGridDiv = document.querySelector('#human-grid');
  const computerGridDiv = document.querySelector('#computer-grid')
  
  const gridDiv = document.createElement('div');  
  gridDiv.classList += 'rendered-grid-div';

  for (let i=0; i < tiles.length; i += 1) {
    
    const tile = document.createElement('div')
    tile.classList += 'tile-div'
    
    const xyRef = `${tiles[i].x},${tiles[i].y}`;
    tile.setAttribute('data-xy-ref', xyRef);

    const shipRef = tiles[i].shipNameRef;
    tile.setAttribute('data-ship-ref', shipRef)

    if (tiles[i].occupied === true) {
      tile.classList += 'occupied'

    }
//  NEED TO SORT CSS LOADER
  }
  
}

export default renderGrid;
