const compChoice = (gameboard) => {
  const coordinates = {
    x: 0,
    y: 0,
  };

  const tiles = gameboard.getTilesArray();
  const occupiedTiles = tiles.filter((element) => {
    element.occupied === true
  });

  randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  updateCords = (x, y) => {
    coordinates.x = x
    coordinates.y = y
  }


  if (occupiedTiles.every((element) => element.firedAt === false)) {
    updateCords(randomNumber(1, 10), randomNumber(1, 10));
  };

  // tiles that have been occupied
  // nohits occupied tiles without fired at
  // if that then random x and random y

  // if hits tiles around them
  // if hits and all around them not occupied then back to random

  return coordinates;
};

export default compChoice;
