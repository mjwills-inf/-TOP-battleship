const timers = [];

const announce = (string) => {
  if (timers.length > 0) {
    timers.forEach((item) => {
      clearTimeout(item);
    });
  }
  const instructionText = document.querySelector('.instrution-h2');
  instructionText.innerText = '';
  let counter = 0;

  const type = () => {
    if (counter < string.length) {
      instructionText.innerHTML += string.charAt(counter);
      counter += 1;
      const typeTimer = setTimeout(type, 40);
      timers.push(typeTimer);
    }
  };
  type();
};

export default announce;
