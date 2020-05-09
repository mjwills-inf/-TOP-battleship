const Ship = (name, length, player) => {
  
  const health = length
  const destroyed = false

  const sections = []

  const getName = name
  const getLength = length
  const getPlayer = player
  
  const getDestroyed = destroyed
  
  const hit = () => {
    health -= 1
    isSunkCheck()
  }

  const isSunkCheck = () => {
    if (health = 0) {
      destroyed = true;
    }
  }

  return {
    getName,
    getLength,
    getPlayer,
    getDestroyed
  }
}