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
  const render = Render();
  const drag = Drag(human.gameboard, render);
  // Place computer ships, start player board for ship placement
  compShips(computer.gameboard);
  render.renderGrid(human.gameboard);
  drag.addListeners();

  // Game flow functions and listeners
  const endGameCheck = () => {
    let gameOver = false;
    if (human.gameboard.fleetSunkCheck() === true) {
      render.gameOver(human.gameboard.getType());
      gameOver = true;
    }
    if (computer.gameboard.fleetSunkCheck() === true) {
      render.gameOver(computer.gameboard.getType());
      gameOver = true;
    }
    return gameOver;
  };

  const processTurnComputer = () => {
    const computerChoice = compAI.chooseTarget();
    const domDataRef = `${computerChoice.x},${computerChoice.y}`;
    const targetDom = document.querySelector(`#human-grid [data-xy-ref="${domDataRef}"]`);
    const arrayTile = human.gameboard.getTileInfo(computerChoice);
    computer.makeAttack(human, computerChoice);
    render.updateTile(targetDom, arrayTile);
    setTimeout(() => {
      if (!endGameCheck()) {
        // eslint-disable-next-line no-use-before-define
        addTileListeners();
      }
    }, 10);
  };

  const processTurnHuman = (e) => {
    const dataRef = e.target.getAttribute('data-xy-ref').split(',');
    const coordObj = { x: Number(dataRef[0]), y: Number(dataRef[1]) };
    human.makeAttack(computer, coordObj);
    const arrayTile = computer.gameboard.getTileInfo(coordObj);
    render.updateTile(e.target, arrayTile);
    // eslint-disable-next-line no-use-before-define
    disableListeners();
    render.updateFleet(arrayTile, computer.gameboard.getFleet());
    setTimeout(() => {
      if (!endGameCheck()) {
        processTurnComputer();
      }
    }, 10);
  };

  // Add Tile eventListeners that call processTurnHuman on click
  const addTileListeners = () => {
    const compTiles = document.querySelectorAll('#computer-grid .tile-div');
    compTiles.forEach((tile) => {
      if ((!tile.classList.contains('hit')) && (!tile.classList.contains('miss'))) {
        tile.addEventListener('click', processTurnHuman);
      }
    });
  };
  const disableListeners = () => {
    const compTiles = document.querySelectorAll('#computer-grid .tile-div');
    compTiles.forEach((tile) => {
      tile.removeEventListener('click', processTurnHuman);
    });
  };

  // Auto-place human ships options
  const autoPlaceShips = () => {
    const fleet = human.gameboard.getFleet();
    fleet.forEach((ship) => {
      human.gameboard.resetTile(ship.getName());
      const shipNameLc = ship.getName().toLowerCase();
      const arg = `drag-${shipNameLc}`;
      render.disablePlaceShip(arg);
    });
    compShips(human.gameboard);
    render.clearGrid(human.gameboard);
    render.renderGrid(human.gameboard);
    drag.addListeners();
  };
  const autoButton = document.querySelector('#auto');
  autoButton.addEventListener('click', autoPlaceShips);


  // Game begins (and tileListeners added) on start Button press
  // (check if all ships are placed)
  const startButton = document.querySelector('#start');

  const gameBegin = () => {
    const fleetPlaced = human.gameboard.getFleet()
      .every((element) => element.placed === true);
    if (fleetPlaced) {
      startButton.removeEventListener('click', gameBegin);
      drag.endDrag();
      drag.removeDragShips();
      render.renderGrid(computer.gameboard);
      render.changeHumanGrid();
      render.renderEnemyFleet(computer);
      render.changeButtons();
      addTileListeners();
    }
  };
  startButton.addEventListener('click', gameBegin);
};

export default Game;
