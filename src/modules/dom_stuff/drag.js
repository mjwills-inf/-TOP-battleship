import { dragImagesObj, shipLengthObj } from './dragData';

const Drag = (placeFunc) => {
  console.log(placeFunc);
  // images loaded into obj before call because setDragImage
  const dragImages = dragImagesObj();
  const getDragImage = (id) => dragImages[`${id}`];

  let currentDrag = '';
  const currentDragAxis = 'x';

  // const dragStartTile = (ev) => {
  //   const img = new Image();
  //   const ref = ev.target.getAttribute('data-ship-ref').toLowerCase()
  //   img.src = dragImageById(`drag-${ref}`);
  //   ev.dataTransfer.setDragImage(img, 0, 0);
  //   old tiles stay in play turn gray until tiles array cleared
  //   current drag and current axis variables updated
  // }


  const tileHighlight = (shipLength, axis, tile) => {
    const tileCoord = tile.getAttribute('data-xy-ref').split(',');
    const currentTileX = tileCoord[0];
    const currentTileY = tileCoord[1];
    if (axis === 'x') {
      for (let i = 0; i < shipLength; i += 1) {
        const highLightY = parseInt(currentTileY, 10) + i;
        const targetTile = document.querySelector(`.js-data-xy-${currentTileX}-${highLightY}`);
        targetTile.classList.toggle('dragenter-highlight');
      }
    } else if (axis === 'y') {
      for (let i = 0; i < shipLength; i += 1) {
        const highLightX = parseInt(currentTileX, 10) + i;
        const targetTile = document.querySelector(`.js-data-xy-${highLightX}-${currentTileY}`);
        targetTile.classList.toggle('dragenter-highlight');
      }
    }
  };

  const dragStartShip = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    const img = getDragImage(ev.target.id);
    // can setDragImage with a styled element here (can build it)
    ev.dataTransfer.setDragImage(img, 0, 0);
    currentDrag = ev.target.id;
  };

  const dragDrop = (ev) => {
    ev.preventDefault();
    ev.target.classList.remove('dragenter');
    const data = ev.dataTransfer.getData('text');
    console.log(data);
    // here place ship with data
    // color other occupied squares
    // enable other occupied squares
  };

  const dragEnter = (ev) => {
    ev.target.classList.add('dragenter');
    const currentDragLength = shipLengthObj[`${currentDrag}`];
    tileHighlight(currentDragLength, currentDragAxis, ev.target);
  };

  const dragLeave = (ev) => {
    const currentDragLength = shipLengthObj[`${currentDrag}`];
    tileHighlight(currentDragLength, currentDragAxis, ev.target);
    setTimeout(() => {
      ev.target.classList.remove('dragenter');
      ev.target.classList.add('dragenter-on');
    }, 200);
    setTimeout(() => {
      ev.target.classList.remove('dragenter-on');
    }, 400);
  };

  const addListeners = () => {
    const ships = document.querySelectorAll('.drag-ship');
    const tiles = document.querySelectorAll('.tile-div');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', dragStartShip, false);
    });
    tiles.forEach((tile) => {
      tile.addEventListener('dragover', (ev) => ev.preventDefault());
      tile.addEventListener('drop', dragDrop, false);
      tile.addEventListener('dragenter', dragEnter, false);
      tile.addEventListener('dragleave', dragLeave, false);
    });
  };

  return {
    addListeners,
  };
};

export default Drag;
