const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue= 0;
let frame = 0;
let score = 0;
let gameSpeed = 2.5;

const gradient = ctx.createLinearGradient(0 ,0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');




function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //ctx.fillRect( 10, canvas.height-temp , 50, 50);
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
      ctx.fillStyle = 'black';
      ctx.fillText('Game Over, your score is '+ score, 160, canvas.height/2 -10);

      return true;
    }
  }
}
