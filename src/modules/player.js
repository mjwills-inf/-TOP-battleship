import Gameboard from './gameboard';

const Player = (type, name) => {
  const getName = () => name;
  const gameboard = Gameboard(type);
  const makeAttack = (opponent, coordinates) => {
    opponent.gameboard.shotHandler(coordinates.x, coordinates.y);
  };

  return {
    getName,
    gameboard,
    makeAttack,
  };
};

export default Player;
