const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue= 0;
let frame = 0;
let score = 0;
let gameSpeed = 1.5;

const gradient = ctx.createLinearGradient(0 ,0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'BG.png';
const BG = { //properties
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
}
handleBackground= () =>{
  if(BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width; //adding gameSpeed to avoid separation gap between consec. images
  else BG.x1 -= gameSpeed;
  if(BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
  else BG.x2 -= gameSpeed;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);//back to back images
}


function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //ctx.fillRect( 10, canvas.height-temp , 50, 50);
  handleBackground();
  handleObsatcles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = '90px Georgia';
  ctx.strokeText( score, 450, 70);
  ctx.fillText( score, 450, 70);
  handleParticles();
  if (handlecollision()) return;
  requestAnimationFrame(animate);
  hue++;
  frame ++;

  angle += 0.12; // to oscillate the bird when idle at bottom instead of staying stuck flat down
}
animate();


window.addEventListener('keydown', e => {
  if (e.code == 'Space') spacePressed = true;
});
window.addEventListener('keyup',  e => {
  if (e.code == 'Space') spacePressed = false;
  bird.frameX=0;
});

const bang = new Image();
bang.src = 'bang.png';
function handlecollision(){
  for( let i=0; i< obstacleArray.length; i++){
    if (bird.x < obstacleArray[i].x + obstacleArray[i].width &&
    bird.x + bird.width > obstacleArray[i].x &&
    ((bird.y <  obstacleArray[i].top && bird.y + bird.height > 0) ||
    (bird.y > canvas.height - obstacleArray[i].bottom &&
    bird.y + bird.height < canvas.height))){
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = '25px Georgia';
      ctx.fillStyle = 'white';
      ctx.fillText('Game Over, your score is '+ score, 160, canvas.height/2 -10);

      return true;
    }
  }
}
