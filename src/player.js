import Gameboard from './gameboard'

const Player = (name) => {
  const getName = () => name
  const gameboard = Gameboard() 
  const makeAttack = (opponent, coordinates) => {
    opponent.gameboard.shotHandler(coordinates.x, coordinates.y)
  };

  return {
    getName,
    gameboard,
    makeAttack
  }
}

export default Player