//CMan is the player-camera object
class CMan {
  constructor(x, y, z) {
    this.CAMHEIGHT = 1 * METER;
    this.RUNINC = .03 * METER;
    this.FLYINC = .1 * METER;
    this.TURNINTERVAL = HALF_PI / 25 * (flipx?-1:1);
    this.cursor = new p5.Vector();
    this.VUP = new p5.Vector(0, 0, 1);
    this.VDOWN = new p5.Vector(0, 0, -1);
    this.pos = new p5.Vector(x, y, z);
    this.face = new p5.Vector(1, 1);
    this.vel = new p5.Vector();
    this.accel = new p5.Vector();
    this.cursor = new p5.Vector();
    this.in = new CIn();
  }

  update() {
    this.vel.add(this.accel);
    //if (focused && this.in.BY) 
    this.mouselook();
    this.pos.add(this.vel);
    this.accel.mult(.6);
    this.vel.mult(.6);
    this.landheight = land(this.pos.x, this.pos.y);
    if (this.pos.z < this.landheight + this.CAMHEIGHT)
      this.pos.z = this.landheight + this.CAMHEIGHT; //println("landheight " + landheight + " & cam " +pos.z);
    //this.drawcursor();
  }
  
  mouselook() {
    let ztarget; let xytarget;
    if (mouseY < OUTMOUSE)
       ztarget= map(mouseY,0,OUTMOUSE,1.5,0);  
    else if (mouseY > height-OUTMOUSE)
       ztarget= map(mouseY,height-OUTMOUSE,height,0,-1.5); 
    else ztarget = 0; 
    this.face.z = (this.face.z*5 + ztarget)/6; //weighted average of two samples, bias towards previous

    if (mouseX < OUTMOUSE)
       xytarget= map(this.in.MARGIN.x,0,OUTMOUSE,1,0);  
    else if (mouseX > width-OUTMOUSE)
       xytarget= map(this.in.MARGIN.x,0,OUTMOUSE,-1,0); 
    else xytarget = 0;
    //println(xytarget);
    this.turn(this.TURNINTERVAL*xytarget);
  }
  
  inp() { 
    let inp = this.in; //make a alias
    
    // think 'in' is a reserve word so lets say 'inp'
    inp.mousestate();
    
    if (inp.keys[inp.FWD])   this.move( this.face, this.RUNINC );
    if (inp.keys[inp.BACK])  this.move( tovector(toradians(this.face)+PI), this.RUNINC );
    if (inp.keys[inp.UP])    this.move( this.VUP, this.FLYINC );
    if (inp.keys[inp.DOWN])  this.move( this.VDOWN, this.FLYINC );
    if (inp.keys[inp.RIGHT]) this.turn(-this.TURNINTERVAL);
    if (inp.keys[inp.LEFT])  this.turn(this.TURNINTERVAL);
    if (inp.mouseIsPressed) {
      this.move(this.face, this.RUNINC);
    }
  }
  
  move(dir, vel) {
    let f = new p5.Vector(dir.x,dir.y,dir.z);
    f.normalize();
    f.mult(vel);     
    this.accel.add(f);
  }
  
  turn(addx) {
    let faceradians = toradians(this.face) -addx;
    let z = this.face.z;
    this.face = tovector(faceradians,z);
  }
  
  cam3d() {
    //hint(ENABLE_DEPTH_TEST);
    camera(this.pos.x,this.pos.y,this.pos.z, this.pos.x+this.face.x, this.pos.y+this.face.y, this.pos.z+this.face.z, 0,0,flipy?-1:1);
  }
   
  drawcursor() {
    noStroke();
     cursor.x = this.pos.x+this.face.x*1*METER;
     cursor.y = this.pos.y+this.face.y*1*METER;
     cursor.z = this.pos.z+this.face.z*1*METER;
    push();
    fill(255);
      translate(cursor.x,cursor.y,cursor.z);
      box(2,2,2);
    pop();
    //rect(mouseX,mouseY,mouseX+10,mouseY+10);
  } 
  

}