import Player from './player';
import Render from './dom_stuff/render';
import compShips from './compShips';
import Drag from './dom_stuff/drag';
import CompAI from './compAI';

const Game = () => {
  // Game function is called in index and Players set up
  const human = Player('human');
  const computer = Player('computer');
  const compAI = CompAI(human.gameboard);
  // Create render and drag/drop objects
  const render = Render();
  const drag = Drag(human.gameboard, render);

  // Place computer ships
  compShips(computer.gameboard);

  // Render start player board for ship placement
  render.renderGrid(human.gameboard);
  drag.addListeners();

  // // // // // // Game flow functions and listeners

  const processTurnComputer = () => {
    const computerChoice = compAI.chooseTarget();
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
    }, 10);
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
      drag.endDrag();
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
