const DROP_DETAIL = 50; // vertices of the ink drop
const MAX_DROPS = 60; // maximum drops on screen at at time
const MAX_DROP_RADIUS = 40;
const MIN_DROP_RADIUS = 110;
			

let drops = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	palette = [
		color(199, 87, 105),
    color(135, 87, 105),
    color(209, 131, 97),
    color(233, 204, 155),
    color(163, 195, 218),
    color(46, 36, 44),
		color(91, 62, 74),
  ];
	background(220);
}

function draw() {
	let x = random(width);
	let y = random(height);
	let r = random(MIN_DROP_RADIUS, MAX_DROP_RADIUS);
	
	for (let drop of drops) {
		drop.show()
	}
	addInk(x, y, r);
}

function addInk(x, y, r) {
	let drop = new Drop(x, y, r);

	// other drops get marbled from new drop
	for (let other of drops) {
		other.marble(drop);
	}
		
	drops.push(drop);
	
	// remove first drop if MAX_DROPS is exceeded
	if (drops.length > MAX_DROPS) {
		drops.shift();
	}
}

class Drop {
	constructor (x, y, r) {
		this.center = createVector(x,y)
		this.r = r;
		this.vertices = [];
		this.color = random(palette);
		
		for (let i = 0; i < DROP_DETAIL; i++) {
			let angle = map(i, 0, DROP_DETAIL, 0, TWO_PI);
			let vector = createVector(cos(angle), sin(angle));
			vector.mult(this.r);
			vector.add(this.center);
			this.vertices[i] = vector;
		}
	}
	
	show() {
		fill(this.color);
		noStroke();
		beginShape();
		for (let v of this.vertices) {
			vertex(v.x, v.y);
		}
		endShape(CLOSE);
	}
	
	marble(other) {
		for (let v of this.vertices) {
			let c = other.center;
			let p = v.copy();
			let r = other.r;
			p.sub(c);
			let mag = p.mag();
			let root = sqrt(1 + (r * r)/(mag * mag));
			
			p.mult(root).add(c);
			v.set(p)
		}
	}
}