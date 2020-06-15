const Drag = () => {
  const addDropListeners = () => {
    const tiles = document.querySelectorAll('.tile-div');
    tiles.forEach((tile) => {
      tile.addEventListener('dragover', (ev) => {
        ev.preventDefault();
      });
    });
    tiles.forEach((tile) => {
      tile.addEventListener('drop', (ev) => {
        // ev.preventDefault();
        console.log(ev);
        console.log(ev.target);
      });
    });
  };

  return {
    addDropListeners,
  };
};

export default Drag;
