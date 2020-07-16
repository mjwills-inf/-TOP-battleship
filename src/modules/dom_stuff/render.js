const Render = () => {
  const clearGrid = (gameboard) => {
    const humanGridDiv = document.querySelector('#human-grid');
    if (gameboard.getType() === 'human') {
      humanGridDiv.innerHTML = '';
    }
  };

  const renderGrid = (gameboard) => {
    const tiles = gameboard.getTilesArray();
    const humanGridDiv = document.querySelector('#human-grid');
    const computerGridDiv = document.querySelector('#computer-grid');
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('rendered-grid-div');

    for (let i = 0; i < tiles.length; i += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile-div');
      tile.classList.add(`js-data-xy-${tiles[i].x}-${tiles[i].y}`);
      const xyRef = `${tiles[i].x},${tiles[i].y}`;
      tile.setAttribute('data-xy-ref', xyRef);

      if (gameboard.getType() === 'human') {
        const shipRef = tiles[i].shipNameRef;
        tile.setAttribute('data-ship-ref', shipRef);
        const sectionRef = tiles[i].shipSectionIndexRef;
        tile.setAttribute('data-sec-ref', sectionRef);

        if (tiles[i].occupied === true) {
          tile.classList.add('occupied');
        }
        if (tiles[i].occupied === true && tiles[i].shipSectionIndexRef === 0) {
          tile.setAttribute('draggable', true);
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

  const disablePlaceShip = (data) => {
    const target = document.querySelector(`#${data}`);
    target.style.backgroundColor = '#DBE2E7'; // MANUAL COLOR
    target.setAttribute('draggable', false);
    target.style.cursor = 'auto';
  };

  // game start function to change appearance of players grid on start
  const changeHumanGrid = () => {
    const target = document.querySelector('#human-grid .rendered-grid-div');
    target.classList.remove('rendered-grid-div');
    target.classList.add('player-start-grid');
  };

  const renderEnemyFleet = (enemy) => {
    // TRYING TO CHANGE ORDER OF SHIPS
    const target = document.querySelector('#enemy-fleet');
    const header = document.createElement('h3');
    header.innerText = 'Enemy Fleet';
    target.appendChild(header);
    const fleet = enemy.gameboard.getFleet();

    const domArray = [];

    for (let i = 0; i < fleet.length; i += 1) {
      const fleetShip = document.createElement('div');
      fleetShip.classList.add('fleet-ship');
      fleetShip.setAttribute('ShipRef', fleet[i].getName());
      const fleetShipLength = fleet[i].getLength();
      for (let j = 1; j <= fleetShipLength; j += 1) {
        const shipSection = document.createElement('span');
        const ref = `${fleet[i].getName()}${j}`;
        shipSection.setAttribute('data-health-ref', ref);
        shipSection.classList.add('ship-health');
        fleetShip.appendChild(shipSection);
      }
      domArray.push(fleetShip);
    }
    domArray.reverse();
    domArray.forEach((element) => {
      target.appendChild(element);
    });
  };

  const updateTile = (domElement, arrayTile) => {
    const domTile = domElement;
    if (arrayTile.occupied === true) {
      domTile.classList.add('hit');
    } else {
      domTile.classList.add('miss');
    }
  };

  const updateFleet = (arrayTile, fleet) => {
    if (arrayTile.occupied) {
      const ship = fleet.filter((item) => item.getName() === arrayTile.shipNameRef);
      const healthRef = (ship[0].getHealth()) + 1;
      const ref = `${arrayTile.shipNameRef}${healthRef}`;
      const targetElement = document.querySelector(`[data-health-ref="${ref}"]`);
      targetElement.classList.add('health-hit');
    }
  };

  const changeLayout = () => {
    const gameContainerDiv = document.querySelector('#game-container');
    gameContainerDiv.classList.add('game-start-grid');
    const instructions = document.querySelector('#drag-instruction');
    instructions.parentNode.removeChild(instructions);
  };

  const changeButtons = () => {
    const startButton = document.querySelector('#start-button');
    const autoButton = document.querySelector('#auto-place-div');
    startButton.innerHTML = 'New Game';
    startButton.addEventListener('click', () => {
      window.location.reload();
    });
    autoButton.parentNode.removeChild(autoButton);
  };

  const gameOver = (type) => {
    const loser = (type === 'computer') ? 'Computer' : 'Player';
    console.log('gameOver -> loser', loser);
    const winner = (type === 'computer') ? 'Player' : 'Computer';
    console.log('gameOver -> winner', winner);
  };

  return {
    clearGrid,
    renderGrid,
    changeHumanGrid,
    changeButtons,
    changeLayout,
    renderEnemyFleet,
    updateTile,
    updateFleet,
    disablePlaceShip,
    gameOver,
  };
};

export default Render;
