import Player from './player';
import renderGrid from './render';

const Game = () => {
  // Game function is called and Players set up
  const human = Player('human', 'Human');
  const computer = Player('compuer', 'Johnny 5');

  // let winner;
  // let gameOver = false;
  // let currentTurn = human;

  // Place ships (to be replaced with random + choice)
  const compShip1 = computer.gameboard.getFleet()[0];
  const compShip2 = computer.gameboard.getFleet()[1];
  const compShip3 = computer.gameboard.getFleet()[2];
  const compShip4 = computer.gameboard.getFleet()[3];
  const compShip5 = computer.gameboard.getFleet()[4];
  computer.gameboard.placeShip(compShip1, 1, 1);
  computer.gameboard.placeShip(compShip2, 3, 3);
  computer.gameboard.placeShip(compShip3, 5, 5);
  computer.gameboard.placeShip(compShip4, 7, 7);
  computer.gameboard.placeShip(compShip5, 9, 9);

  const humanShip1 = human.gameboard.getFleet()[0];
  const humanShip2 = human.gameboard.getFleet()[1];
  const humanShip3 = human.gameboard.getFleet()[2];
  const humanShip4 = human.gameboard.getFleet()[3];
  const humanShip5 = human.gameboard.getFleet()[4];
  human.gameboard.placeShip(humanShip1, 1, 1);
  human.gameboard.placeShip(humanShip2, 3, 3);
  human.gameboard.placeShip(humanShip3, 5, 5);
  human.gameboard.placeShip(humanShip4, 7, 7);
  human.gameboard.placeShip(humanShip5, 9, 9);

  // Gameflow functions
  // const changeTurn = () => {
  //   currentTurn = (currentTurn === human) ? computer : human;
  // };

  // const endGameCheck = () => {
  //   if (human.gameboard.fleetSunkCheck === true) {
  //     gameOver = true;
  //     winner = computer;
  //   }
  //   if (computer.gameboard.fleetSunkCheck === true) {
  //     gameOver = true;
  //     winner = human;
  //   }
  //   return gameOver;
  // };

  // const humanMove = (event) => {
  //   const coord = event.target.data;
  // };

  renderGrid(human.gameboard);
};


export default Game;
