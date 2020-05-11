const Ship = (name, length, player) => {
  let health = length * 1;
  let sunk = false;
  const shipSections = Array(length).fill(1);

  const getName = () => name;
  const getPlayer = () => player;
  const getSunk = () => sunk;
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

  return {
    getName,
    getPlayer,
    getSunk,
    getSections,
    hit,
  };
};

export default Ship;
