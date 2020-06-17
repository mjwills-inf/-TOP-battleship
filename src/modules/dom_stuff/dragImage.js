import Carrier from '../../img/carrier.png';
import Battleship from '../../img/battleship.png';
import Corvette from '../../img/corvette.png';
import Cruiser from '../../img/cruiser.png';
import Destroyer from '../../img/destroyer.png';
import Frigate from '../../img/frigate.png';
import Gunboat from '../../img/gunboat.png';
import Submarine from '../../img/submarine.png';

const dragImagesObj = () => {
  const carrierImg = new Image();
  carrierImg.src = Carrier;
  // result.push(carrierImg);
  const battleshipImg = new Image();
  battleshipImg.src = Battleship;
  // result.push(battleshipImg);
  const cruiserImg = new Image();
  cruiserImg.src = Cruiser;
  // result.push(cruiserImg);
  const submarineImg = new Image();
  submarineImg.src = Submarine;
  // result.push(submarineImg);
  const destroyerImg = new Image();
  destroyerImg.src = Destroyer;
  // result.push(destroyerImg);
  const frigateImg = new Image();
  frigateImg.src = Frigate;
  // result.push(frigateImg);
  const corvetteImg = new Image();
  corvetteImg.src = Corvette;
  // result.push(corvetteImg);
  const gunboatImg = new Image();
  gunboatImg.src = Gunboat;
  // result.push(gunboatImg);

  const result = {
    'drag-carrier': carrierImg,
    'drag-battleship': battleshipImg,
    'drag-cruiser': cruiserImg,
    'drag-submarine': submarineImg,
    'drag-destroyer': destroyerImg,
    'drag-frigate': frigateImg,
    'drag-corvette': corvetteImg,
    'drag-gunboat': gunboatImg,
  };

  return result;
};


export default dragImagesObj;
