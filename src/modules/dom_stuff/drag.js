import dragImagesObj from './dragImage';

const Drag = (placeFunc) => {
  console.log(placeFunc);
  // images loaded into obj before call because setDragImage
  const dragImages = dragImagesObj();
  const getDragImage = (id) => dragImages[`${id}`];

  // const dragStartTile = (ev) => {
  //   const img = new Image();
  //   const ref = ev.target.getAttribute('data-ship-ref').toLowerCase()
  //   img.src = dragImageById(`drag-${ref}`);
  //   ev.dataTransfer.setDragImage(img, 0, 0);
  // }

  const dragStartShip = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    const img = getDragImage(ev.target.id);
    // can setDragImage with a styled element here (build it)
    ev.dataTransfer.setDragImage(img, 0, 0);
  };

  // const dragEnd = (ev) => {

  // }

  const dragDrop = (ev) => {
    ev.preventDefault();
    ev.target.classList.remove('dragenter');
    const data = ev.dataTransfer.getData('text');
    console.log(data);
    // here place ship
  };

  const dragEnter = (ev) => {
    ev.target.classList.add('dragenter');
  };

  const dragLeave = (ev) => {
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
