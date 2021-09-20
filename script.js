const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//Pointer class
class Pointer {
  constructor(height) {
    this.height = height;
  }
  draw() {
    ctx.strokeStyle = 'white';
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.height);
    ctx.stroke();
  }
}

//Implemetation

const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
bgGradient.addColorStop(0, '#171E26');
bgGradient.addColorStop(1, '#3F586B');

const secondsPointer = new Pointer(180);
const minutesPointer = new Pointer(140);
const hoursPointer = new Pointer(80);

const radian = (Math.PI / 180) * 6;

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = 10;

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 3, 0, Math.PI * 2, false);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
  drawTicks();
  drawPointers();
}

function drawTicks() {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  for (let degrees = 0; degrees <= 360; degrees += 6) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(-240, 0);
    if (degrees % 5 === 0) {
      ctx.lineTo(-225, 0);
    } else {
      ctx.lineTo(-235, 0);
    }
    ctx.stroke();
    ctx.rotate(radian);
  }
  ctx.restore();
}

function drawPointers() {
  const date = new Date();
  let hour = date.getHours();
  if (hour > 12) {
    hour -= 12;
  }
  const minute = date.getMinutes();
  const second = date.getSeconds();

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  //draw seconds pointer
  ctx.save();
  ctx.rotate(30 * radian + second * radian);
  ctx.lineWidth = 1;
  secondsPointer.draw();
  ctx.restore();

  //draw minutes pointer
  ctx.save();
  ctx.rotate(30 * radian + minute * radian);
  ctx.lineWidth = 2;
  minutesPointer.draw();
  ctx.restore();

  //draw hours pointer
  ctx.save();
  ctx.rotate(30 * radian + hour * radian);
  ctx.lineWidth = 3;
  hoursPointer.draw();
  ctx.restore();

  ctx.restore();
}

animate();
