const compStupid = (gameboard) => {
  let x; let y;

  const tiles = gameboard.getTilesArray();

  const shotOptions = [...tiles];

  function getRandomCoords() {
    const randomIndex = Math.floor(Math.random() * (shotOptions.length + 1));
    const targetTile = shotOptions[randomIndex];
    x = targetTile.x;
    y = targetTile.y;
    shotOptions.splice(randomIndex, 1);
  }

  getRandomCoords();

  return {
    x,
    y,
  };
};

export default compStupid;
