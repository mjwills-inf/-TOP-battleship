#### Test Driven Development Battleship Project from The Odin Project's curriculum (https://www.theodinproject.com/lessons/battleship)

Repo Live in student submissions (https://mjwills-inf.github.io/-TOP-battleship/)

###### Built with vanilla javascript
- Wepback
- Babel / ESLint / Sass
- Jest testing for initial factory modules 

###### Outstanding errors/bugs:
- Occasionally computer doesnt take turn after having spammed click. No error in console. Cannot get behaviour to happen intentionally.
- Drag and Drop API seems to allow you to start a drag when spamming click, even though the element is set as draggable="false", and has no event listener on it. Console shows associated errors with applying functions from dragstart to it.

###### For future reference:
- Webpack /dist index.html linked main.js through `dist/main.js`
- Manually changed after build to `main.js` (in same folder)
