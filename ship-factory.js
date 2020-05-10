const Ship = (name, length, player) => {
  
  const health = length
  const destroyed = false

  const sections = Array(length).fill(0)

  const getName = name  
  const getPlayer = player  
  
  const getDestroyed = destroyed
  const getSections = sections
  
  const hit = (section) => {
    sections[section] = 1
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
    getPlayer,
    getDestroyed,
    getSections,
    hit
  }
}