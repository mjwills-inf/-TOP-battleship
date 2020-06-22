import { dragImagesObj } from './dragData';
// , shipLengthObj

const Drag = (gameboard) => {
  console.log(gameboard);
  // images loaded into obj before call because setDragImage
  const dragImages = dragImagesObj();
  const getDragImage = (id) => dragImages[`${id}`];

  let currentDragShip;


  // //////////////////////////////////////////////////////////////////////
  // const dragStartTile = (ev) => {
  //   const img = new Image();
  //   const ref = ev.target.getAttribute('data-ship-ref').toLowerCase()
  //   img.src = dragImageById(`drag-${ref}`);
  //   ev.dataTransfer.setDragImage(img, 0, 0);
  // }
  // //////////////////////////////////////////////////////////////////////


  // const clearHighlight = (newHighlights) => {
  //   let highlights = [...document.querySelectorAll('.dragenter-highlight')];
  //   highlights = highlights.filter((value) => !newHighlights.includes(value));

  //   highlights.forEach((item) => {
  //     setTimeout(() => {
  //       item.classList.remove('dragenter-highlight');
  //       item.classList.add('highlight-fade');
  //     }, 200);
  //     setTimeout(() => {
  //       item.classList.remove('highlight-fade');
  //     }, 400);
  //   });
  // };

  // const tileHighlight = (shipLength, axis, tile) => {
  //   // PASSED array with tiles to highlight
  //   const tilesToHighlight = [];
  //   const tileCoord = tile.getAttribute('data-xy-ref').split(',');
  //   const currentTileX = tileCoord[0];
  //   const currentTileY = tileCoord[1];

  //   for (let i = 0; i < shipLength; i += 1) {
  //     if (axis === 'x') {
  //       const highLightY = parseInt(currentTileY, 10) + i;
  //       const targetTile = document.querySelector(`.js-data-xy-${currentTileX}-${highLightY}`);
  //       if (targetTile != null) {
  //         tilesToHighlight.push(targetTile);
  //       }
  //     } else if (axis === 'y') {
  //       const highLightX = parseInt(currentTileX, 10) + i;
  //       const targetTile = document.querySelector(`.js-data-xy-${highLightX}-${currentTileY}`);
  //       if (targetTile != null) {
  //         tilesToHighlight.push(targetTile);
  //       }
  //     }
  //   }

  //   clearHighlight(tilesToHighlight);

  //   tilesToHighlight.forEach((item) => {
  //     item.classList.add('dragenter-highlight');
  //   });
  // };


  // const dragDrop = (ev) => {
  //   ev.preventDefault();
  //   ev.target.classList.remove('dragenter');
  //   const data = ev.dataTransfer.getData('text');
  //   console.log(data);
  //   // here place ship with data
  //   // color other occupied squares
  //   // enable other occupied squares
  // };

  const dragEnter = (ev) => {
    const currentEnter = ev.target;
    const dragEnterGroup = [];
    const tileCoord = currentEnter.getAttribute('data-xy-ref').split(',');
    const currentTileX = tileCoord[0];
    const currentTileY = tileCoord[1];

    console.log('dragEnter -> currentTileX', currentTileX);
    console.log('dragEnter -> dragEnterGroup', dragEnterGroup);
    console.log('dragEnter -> currentTileY', currentTileY);

    console.log('dragEnter -> currentDragShip', currentDragShip[0]);

    // const currentDragLength = shipLengthObj[`${currentDrag}`];
    // tileHighlight(currentDragLength, currentDragAxis, ev.target);
  };

  // const dragLeave = (ev) => {
  //   setTimeout(() => {
  //     ev.target.classList.remove('dragenter');
  //     ev.target.classList.add('dragenter-on');
  //   }, 200);
  //   setTimeout(() => {
  //     ev.target.classList.remove('dragenter-on');
  //   }, 400);
  // };

  const dragStartShip = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    const img = getDragImage(ev.target.id);
    // can setDragImage with a styled element here (can build it)
    ev.dataTransfer.setDragImage(img, 0, 0);
    const shipRef = ev.target.getAttribute('data-ship');
    const fleet = gameboard.getFleet();
    currentDragShip = fleet.filter((ship) => ship.getName() === shipRef);
  };

  const addListeners = () => {
    const ships = document.querySelectorAll('.drag-ship');
    const tiles = document.querySelectorAll('.tile-div');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', dragStartShip, false);
    });
    tiles.forEach((tile) => {
      // tile.addEventListener('dragover', (ev) => ev.preventDefault());
      // tile.addEventListener('drop', dragDrop, false);
      tile.addEventListener('dragenter', dragEnter, false);
      // tile.addEventListener('dragleave', dragLeave, false);
    });
  };

  return {
    addListeners,
  };
};

export default Drag;
