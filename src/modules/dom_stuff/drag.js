import dragImagesObj from './dragData';

const Drag = (gameboard, render) => {
  console.log(render);
  const fleet = gameboard.getFleet();
  // images loaded into obj before call because setDragImage
  const dragImages = dragImagesObj();
  const getDragImage = (id) => dragImages[`${id}`];

  let currentDragShip;
  let currentActiveTiles;

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

  const hoverOccupied = (ev) => {
    const shipRef = ev.target.getAttribute('data-ship-ref');
    const shipTiles = [...document.querySelectorAll(`[data-ship-ref=${shipRef}]`)];
    const targetTile = shipTiles.find((item) => item.getAttribute('data-sec-ref') === '0');
    console.log('target HOVER', targetTile);
    targetTile.classList.add('wiggle');
    // MAKE IT WIGGLE BITCH
  };

  const dragDrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const shipRef = data.slice(5).charAt(0).toUpperCase() + data.slice(6);
    const shipArg = fleet.filter((ship) => ship.getName() === shipRef);
    const tileCoord = ev.target.getAttribute('data-xy-ref').split(',');
    const x = tileCoord[0];
    const y = tileCoord[1];
    if (gameboard.placeShipValid(shipArg[0], Number(x), Number(y))) {
      gameboard.resetTile(shipRef);
      gameboard.placeShip(shipArg[0], Number(x), Number(y));
      render.disablePlaceShip(data);
      // eslint-disable-next-line no-use-before-define
      removeListener(data);
      render.clearGrid(gameboard);
      render.renderGrid(gameboard);
      // eslint-disable-next-line no-use-before-define
      addListeners();
    } else {
      const targetTiles = getDragGroup(ev);
      makeTilesFade(targetTiles);
      render.clearGrid(gameboard);
      render.renderGrid(gameboard);
      // eslint-disable-next-line no-use-before-define
      addListeners();
    }
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
    const img = getDragImage(ev.target.id);
    // can setDragImage with a styled element here (can build it)
    ev.dataTransfer.setDragImage(img, 0, 0);
    const shipRef = ev.target.getAttribute('data-ship');
    currentDragShip = fleet.filter((ship) => ship.getName() === shipRef);
  };

  const dragStartTile = (ev) => {
    const ref = ev.target.getAttribute('data-ship-ref').toLowerCase();
    const img = getDragImage(`drag-${ref}`);
    ev.dataTransfer.setDragImage(img, 0, 0);
    // // can setDragImage with a styled element here (can build it)
    const shipRef = ev.target.getAttribute('data-ship-ref');
    const shipRefLc = shipRef.toLowerCase();
    ev.dataTransfer.setData('text', `drag-${shipRefLc}`);
    currentDragShip = fleet.filter((ship) => ship.getName() === shipRef);
    const tiles = document.querySelectorAll(`[data-ship-ref=${shipRef}]`);
    tiles.forEach((tile) => {
      const target = tile;
      target.classList.remove('occupied');
    });
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
    console.log('secondary tiles', secondaryTiles);
    const primaryTiles = document.querySelectorAll('[data-sec-ref="0"]');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', dragStartShip, false);
    });
    tiles.forEach((tile) => {
      tile.addEventListener('dragover', (ev) => ev.preventDefault());
      tile.addEventListener('drop', dragDrop, false);
      tile.addEventListener('dragenter', dragEnter, false);
      tile.addEventListener('dragleave', dragLeave, false);
    });
    secondaryTiles.forEach((tile) => {
      tile.addEventListener('mouseover', hoverOccupied, false);
    });
    primaryTiles.forEach((tile) => {
      tile.addEventListener('dragstart', dragStartTile, false);
    });
  };

  return {
    addListeners,
  };
};

export default Drag;
