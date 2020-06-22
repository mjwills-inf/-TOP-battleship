import Player from './player';
import Render from './dom_stuff/render';
import compStupid from './compStupid';
import Drag from './dom_stuff/drag';

const Game = () => {
  // Game function is called in index and Players set up
  const human = Player('human');
  const computer = Player('computer');
  // Create render and drag/drop objects
  const render = Render();
  const drag = Drag(human.gameboard, render);

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

  // const humanShip1 = human.gameboard.getFleet()[0];
  // const humanShip2 = human.gameboard.getFleet()[1];
  // const humanShip3 = human.gameboard.getFleet()[2];
  // const humanShip4 = human.gameboard.getFleet()[3];
  // const humanShip5 = human.gameboard.getFleet()[4];
  // const humanShip6 = human.gameboard.getFleet()[5];
  // const humanShip7 = human.gameboard.getFleet()[6];
  // const humanShip8 = human.gameboard.getFleet()[7];
  // human.gameboard.placeShip(humanShip1, 1, 3);
  // human.gameboard.placeShip(humanShip2, 3, 3);
  // human.gameboard.placeShip(humanShip3, 5, 3);
  // human.gameboard.placeShip(humanShip4, 7, 3);
  // human.gameboard.placeShip(humanShip5, 9, 3);
  // human.gameboard.placeShip(humanShip6, 9, 7);
  // human.gameboard.placeShip(humanShip7, 7, 7);
  // human.gameboard.placeShip(humanShip8, 5, 7);

  // Render start player board for ship placement (will be above placing ships)
  render.renderGrid(human.gameboard);
  drag.addListeners();

  // // // // // // Game flow functions and listeners

  const processTurnComputer = () => {
    const computerChoice = compStupid(human.gameboard);
    const domDataRef = `${computerChoice.x},${computerChoice.y}`;
    const targetDom = document.querySelector(`#human-grid [data-xy-ref="${domDataRef}"]`);
    const arrayTile = human.gameboard.getTileInfo(computerChoice);
    computer.makeAttack(human, computerChoice);
    render.updateTile(targetDom, arrayTile);
    // eslint-disable-next-line no-use-before-define
    addTileListeners();
  };

  // Process Turn on shot being made
  const processTurnHuman = (e) => {
    const dataRef = e.target.getAttribute('data-xy-ref').split(',');
    const coordObj = { x: Number(dataRef[0]), y: Number(dataRef[1]) };
    human.makeAttack(computer, coordObj);
    const arrayTile = computer.gameboard.getTileInfo(coordObj);
    render.updateTile(e.target, arrayTile);
    // eslint-disable-next-line no-use-before-define
    disableListeners();
    render.updateFleet(arrayTile);
    setTimeout(() => {
      processTurnComputer();
    }, 1000);
  };

  // Add Tile eventListeners that call processTurnHuman on click
  // if tile not alreay fired at (with hit or miss in classList)
  const addTileListeners = () => {
    const compTiles = document.querySelectorAll('#computer-grid .tile-div');
    compTiles.forEach((tile) => {
      if ((!tile.classList.contains('hit')) && (!tile.classList.contains('miss'))) {
        tile.addEventListener('click', processTurnHuman);
      }
    });
  };

  // Disable listeners immediately following turn
  const disableListeners = () => {
    const compTiles = document.querySelectorAll('#computer-grid .tile-div');
    compTiles.forEach((tile) => {
      tile.removeEventListener('click', processTurnHuman);
    });
  };

  // Game begins (and tileListeners added) on start button press
  // (check if all ships are placed)
  const gameBegin = () => {
    const fleetPlaced = human.gameboard.getFleet()
      .every((element) => element.placed === true);
    if (fleetPlaced) {
      render.renderGrid(computer.gameboard);
      render.renderStart();
      render.renderEnemyFleet(computer);
      addTileListeners();
    }
  };

  const button = document.querySelector('button');
  button.addEventListener('click', gameBegin);

  // Gameflow functions
  // const endGameCheck = () => {
  //   if (human.gameboard.fleetSunkCheck === true) {
  //     render.gameOver(human.gameboard.type)
  //   }
  //   if (computer.gameboard.fleetSunkCheck === true) {
  //     render.gameOver(computer.gameboard.type)
  //   }
  // };
};

export default Game;
