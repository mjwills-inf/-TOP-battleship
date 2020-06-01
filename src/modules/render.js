const Render = () => {
  const renderPlayerGrid = (gameboard) => {
    const tiles = gameboard.getTilesArray();

    const humanGridDiv = document.querySelector('#human-grid');
    const computerGridDiv = document.querySelector('#computer-grid');

    const gridDiv = document.createElement('div');
    gridDiv.classList.add('rendered-grid-div');

    for (let i = 0; i < tiles.length; i += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile-div');

      const xyRef = `${tiles[i].x},${tiles[i].y}`;
      tile.setAttribute('data-xy-ref', xyRef);

      const shipRef = tiles[i].shipNameRef;
      tile.setAttribute('data-ship-ref', shipRef);

      if (tiles[i].occupied === true) {
        tile.classList.add('occupied');
      }
      gridDiv.appendChild(tile);
    }

    if (gameboard.getType() === 'human') {
      humanGridDiv.appendChild(gridDiv);
    } else {
      computerGridDiv.appendChild(gridDiv);
    }
  };


  return {
    renderPlayerGrid,
  };
};

export default Render;
