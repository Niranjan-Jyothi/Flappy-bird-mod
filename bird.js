class Bird {

  constructor(){
    this.x = 150;  this.y = 200;
    this.vy = 0;
    this.width = 20; this.height = 20;
    this.weight = 0.7;
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
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flap(){
    this.vy -= 1.5;
  }

} //end of bird class

const bird = new Bird();
