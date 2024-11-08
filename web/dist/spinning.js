let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d")

let rect = canvas.parentElement.getBoundingClientRect();

canvas.width = rect.width * window.devicePixelRatio;
canvas.height = rect.height * window.devicePixelRatio;
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

ctx.imageSmoothingEnabled = false;

// preload sprites
let img = new Image();
img.src="./assets/sprites.png";

import { Vector } from "./vector.js";
import { SPRITES_96 } from "./sprites.js";

// let start = new Vector(833,430);
// let size0 = new Vector(29,15);
// let offset0 = new Vector(-15,-10);

// let offset = new Vector(0,0);
// let size = new Vector(40,40);

// let select = offset.add(size);

console.log(SPRITES_96.tanksBodies[0])
// let big = SPRITES_96.tanksBodies.filter((i) => i.size.x > 30 || i.size.y > 30);

let maxX = Math.max(...SPRITES_96.tanksBodies.map(o => o.size.x))
let maxY = Math.max(...SPRITES_96.tanksBodies.map(o => o.size.y))
console.log(maxX);
console.log(maxY);

let totalX = SPRITES_96.tanksBodies.reduce((acc, curr, ind) => acc + curr.size.x, 0)
let totalY = SPRITES_96.tanksBodies.reduce((acc, curr, ind) => acc + curr.size.y, 0)
console.log(totalX)
console.log(totalY)

img.addEventListener("load", () => {
  let len = 0;
  let row = 0;
  SPRITES_96.tanksBodies.forEach( t => {
    ctx.drawImage(img, t.start.x, t.start.y, t.size.x, t.size.y, len, row, t.size.x, t.size.y);
    len += t.size.x;
    if (len > 800) {
      row += 31;
      len = 0;
    }
    
  })
  spin();
  // ctx.drawImage(img, start.x, start.y, size0.x, size0.y, 300, 300, size0.x*2, size0.y*2);
  // ctx.drawImage(img, start.x, start.y, size0.x, size0.y, 300, 300, size0.x*2, size0.y*2);
})

let tankInd = 6 
let tanks = SPRITES_96.tanksBodies;

let prevTime = Date.now();

function spin() {
  requestAnimationFrame(spin);
  let currTime = Date.now();
  if (currTime - prevTime < 80) {
    return;
  } else {
    prevTime = currTime;
  }
  ctx.clearRect(200,200, 2000,2000);
  let t = tanks[tankInd];
  let scale = 8;
  let sizeX = t.size.x * scale;
  let sizeY = t.size.y * scale;
  ctx.drawImage(img, t.start.x+0.5, t.start.y+0.5, t.size.x-1, t.size.y-1, 400 + Math.floor(t.offset.x * scale), 400 + Math.floor(t.offset.y * scale), sizeX, sizeY);
  tankInd = ++tankInd % 48;
}