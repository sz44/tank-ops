import { Vector } from "./vector.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const rect = canvas.parentElement.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

canvas.style.width = rect.width;
canvas.style.height = rect.height;

class Square {
  constructor(x,y,size, color) {
    this.position = new Vector(x,y);
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.position.x, this.position.y, this.size, this.size);
    ctx.fill();
    ctx.closePath();
  }
}

let redSquare = new Square(300, 400, 50, `rgb(255,0,0)`);
let greenSquare = new Square(400, 400, 50, `rgb(0,255,0)`);
let blueSquare = new Square(500, 400, 50, `rgb(0,0,255)`);

let squares = [redSquare, greenSquare, blueSquare];

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  squares.forEach( sq => {
    sq.draw();
  });
}

animate();

let clickVec = null;
let diffVec = null
let selected = null;

canvas.addEventListener("pointerdown", (e) => {
  let [mx, my] = [e.offsetX, e.offsetY];
  clickVec = new Vector(mx, my);
  squares.forEach( sq => {
    if (mx >= sq.position.x && mx <= sq.position.x + sq.size && my >= sq.position.y && my <= sq.position.y + sq.size) {
      console.log(`selected: ${sq.color} x: ${sq.position.x} y: ${sq.position.y} size: ${sq.size}`);
      selected = sq;
      diffVec = clickVec.sub(selected.position);
    }
  });
});

canvas.addEventListener("pointerup", (e) => {
  clickVec = null;
  selected = null;
});

canvas.addEventListener("pointermove", (e) => {
  let [mx, my] = [e.offsetX, e.offsetY];
  // console.log(`mx ${mx} my ${my}`);
  if (selected) {
    let mouseVec = new Vector(mx, my);
    selected.position = mouseVec.sub(diffVec);
  }
});