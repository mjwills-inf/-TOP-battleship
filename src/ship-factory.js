const Ship = (name, length, player) => {
  let health = length * 1;
  let sunk = false;
  let direction = 'xAxis';
  const shipSections = Array(length).fill(1);

  const getName = () => name;
  const getLength = () => length;
  const getPlayer = () => player;
  const getSunk = () => sunk;
  const getDirection = () => direction;
  const getSections = () => shipSections;

  const isSunkCheck = () => {
    if (health <= 0) {
      sunk = true;
    }
  };
  const hit = (section) => {
    shipSections[section] = 0;
    health -= 1;
    isSunkCheck();
  };

  const switchDirection = () => {
    if (direction === 'xAxis') {
      direction = 'yAxis';
    } else {
      direction = 'xAxis';
    }
  };

  return {
    getName,
    getLength,
    getPlayer,
    getSunk,
    getSections,
    getDirection,
    switchDirection,
    hit,
  };
};

export default Ship;
