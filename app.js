let cv, ctx;
let grid = [];
const w = 20;
let mouseX = mouseY = 0;
let playValue = false;

window.onload = function() {
  setup();
  setInterval(draw, 100);
}

const setup = function() {
  let url = window.location.search;
  console.log(url);
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  cv.addEventListener('click', function(event) {
    mouseX = event.clientX - cv.offsetLeft;
    mouseY = event.clientY - cv.offsetTop;
    let index = grid.detect(mouseX, mouseY);
    grid.grid[index] = grid.grid[index] ? 0 : 1;
  });
  let cols = cv.width / w;
  let rows = cv.height / w;
  grid = new Grid(rows, cols);
  let play = document.createElement('button');
  play.innerHTML = "Play";
  document.body.appendChild(play);
  play.addEventListener('click', pause);
  let clear = document.createElement('button');
  clear.innerHTML = "Clear Screen";
  clear.addEventListener('click', function() {
    if (playValue) pause();
    for (let i = 0; i < grid.grid.length; i++) grid.grid[i] = 0;
  })

  function pause() {
    playValue = !playValue;
    play.innerHTML = playValue ? "Pause" : "Play";
  }
  document.body.appendChild(clear);
}

const draw = function() {
  background(cv, 'black');
  grid.show();
  if (playValue) grid.interact();
}