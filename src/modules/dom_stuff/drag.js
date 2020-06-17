// import Carrier from '../../img/carrier.png';
// import Battleship from '../../img/battleship.png';
// import Corvette from '../../img/corvette.png';
// import Cruiser from '../../img/cruiser.png';
// import Destroyer from '../../img/destroyer.png';
// import Frigate from '../../img/frigate.png';
// import Gunboat from '../../img/gunboat.png';
// import Submarine from '../../img/submarine.png';

import dragImagesObj from './dragImage';

const Drag = (funcArg) => {
  console.log(funcArg);

  const dragImages = dragImagesObj();
  console.log(dragImages);

  // const carrierImg = new Image();
  // carrierImg.src = Carrier;
  // const battleshipImg = new Image();
  // battleshipImg.src = Battleship;
  // const cruiserImg = new Image();
  // cruiserImg.src = Cruiser;
  // const submarineImg = new Image();
  // submarineImg.src = Submarine;
  // const destroyerImg = new Image();
  // destroyerImg.src = Destroyer;
  // const frigateImg = new Image();
  // frigateImg.src = Frigate;
  // const corvetteImg = new Image();
  // corvetteImg.src = Corvette;
  // const gunboatImg = new Image();
  // gunboatImg.src = Gunboat;

  const getDragImage = (id) => dragImages[`${id}`];
  // let result;
  // switch (id) {
  //   case 'drag-carrier':
  //     // eslint-disable-next-line prefer-destructuring
  //     result = dragImageArray[0];
  //     break;
  //   case 'drag-battleship':
  //     result = battleshipImg;
  //     break;
  //   case 'drag-cruiser':
  //     result = cruiserImg;
  //     break;
  //   case 'drag-submarine':
  //     result = submarineImg;
  //     break;
  //   case 'drag-destroyer':
  //     result = destroyerImg;
  //     break;
  //   case 'drag-frigate':
  //     result = frigateImg;
  //     break;
  //   case 'drag-corvette':
  //     result = corvetteImg;
  //     break;
  //   case 'drag-gunboat':
  //     result = gunboatImg;
  //     break;
  //   default:
  //     break;
  // }
  // return result;


  // const dragStartTile = (ev) => {
  //   const img = new Image();
  //   const ref = ev.target.getAttribute('data-ship-ref').toLowerCase()
  //   img.src = dragImageById(`drag-${ref}`);
  //   ev.dataTransfer.setDragImage(img, 0, 0);
  // }

  const dragDrop = (ev) => {
    console.log(ev);
  };


  const addListeners = () => {
    const ships = document.querySelectorAll('.drag-ship');
    const tiles = document.querySelectorAll('.tile-div');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', (ev) => {
        console.log(ev);
        console.log(ev.target);
        ev.dataTransfer.setData('text', ev.target.id);
        const img = getDragImage(ev.target.id);
        ev.dataTransfer.setDragImage(img, 0, 0);
      }, false);
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
