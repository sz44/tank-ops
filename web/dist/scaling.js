const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

let scale = 5;

const scaleUI = document.querySelector("#scale");
scaleUI.style.fontSize = `40px`;
scaleUI.style.width = `100px`;
scaleUI.parentElement.style.marginLeft = `300px`;
// scaleUI.style.marginLeft = `300px`;
scaleUI.value = scale;

scaleUI.addEventListener("change", (e) => {
  scale = e.currentTarget.value;
  scale = Number(scale);

  resizeCanvas();
  show();
});

function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();

  const pixelRatio = window.devicePixelRatio;

  canvas.width = rect.width / scale;
  canvas.height = rect.height / scale;
  
  // account for pixle density
  // const adjustedWidth = rect.width * pixelRatio;
  // const adjustedHeight = rect.height * pixelRatio;
  // canvas.width = adjustedWidth / scale;
  // canvas.height = adjustedHeight / scale;

  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
}

resizeCanvas()
show()

function show() {
  let spritesURL = "./assets/sprites.png";
  let catURL = "./assets/cat.png";
  let img = new Image();
  img.src = catURL;
  
  img.onload = () => {
    // ctx.drawImage(img, 0, 0, 128, 128, 800, 400, 512, 512);
    ctx.drawImage(img, 0, 0);
  };
}

window.addEventListener("resize", () => {
  console.log("resised");
});