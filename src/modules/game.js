import Player from './player';
import Render from './render';

const game = () => {
  // Create render object
  const render = Render();
  // Game function is called and Players set up
  const human = Player('human');
  const computer = Player('compuer');

  // let winner;
  let startGame = false;
  // let gameOver = false;
  // let currentTurn = human;

  // Place ships (to be replaced with random + choice)
  const compShip1 = computer.gameboard.getFleet()[0];
  const compShip2 = computer.gameboard.getFleet()[1];
  const compShip3 = computer.gameboard.getFleet()[2];
  const compShip4 = computer.gameboard.getFleet()[3];
  const compShip5 = computer.gameboard.getFleet()[4];
  const compShip6 = computer.gameboard.getFleet()[5];
  const compShip7 = computer.gameboard.getFleet()[6];
  const compShip8 = computer.gameboard.getFleet()[7];
  computer.gameboard.placeShip(compShip1, 1, 1);
  computer.gameboard.placeShip(compShip2, 3, 3);
  computer.gameboard.placeShip(compShip3, 5, 5);
  computer.gameboard.placeShip(compShip4, 7, 7);
  computer.gameboard.placeShip(compShip5, 9, 9);
  computer.gameboard.placeShip(compShip6, 2, 2);
  computer.gameboard.placeShip(compShip7, 4, 4);
  computer.gameboard.placeShip(compShip8, 6, 6);

  const humanShip1 = human.gameboard.getFleet()[0];
  const humanShip2 = human.gameboard.getFleet()[1];
  const humanShip3 = human.gameboard.getFleet()[2];
  const humanShip4 = human.gameboard.getFleet()[3];
  const humanShip5 = human.gameboard.getFleet()[4];
  const humanShip6 = human.gameboard.getFleet()[5];
  const humanShip7 = human.gameboard.getFleet()[6];
  const humanShip8 = human.gameboard.getFleet()[7];
  human.gameboard.placeShip(humanShip1, 1, 3);
  human.gameboard.placeShip(humanShip2, 3, 3);
  human.gameboard.placeShip(humanShip3, 5, 3);
  human.gameboard.placeShip(humanShip4, 7, 3);
  human.gameboard.placeShip(humanShip5, 9, 3);
  human.gameboard.placeShip(humanShip6, 9, 7);
  human.gameboard.placeShip(humanShip7, 7, 7);
  human.gameboard.placeShip(humanShip8, 5, 7);

  // Render start player board for ship placement
  render.renderGrid(human.gameboard);

  // Event listen on start game
  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    startGame = true;
    render.renderGrid(computer.gameboard);
    render.transformPlayerGrid();
  });

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

  if (startGame === true) {
    alert('start');
  }
};


export default game;
