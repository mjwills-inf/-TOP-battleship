const Ship = (name, length) => {
  let health = length * 1;
  let sunk = false;
  const placed = false;
  let direction = 'x';
  const shipSections = Array(length).fill(1);

  const getName = () => name;
  const getLength = () => length;
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
    if (direction === 'x') {
      direction = 'y';
    } else {
      direction = 'x';
    }
  };

  return {
    getName,
    getLength,
    getSunk,
    getSections,
    getDirection,
    switchDirection,
    hit,
    placed,
  };
};

export default Ship;
