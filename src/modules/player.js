import Gameboard from './gameboard';

const Player = (type) => {
  const gameboard = Gameboard(type);
  const makeAttack = (opponent, coordinates) => {
    opponent.gameboard.shotHandler(coordinates.x, coordinates.y);
  };

  return {
    gameboard,
    makeAttack,
  };
};

export default Player;
