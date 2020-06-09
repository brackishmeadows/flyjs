function toradians(v) {
  return atan2(v.y, v.x);
}
function tovector(radians) {
  return new p5.Vector (cos(radians), sin(radians));
}
function tovector(radians, z) {
  return new p5.Vector (cos(radians), sin(radians), z);
}

function inradius (x,y,r) {
  return abs(x*x + y*y) < r*r;
}

let NOISE = 0.5;
let SINX = 0.04;
let SINXM = 3.0;
let SINY = 0.05;
let SINYM = 2.0;
let WM = 4.0;
let ZMULT = 1.0;

function land(x, y) {
  //gets the height at a given point
  //by adding some noise and sine waves together
  let noiseland = noise(x/METER*NOISE,  y/METER*NOISE);
  let sinland = (sin(int(x/METER)*SINX)*SINXM + sin(int(y/METER)*SINY)*SINYM)/2;
  return (noiseland+(sinland)) * (METER*ZMULT);
}

function landm(x, y) { //land height at nearest meter
  let noiseland = noise(x * NOISE, y * NOISE);
  let sinland = (sin(x * SINX) * SINXM + sin(y * SINY) * SINYM) / 2;
  return (noiseland + (sinland)) * (ZMULT);
}
function farness(x,y){
  x = floor(x);
  y = floor(y);
return map(abs(x * x + y * y), 0, FAR * FAR, 0, 1);
}

function drawland() {
  randomSeed(332);
  for (let x = -FAR; x <= FAR; x++) {
    for (let y = -FAR; y <= FAR; y++) {
      if (!inradius(x, y, FAR*1.3)) continue;

      let px = floor((player.pos.x/METER)) + x;
      let py = floor((player.pos.y/METER)) + y;
      
      let f = farness(x,y);
      let color00 = lerpColor(SANDCOLOR, SKYCOLOR, f);
      f = farness(x+1,y);
      let color10 = lerpColor(SANDCOLOR, SKYCOLOR, f);
      f = farness(x+1,y+1);
      let color11 = lerpColor(SANDCOLOR, SKYCOLOR, f);
      f = farness(x,y+1);
      let color01 = lerpColor(SANDCOLOR, SKYCOLOR, f);

      push();
      scale(METER);
      noStroke();
      //stroke(200, 100, 0);
      //strokeWeight(2);
      translate(px, py);
      beginShape(TRIANGLES);
      fill(color00);
      vertex(0, 0, landm(px, py));
      fill(color10);
      vertex(1, 0, landm(px + 1, py));
      fill(color11);
      vertex(1, 1, landm(px + 1, py + 1));
      fill(color00);
      vertex(0, 0, landm(px, py));
      fill(color01);
      vertex(0, 1, landm(px, py + 1));
      fill(color11);
      vertex(1, 1, landm(px + 1, py + 1));
      endShape();
      pop();
    }
  }
}

function persp() {
  //this replicates the default perspective, but with broader near/far clipping planes
  let fov = PI/3.0;
  let cameraZ = (height/2.0) / tan(fov/2.0);
  let nearclip = cameraZ/100.0;
  let farclip = cameraZ*100.0;
  perspective(fov, float(width)/float(height), nearclip, farclip);
}