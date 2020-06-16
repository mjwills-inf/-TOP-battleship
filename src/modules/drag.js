import Test from '../img/test.png';

const Drag = (funcArg) => {
  console.log(funcArg);

  const dragStartShip = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    const img = new Image();
    img.src = Test;
    ev.dataTransfer.setDragImage(img, 0, 0);
  };
  // const dragStartTile = (ev) => {

  // }
  const dragDrop = (ev) => {
    console.log(ev);
  };


  const addListeners = () => {
    const ships = document.querySelectorAll('.drag-ship');
    const tiles = document.querySelectorAll('.tile-div');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', dragStartShip);
    });
    tiles.forEach((tile) => {
      tile.addEventListener('drop', dragDrop);
    });
  };


  return {
    addListeners,
  };
};

export default Drag;
