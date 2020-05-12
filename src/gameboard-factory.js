import Ship from './ship-factory';

const Gameboard = (player) => {
  const getPlayer = player;

  const tilesArray = [];
  for (let i = 1; i <= 10; i += 1) {
    for (let j = 1; j <= 10; j += 1) {
      const tile = {
        x: i,
        y: j,
        occupied: false,
        firedAt: false,
      };
      tilesArray.push(tile);
    }
  }

  const fleet = [];

  const carrier = Ship('Carrier', 5, player);
  const battleship = Ship('Battleship', 4, player);
  const cruiser = Ship('Cruiser', 3, player);
  const submarine = Ship('Submarine', 3, player);
  const destroyer = Ship('Destroyer', 2, player);

  fleet.push(carrier, battleship, cruiser, submarine, destroyer);


  return {
    getPlayer,
    tilesArray,
    fleet,
  };
};

export default Gameboard;
