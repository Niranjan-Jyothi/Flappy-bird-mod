const dragonSprite = new Image();
dragonSprite.src = 'dragon.png';

class Bird {
  constructor(){
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.originalWidth = 941; //3764(totalWIdth of spriteSheet)/4
    this.originalHeight = 680;//sprite sheet height
    this.width = this.originalWidth/20;
    this.height = this.originalHeight/20;
    this.weight = 0.5;
    this.frameX= 0;
  }

  update(){
    let curve = Math.sin(angle) * 20; //for oscillation

    if (this.y > canvas.height - (this.height * 3) + curve){
      this.y = canvas.height - (this.height * 3) + curve;
      this.vy = 0; //or else it has very high velocity accumlated at bottom
    } else{
      this.vy += this.weight; //falling down aka-gravity
      this.vy *= 0.9; //smooth
      this.y += this.vy;
    }

    if (this.y < 0 + this.height){
      this.y = 0 + this.height;
      this.vy = 0;
    }

    if (spacePressed && this.y > this.height*3) this.flap();
  }                    //to give wobble at top

  draw(){
    ctx.fillStyle = 'red';
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dragonSprite, this.frameX*this.originalWidth, 0, this.originalWidth,
    this.originalHeight, this.x-20, this.y-12, this.width*1.7, this.height*1.7);
  }

  flap(){
    this.vy -= 1.5;
    if (this.frameX >= 3) this.frameX = 0;
    else if (frame%2 === 0) this.frameX++;
  }

} //end of bird class

const bird = new Bird();
