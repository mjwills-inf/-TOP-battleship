const Ship = (name, length, player) => {
  
  let health = length;
  let destroyed = false;

  let sections = Array(length).fill(0);

  const getName = name;  
  const getPlayer = player;  
  
  const getDestroyed = destroyed;
  const getSections = sections;
  
  const hit = (section) => {
    sections[section] = 1;
    health -= 1;
    isSunkCheck();
  };

  const isSunkCheck = () => {
    if (health == 0) {
      destroyed = true;
    }
  };

  return {
    getName,    
    getPlayer,
    getDestroyed,
    getSections,
    hit
  };
};

export default Ship;