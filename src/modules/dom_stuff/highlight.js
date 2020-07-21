const highlight = (eve) => {
  const shipRef = eve.target.getAttribute('data-ship-ref');
  const tileCoord = eve.target.getAttribute('data-xy-ref').split(',');
  const x = tileCoord[0];
  const y = tileCoord[1];
  if (shipRef === 'null') {
    console.log('tile empty', x, y);

    for (let i = Number(x); i <= 10; i += 1) {
      console.log('this direction');
    }
  }
};

export default highlight;
