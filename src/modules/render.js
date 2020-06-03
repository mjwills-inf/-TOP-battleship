const Render = () => {
  const renderGrid = (gameboard) => {
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

      if (gameboard.getType() === 'human') {
        const shipRef = tiles[i].shipNameRef;
        tile.setAttribute('data-ship-ref', shipRef);

        if (tiles[i].occupied === true) {
          tile.classList.add('occupied');
        }
      }
      gridDiv.appendChild(tile);
    }

    if (gameboard.getType() === 'human') {
      humanGridDiv.appendChild(gridDiv);
    } else {
      computerGridDiv.appendChild(gridDiv);
    }
  };

  // to change appearance of players grid on start
  const renderStart = () => {
    const target = document.querySelector('#human-grid .rendered-grid-div');
    target.classList.remove('rendered-grid-div');
    target.classList.add('player-start-grid');
  };

  const updateTile = (domElement, arrayTile) => {
    const domTile = domElement;
    if (arrayTile.occupied === true) {
      domTile.style.background = 'purple';
    } else {
      domTile.style.background = 'lightblue';
    }
    // ship dependant styling in here
  };

  // const updateFleet = () => {
  //   const
  // }

  // const gameOver = () => {
  //   const
  // };

  return {
    renderGrid,
    renderStart,
    updateTile,
  };
};

export default Render;
