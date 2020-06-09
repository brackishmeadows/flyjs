//CIn is the input for the player-camera object CMan
//every CMan has a CIn

class CIn {
  constructor() {
    this.keys = [];
    this.keytoggle = [];
    this.keypushed = [];
    this.FWD = 87; //w
    this.BACK = 83; //s
    this.LEFT=65; 
    this.RIGHT=68; 
    this.UP=32;
    this.DOWN=86;
    this.MENU=27;
    let BY, IN, ON; //mouse states, where is the mouse in relation to the frame
    this.MARGIN = new p5.Vector();
  }

  keyPressed() {
    this.keys[keyCode] = true;
    print("keydown " + keyCode + " " + this.keypushed[keyCode]);
    this.keytoggle[keyCode] = !this.keytoggle[keyCode];
  }

  keyReleased() {
    this.keys[keyCode] = false;
    this.keypushed[keyCode]++;
  }
  mousePressed(){
    this.mouseIsPressed = true;
  }
  mouseReleased(){
    this.mouseIsPressed = false;
  }
  mousestate() {
    //this probably works?
    let margin = OUTMOUSE;
    let x = mouseX;
    let y = mouseY;
    this.BY = (x > -margin && x < width + margin) &&
      (y > -margin && y < height + margin); //in frame or near it
    this.IN = (x > 0 && x < width) &&
      (y > 0 && y < height); //in the frame but maybe out near the margin
    this.ON = (x > margin && x < width-margin) &&
      (y > margin && y < height-margin); //in the frame and on the frame proper,not in the margin
    if (x < width / 2)
      this.MARGIN.x = abs(x - 0);
    else this.MARGIN.x = abs(x - width);
    if (y < height / 2)
      this.MARGIN.y = abs(y - 0);
    else this.MARGIN.y = abs(y - height);
    //      if (!IN)
    //        MARGIN.mult(.2);
    //console.log("mousestate:"+(this.BY?"BY ":"")+(this.IN?"IN ":"") + (this.ON?"ON ":"") + "x "+mouseX );
  }
}