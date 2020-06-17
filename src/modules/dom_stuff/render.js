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
          tile.setAttribute('draggable', true); // QASFASKNOASDJ
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

  const renderEnemyFleet = (enemy) => {
    const target = document.querySelector('#enemy-fleet');
    const fleet = enemy.gameboard.getFleet();
    for (let i = 0; i < fleet.length; i += 1) {
      const fleetShip = document.createElement('div');
      fleetShip.classList.add('fleet-ship');
      fleetShip.setAttribute('ShipRef', fleet[i].getName());
      const fleetShipLength = fleet[i].getLength();
      for (let j = 0; j < fleetShipLength; j += 1) {
        const shipSection = document.createElement('span');
        const ref = `${fleet[i].getName()}${j}`;
        shipSection.setAttribute('data-section-ref', ref);
        shipSection.classList.add('ship-section');
        fleetShip.appendChild(shipSection);
      }
      target.appendChild(fleetShip);
    }
  };

  const updateTile = (domElement, arrayTile) => {
    const domTile = domElement;
    if (arrayTile.occupied === true) {
      domTile.classList.add('hit');
    } else {
      domTile.classList.add('miss');
    }
    // ship dependant styling in here?
  };

  const updateFleet = (arrayTile) => {
    if (arrayTile.occupied) {
      const ref = `${arrayTile.shipNameRef}${arrayTile.shipSectionIndexRef}`;
      const targetElement = document.querySelector(`[data-section-ref="${ref}"]`);
      targetElement.classList.add('section-hit');
    }
  };

  // const changeStartButton = () => {

  // }

  // const gameOver = () => {
  //   const
  // };

  return {
    renderGrid,
    renderStart,
    renderEnemyFleet,
    updateTile,
    updateFleet,
  };
};

export default Render;