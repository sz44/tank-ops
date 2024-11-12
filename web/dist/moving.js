import { Vector } from "./vector.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const rect = canvas.parentElement.getBoundingClientRect();

canvas.width = rect.width;
canvas.height = rect.height;

canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

class Hex {
  constructor(x,y,r=80,c='rgb(23,54,108)') {
    this.center = new Vector(x,y);
    this.r = r;
    this.c = c;
  }
  draw() {
    ctx.beginPath()
    for (let a=Math.PI/6; a<Math.PI*2; a+=Math.PI/3) {
      let x = this.center.x + Math.cos(a) * this.r;
      let y = this.center.y + Math.sin(a) * this.r;

      if (a == 0) {
        ctx.moveTo(x,y);
      } else {
        ctx.lineTo(x,y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = this.c;
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

let h1 = new Hex(550,400);
// h1.draw();
let w = getHexWidth(h1.r);
let h = getHexHeight(h1.r);

const ROWS = 3;
const COLS = 4
let hexes = [];
let startVec = new Vector(300, 300);
for (let r = 0; r < ROWS; r++) {
  for (let q = 0; q < COLS; q++) {
    let offset = r%2 ? 0.5*w : 0;
    let v = startVec.add(new Vector(offset+w*q, 1.5*h*r));
    hexes.push(new Hex(v.x,v.y));
  }
}

hexes.forEach( h => {
  h.draw();
});

let path = [
  getHexAt(0, 0).center,
  getHexAt(0, 1).center,
  getHexAt(1, 0).center,
  getHexAt(2, 0).center,
  getHexAt(3, 2).center,
  getHexAt(2, 2).center,
];

ctx.strokeStyle = 'rgb(10,100,100)';
ctx.lineWidth = 5;
ctx.beginPath();
for (let i=0; i<path.length; i++) {
  let v = path[i];
  if (i == 0) {
    ctx.moveTo(v.x,v.y);
  } else {
    ctx.lineTo(v.x,v.y);
  }
}
ctx.stroke();

let startPos = new Vector(200,100);
let endPos = new Vector(800, 100);
let tankPos = new Vector(200,100);
drawPointVec(startPos);
drawPointVec(endPos);

const MAX_SPEED = 300;
const dist = endPos.sub(startPos);
const duration = (dist.x / MAX_SPEED) * 1000;
console.log(duration);


let startTime = 0;

function animate(t) {
  ctx.clearRect(0,0,canvas.width,200);
  drawPointVec(startPos);
  drawPointVec(endPos);
  if (tankPos.x >= endPos.x) {
    tankPos.x = endPos.x;
    console.log("end");
    return;
  }
  if (startTime === 0) {
    startTime = t;
  }
  let elapsed = t - startTime;
  let rawProgress = elapsed / duration;
  let smoothProgress = getSmoothProgress(rawProgress);
  tankPos.x = lerp(startPos.x, endPos.x, smoothProgress)
  drawPointVec(tankPos)
  requestAnimationFrame(animate);
} 
requestAnimationFrame(animate);

function getSmoothProgress(x) {
  // Clamp between 0 and 1
  x = Math.max(0, Math.min(1, x));
  // ease in out cubic
  // return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  // ease in out quad
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function getHexAt(q,r) {
  return hexes[q + r * COLS];
}

function getHexHeight(r) {
  return Math.round(2 * r * Math.sin(Math.PI/6));
}

function getHexWidth(r) {
  return Math.round(2 * r * Math.cos(Math.PI/6));
}

function drawLine(a,b) {
  for (let i = 0; i < 1; i += 0.001) {
    let {x,y} = lerp2(a,b,i);
    drawPoint(x,y,2,'black')
  }
}

function drawPointVec(v,r=5,c='red') {
  drawPoint(v.x,v.y,r,c);
}

function drawPoint(x,y,r,c) {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2); 
  ctx.fill();
}

function lerp2(a,b,t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  }
}

function lerp(a,b,t) {
  return a + (b-a) * t;
}