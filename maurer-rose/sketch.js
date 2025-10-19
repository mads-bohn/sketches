let n = 6;
let d = 71;
let scale = 250
let dSlider;
let nSlider;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  dSlider = createSlider(1, 179, 1);
  nSlider = createSlider(2, 20, 2);
}

function draw() {
  background(255);
  translate(width/2,height/2);
  //stroke(255, 0, 111);
  d = dSlider.value();
  n = nSlider.value();

  //noFill();
  beginShape();
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = sin(n*k) * scale;
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x,y);
    let hue = map(i, 0, 361, 0, 360);
    stroke(hue, 100, 100);
  }
  endShape();
  
}