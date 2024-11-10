import { Vector } from "./vector.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const rect = canvas.parentElement.getBoundingClientRect();

canvas.width = rect.width;
canvas.height = rect.height;

canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

let points = [];

let p1 = new Vector(200, 200);
points.push(p1)
let p2 = new Vector(600, 600);
points.push(p2)
let p3 = new Vector(800, 200);
points.push(p3)

drawLine(p1,p2);
drawLine(p2,p3);

points.forEach( p => {
  drawPoint(p.x, p.y, 10, 'red');
});

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

let h1 = new Hex(550,300);
h1.draw();

let h = getHexHeight(h1.r);
for (let a = 0; a<Math.PI*2; a+=Math.PI/3) {
  let hx = new Hex(h1.center.x + h*Math.cos(a),h1.center.y + h*Math.sin(a));
  hx.draw();
}

let topHex = h1.center.sub(new Vector(0, getHexHeight(h1.r)));
let h2 = new Hex(topHex.x, topHex.y);
// h2.draw();

let botHex = h1.center.add(new Vector(0, getHexHeight(h1.r)));
let h3 = new Hex(botHex.x, botHex.y);
// h3.draw();

let topLeftHex = h1.center.sub(new Vector(h1.r + getHexWidth(h1.r) * 0.5, getHexHeight(h1.r) * 0.5));
let h4 = new Hex(topLeftHex.x, topLeftHex.y)
// h4.draw();

function getHexHeight(r) {
  return Math.round(2 * r * Math.cos(Math.PI/6));
}

function getHexWidth(r) {
  return Math.round(2 * r * Math.sin(Math.PI/6));
}

function drawLine(a,b) {
  for (let i = 0; i < 1; i += 0.001) {
    let {x,y} = lerp2(a,b,i);
    drawPoint(x,y,2,'black')
  }
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