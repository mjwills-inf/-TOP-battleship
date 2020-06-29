const compShips = (gameboard) => {
  const randomCoord = () => Math.floor(Math.random() * 10) + 1;

  gameboard.getFleet().forEach((element) => {
    const x = Math.floor(Math.random() * 10) + 1;
    if (x > 5) {
      element.switchDirection();
    }
  });

  const tryPlace = (ship) => {
    const x = randomCoord();
    const y = randomCoord();
    if (gameboard.placeShipValid(ship, x, y)) {
      gameboard.placeShip(ship, x, y);
    } else {
      tryPlace(ship);
    }
  };

  gameboard.getFleet().forEach((element) => {
    tryPlace(element);
  });
};

export default compShips;
