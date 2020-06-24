const obstacleArray = [];

class Obstacle {
  constructor(){
    this.top = Math.random()*canvas.height/3 + 20;
    this.bottom = Math.random()*canvas.height/3 + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = 'hsla(' + hue + ',100%, 50%, 0.8)';
    this.counted = false; //to not count the same obstace again in case of wide obstacle
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update(){
    this.x -= gameSpeed;
    if(!this.counted && this.x < bird.x){
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObsatcles() {
  if (frame%150 === 0 ){
    obstacleArray.unshift(new Obstacle);
  }
  for(let i=0; i<obstacleArray.length; i++){
    obstacleArray[i].update();
  }
  if (obstacleArray.length > 20) { //to limit array; performance issue
    obstacleArray.pop(obstacleArray[0]);
  }
}
