


//----------------------------
//-menus and overlays. possibly as html
//

//---------------------------
//i fixed a bug that was showing rects as being all the same color rather than coloring vertices individually
//

//---------------------------
//flight is 'working': you can push space to rise and v to fall
//and looking up lets you travel up; looking down lets you travel down
//...improved flight/jumping?

//---------------------------
//-selecting objects in space

let FAR = 3; // works well?

//flipy inverts the eye vector of the camera
let flipy = true;
//flipx inverts the turning of the camera
let flipx = false;
let SANDCOLOR;
let SKYCOLOR;
let METER = 100;
let OUTMOUSE = 100; //size of mouse margin
let player;
let w; let h;
let canvas;

function resize() {
  // assigns new values for width and height variables
  let w = window.innerWidth;
  let h = window.innerHeight;  
  canvas.size(w,h);
}

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas = createCanvas(w, h, WEBGL);
  //SANDCOLOR =color(255);
  SANDCOLOR = color(30, 5, 15);
  SKYCOLOR = color(255, 86, 16);
  player = new CMan(0, 0, 0); //camera/fpshooter type guy

}

function keyPressed() {
  player.in.keyPressed();
}

function keyReleased() {
  player.in.keyReleased();
}

function mousePressed() {
  player.in.mousePressed();
}

function mouseReleased() {
  player.in.mouseReleased();
}

function draw() {
  resize();
  //print(frameRate());
  background(SKYCOLOR);
  player.update(); //process
  player.cam3d();  //output
  player.inp();    //input
  drawland();
}