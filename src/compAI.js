const compChoice = (gameboard) => {
  const coordinates = {
    x: 0,
    y: 0,
  };

  const tiles = gameboard.getTilesArray();
  const occupiedTiles = tiles;

  // tiles that have been occupied
  // nohits occupied tiles without fired at
  // if that then random x and random y

  // if hits tiles around them
  // if hits and all around them not occupied then back to random

  return coordinates;
};

export default compChoice;
