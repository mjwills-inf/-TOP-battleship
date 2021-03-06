import highlight from './highlight';

const Drag = (gameboard, render) => {
  const fleet = gameboard.getFleet();
  let currentDragShip;
  let currentActiveTiles;
  let announced = false;

  const getDragGroup = (ev) => {
    const dragGroup = [];
    const tileCoord = ev.target.getAttribute('data-xy-ref').split(',');
    const currentTileX = tileCoord[0];
    const currentTileY = tileCoord[1];

    for (let i = 0; i < currentDragShip[0].getLength(); i += 1) {
      if (currentDragShip[0].getDirection() === 'xAxis') {
        const highLightY = parseInt(currentTileY, 10) + i;
        const targetTile = document.querySelector(`.js-data-xy-${currentTileX}-${highLightY}`);
        if (targetTile != null) {
          dragGroup.push(targetTile);
        }
      } else if (currentDragShip[0].getDirection() === 'yAxis') {
        const highLightX = parseInt(currentTileX, 10) + i;
        const targetTile = document.querySelector(`.js-data-xy-${highLightX}-${currentTileY}`);
        if (targetTile != null) {
          dragGroup.push(targetTile);
        }
      }
    }
    return dragGroup;
  };

  const getPrimaryTile = (dataShipRef) => {
    const shipTiles = [...document.querySelectorAll(`[data-ship-ref=${dataShipRef}]`)];
    const targetTile = shipTiles.find((item) => item.getAttribute('data-sec-ref') === '0');
    return targetTile;
  };

  const replacePlaceship = (shipRef) => {
    const fleetShip = fleet.filter((ship) => ship.getName() === shipRef);
    const oldTile = getPrimaryTile(shipRef);
    const oldTileCoord = oldTile.getAttribute('data-xy-ref').split(',');
    gameboard.placeShip(fleetShip[0], Number(oldTileCoord[0]), Number(oldTileCoord[1]));
  };

  const makeTilesFade = (targetTiles) => {
    if (currentActiveTiles) {
    // filters out any tiles that will be active following new dragenter
      const targetTilesSort = targetTiles.filter((item) => !currentActiveTiles.includes(item));
      targetTilesSort.forEach((item) => {
        setTimeout(() => {
          item.classList.remove('dragenter-active');
          item.classList.add('dragleave-fade');
        }, 100);
        setTimeout(() => {
          item.classList.remove('dragleave-fade');
        }, 400);
      });
      currentActiveTiles = null;
    } else {
    // acts as sweep for leaving tile grid area after setting currentActiveTiles to null
      targetTiles.forEach((item) => {
        setTimeout(() => {
          item.classList.remove('dragenter-active');
          item.classList.add('dragleave-fade');
        }, 100);
        setTimeout(() => {
          item.classList.remove('dragleave-fade');
        }, 400);
      });
    }
  };

  const makeTilesActive = (targetTiles) => {
    targetTiles.forEach((item) => {
      item.classList.add('dragenter-active');
    });
  };

  const switchTilesFade = (preSwitchTiles) => {
    const preSwitchArray = [...preSwitchTiles];
    const tiles = [...document.querySelectorAll('.tile-div')];
    const targetTiles = tiles
      .filter((arrayTile) => preSwitchArray
        .find((switchTile) => arrayTile.dataset.xyRef === switchTile.dataset.xyRef));
    makeTilesActive(targetTiles);
    makeTilesFade(targetTiles);
  };

  const hoverOccupied = (ev) => {
    const shipRef = ev.target.getAttribute('data-ship-ref');
    const targetTile = getPrimaryTile(shipRef);
    targetTile.classList.add('wiggle');
  };

  const hoverOccupiedRemove = (ev) => {
    const shipRef = ev.target.getAttribute('data-ship-ref');
    const targetTile = getPrimaryTile(shipRef);
    targetTile.classList.remove('wiggle');
  };

  const makeDragImage = (shipName) => {
    const dragDiv = document.createElement('div');
    dragDiv.id = 'drag-image';
    dragDiv.innerHTML = `${shipName}`;
    document.body.appendChild(dragDiv);
    return dragDiv;
  };

  const removeDragImage = () => {
    const dragDiv = document.querySelector('#drag-image');
    if (dragDiv) {
      dragDiv.parentNode.removeChild(dragDiv);
    }
  };

  const checkReadyInstruction = () => {
    const fleetPlaced = gameboard.getFleet()
      .every((element) => element.placed === true);
    if (fleetPlaced && announced === false) {
      render.instructionTyper('Fleet positioned. Battle.');
      announced = true;
    }
  };

  const dragEnd = (ev) => {
    const tileShipRef = ev.target.getAttribute('data-ship-ref');
    if (tileShipRef !== null) {
      replacePlaceship(tileShipRef);
      render.clearGrid(gameboard);
      render.renderGrid(gameboard);
      // eslint-disable-next-line no-use-before-define
      addListeners();
    }
    removeDragImage();
  };

  const dragDrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const shipRef = data.slice(5).charAt(0).toUpperCase() + data.slice(6);
    const fleetShip = fleet.filter((ship) => ship.getName() === shipRef);
    const newTileCoord = ev.target.getAttribute('data-xy-ref').split(',');
    const oldTile = getPrimaryTile(shipRef);

    if (oldTile) {
      gameboard.resetTile(shipRef);
    }

    if (gameboard.placeShipValid(fleetShip[0], Number(newTileCoord[0]), Number(newTileCoord[1]))) {
      gameboard.resetTile(shipRef);
      gameboard.placeShip(fleetShip[0], Number(newTileCoord[0]), Number(newTileCoord[1]));
      render.disablePlaceShip(data);
      // eslint-disable-next-line no-use-before-define
      removeListener(data);
      render.clearGrid(gameboard);
      render.renderGrid(gameboard);
      // eslint-disable-next-line no-use-before-define
      addListeners();
      checkReadyInstruction();
    } else {
      const targetTiles = getDragGroup(ev);
      makeTilesFade(targetTiles);
      if (oldTile) {
        replacePlaceship(shipRef);
      }
      render.clearGrid(gameboard);
      render.renderGrid(gameboard);
      // eslint-disable-next-line no-use-before-define
      addListeners();
    }
    removeDragImage();
  };

  const dragLeave = (ev) => {
    const targetTiles = getDragGroup(ev);
    makeTilesFade(targetTiles);
  };

  const dragEnter = (ev) => {
    const targetTiles = getDragGroup(ev);
    currentActiveTiles = targetTiles;
    makeTilesActive(targetTiles);
  };

  const dragStartShip = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    const shipRef = ev.target.getAttribute('data-ship');
    const dragDiv = makeDragImage(shipRef);
    ev.dataTransfer.setDragImage(dragDiv, 45, -10);
    currentDragShip = fleet.filter((ship) => ship.getName() === shipRef);
  };

  const dragStartTile = (ev) => {
    const shipRef = ev.target.getAttribute('data-ship-ref');
    const dragDiv = makeDragImage(shipRef);
    ev.dataTransfer.setDragImage(dragDiv, 45, -10);
    const shipRefLc = shipRef.toLowerCase();
    ev.dataTransfer.setData('text', `drag-${shipRefLc}`);
    currentDragShip = fleet.filter((ship) => ship.getName() === shipRef);
    const tiles = document.querySelectorAll(`[data-ship-ref=${shipRef}]`);
    tiles.forEach((tile) => {
      const target = tile;
      target.classList.remove('occupied');
    });
  };

  const dblClick = (ev) => {
    let validMove = false;
    const shipRef = ev.target.getAttribute('data-ship-ref');
    const preSwitchTiles = document.querySelectorAll(`[data-ship-ref=${shipRef}]`);
    const fleetShip = fleet.filter((ship) => ship.getName() === shipRef);
    const coord = ev.target.getAttribute('data-xy-ref').split(',');
    gameboard.resetTile(shipRef);
    fleetShip[0].switchDirection();
    if (gameboard.placeShipValid(fleetShip[0], Number(coord[0]), Number(coord[1]))) {
      gameboard.placeShip(fleetShip[0], Number(coord[0]), Number(coord[1]));
      validMove = true;
    } else {
      fleetShip[0].switchDirection();
      gameboard.placeShip(fleetShip[0], Number(coord[0]), Number(coord[1]));
    }
    render.clearGrid(gameboard);
    render.renderGrid(gameboard);
    // eslint-disable-next-line no-use-before-define
    addListeners();
    if (validMove === true) {
      switchTilesFade(preSwitchTiles, shipRef);
    }
  };

  const removeListener = (data) => {
    const target = document.querySelector(`#${data}`);
    target.removeEventListener('dragstart', dragStartShip);
  };

  const addListeners = () => {
    const ships = document.querySelectorAll('.drag-ship');
    const tiles = [...document.querySelectorAll('.tile-div')];
    const occupiedTiles = tiles.filter((item) => item.classList.contains('occupied'));
    const secondaryTiles = occupiedTiles.filter((item) => {
      const secRef = item.getAttribute('data-sec-ref');
      return secRef !== '0';
    });
    const primaryTiles = document.querySelectorAll('[data-sec-ref="0"]');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', dragStartShip, false);
    });
    tiles.forEach((tile) => {
      tile.addEventListener('dragover', (ev) => ev.preventDefault());
      tile.addEventListener('drop', dragDrop, false);
      tile.addEventListener('dragenter', dragEnter, false);
      tile.addEventListener('dragleave', dragLeave, false);
      tile.addEventListener('touchstart', highlight);
    });
    secondaryTiles.forEach((tile) => {
      tile.addEventListener('mouseover', hoverOccupied, false);
      tile.addEventListener('mouseout', hoverOccupiedRemove, false);
    });
    primaryTiles.forEach((tile) => {
      tile.addEventListener('dragstart', dragStartTile, false);
      tile.addEventListener('dblclick', dblClick);
      tile.addEventListener('touchstart', dblClick);
    });
    document.addEventListener('dragend', dragEnd);
  };

  const endDrag = () => {
    render.clearGrid(gameboard);
    render.renderGrid(gameboard);
    const primaryTiles = document.querySelectorAll('[data-sec-ref="0"]');
    primaryTiles.forEach((tile) => {
      const domTile = tile;
      domTile.style.cursor = 'auto';
    });
    const ships = document.querySelectorAll('.drag-ship');
    const tiles = [...document.querySelectorAll('.tile-div')];
    const occupiedTiles = tiles.filter((item) => item.classList.contains('occupied'));
    const secondaryTiles = occupiedTiles.filter((item) => {
      const secRef = item.getAttribute('data-sec-ref');
      return secRef !== '0';
    });
    ships.forEach((ship) => {
      ship.removeEventListener('dragstart', dragStartShip);
    });
    tiles.forEach((tile) => {
      tile.removeEventListener('dragover', (ev) => ev.preventDefault());
      tile.removeEventListener('drop', dragDrop, false);
      tile.removeEventListener('dragenter', dragEnter, false);
      tile.removeEventListener('dragleave', dragLeave, false);
    });
    secondaryTiles.forEach((tile) => {
      tile.removeEventListener('mouseover', hoverOccupied, false);
      tile.removeEventListener('mouseout', hoverOccupiedRemove, false);
    });
    primaryTiles.forEach((tile) => {
      tile.removeEventListener('dragstart', dragStartTile, false);
      tile.removeEventListener('dblclick', dblClick);
      tile.removeEventListener('touchstart', dblClick);
    });
    document.removeEventListener('dragend', dragEnd);
  };

  const removeDragShips = () => {
    const target = document.querySelector('#human-fleet');
    target.parentNode.removeChild(target);
  };

  return {
    addListeners,
    endDrag,
    removeDragShips,
  };
};

export default Drag;
