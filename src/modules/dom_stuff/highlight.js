const removeChange = (tile) => {
  setTimeout(() => {
    tile.classList.remove('stagger-highlight');
  }, 200);
};

const change = (tile, i) => {
  const time = 50 * i;
  if (tile.getAttribute('data-ship-ref') === 'null') {
    setTimeout(() => {
      tile.classList.add('stagger-highlight');
      removeChange(tile);
    }, time);
  }
};


const highlight = (eve) => {
  const shipRef = eve.target.getAttribute('data-ship-ref');
  const tileCoord = eve.target.getAttribute('data-xy-ref').split(',');
  const x = tileCoord[0];
  const y = tileCoord[1];
  const upTiles = [];
  const downTiles = [];
  const leftTiles = [];
  const rightTiles = [];

  if (shipRef === 'null') {
    // console.log('tile empty', x, y);

    for (let i = Number(x); i <= 10; i += 1) {
      // console.log('down', i, y);
      const targetTile = document.querySelector(`.js-data-xy-${i}-${y}`);
      // console.log('down', targetTile);
      downTiles.push(targetTile);
    }
    for (let i = Number(y); i <= 10; i += 1) {
      // console.log('up', x, i);
      const targetTile = document.querySelector(`.js-data-xy-${x}-${i}`);
      upTiles.push(targetTile);
    }
    for (let i = Number(x); i > 0; i -= 1) {
      // console.log('left', i, y);
      const targetTile = document.querySelector(`.js-data-xy-${i}-${y}`);
      leftTiles.push(targetTile);
    }
    for (let i = Number(y); i > 0; i -= 1) {
      // console.log('right', x, i);
      const targetTile = document.querySelector(`.js-data-xy-${x}-${i}`);
      rightTiles.push(targetTile);
    }
  }

  for (let i = 0; i < 10; i += 1) {
    if (downTiles[i]) {
      change(downTiles[i], i);
    }
    if (upTiles[i]) {
      change(upTiles[i], i);
    }
    if (leftTiles[i]) {
      change(leftTiles[i], i);
    }
    if (rightTiles[i]) {
      change(rightTiles[i], i);
    }
  }
};

export default highlight;
