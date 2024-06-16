let customFont;
let er;
let er2;

let eggW = 300;
let eggH = 400;

let eggX = 300;
let eggY = 400;

let ellipseW = 20;

let eggs = [];

let sketch = function (p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textFont(customFont);

        for (let i = 0; i < 60; i++) {
            eggs[i] = new Egg(p.random(p.width), p.random(p.height));
        }
        er = new EggRing(p.width * 0.15, p.height * 0.1, 0.1, 60);
        er2 = new EggRing(p.width * 0.15, p.height * 0.1, 0.1, 70);
    };

    p.preload = function () {
        customFont = p.loadFont("Napolitana.otf");
    };

    p.draw = function () {
        p.background("#49B1F2");

        // Drop eggs
        for (let i = 0; i < eggs.length; i++) {
            eggs[i].update();
            eggs[i].display();
            eggs[i].intersects();
        }

        bottomegg();
        topegg();

        if (p.mouseIsPressed) {
            p.stroke(0);
            p.strokeWeight(2);
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(30);
            p.text("Every autumn", p.width / 2, 280);
            p.text("the toys are", p.width / 2, 300);
            p.text("changed, and over", p.width / 2, 320);
            p.text("150 new toys are", p.width / 2, 340);
            p.text("released, including", p.width / 2, 360);
            p.text("character sets", p.width / 2, 380);
            p.textSize(40);
            p.stroke(255);
            p.strokeWeight(2);
            p.fill(0);
            p.text("Did you know?", p.width / 2, 520);
        }

        if (!p.mouseIsPressed) {
            p.fill(0);
            p.textAlign(p.CENTER);
            p.fill(0, 255, p.mouseX, p.mouseY);
            p.stroke(255, p.mouseX, p.mouseY);
            p.strokeWeight(10);
            p.textSize(50);
            p.text("CLICK ME", p.width / 2, 340);
            p.textSize(50);
            p.fill(0, 255, p.mouseX, p.mouseY);
            p.stroke(255, p.mouseX, p.mouseY);
            p.strokeWeight(10);
            p.text("SURPRISE", p.width / 2, 520);
        }
        er.transmit();
    };

    function topegg() {
        if (p.mouseIsPressed) {
            p.stroke(0);
            p.text("CLICK ME", p.width / 2, 400);
            p.textSize(20);
            p.stroke(0);
            p.fill(139, 76, 57); // brown
            p.textSize(20);
        } else {
            p.fill(255);
        }

        p.strokeWeight(1);
        p.arc(eggX, eggY, eggW, eggH, 3.1, 6.3, p.CLOSE);
        p.line(eggX - eggW / 2, eggY, eggX - eggW / 5, eggY + eggH / 6);
        p.line(eggX - eggW / 5, eggY + eggH / 6, eggX, eggY);
        p.line(eggX, eggY, eggX + eggW / 5, eggY + eggH / 6);
        p.line(eggX + eggW / 5, eggY + eggH / 6, eggX + eggW / 2 - 1, eggY);
        p.noStroke();
        p.triangle(eggX - eggW / 2, eggY, eggX - eggW / 5, eggY + eggH / 6, eggX, eggY);
        p.triangle(eggX, eggY, eggX + eggW / 5, eggY + eggH / 6, eggX + eggW / 2, eggY);
        p.textAlign(p.CENTER);
    }

    function bottomegg() {
        if (p.mouseIsPressed) {
            p.fill(255, 215, 0); // White
        } else {
            p.fill("red"); // Black
        }
        p.arc(eggX, eggY, eggW, eggH, 6.3, 3.1, p.CLOSE);
        p.line(eggX - eggW / 2, eggY, eggX - eggW / 5, eggY + eggH / 6);
        p.line(eggX - eggW / 5, eggY + eggH / 6, eggX, eggY);
        p.line(eggX, eggY, eggX + eggW / 5, eggY + eggH / 6);
        p.line(eggX + eggW / 5, eggY + eggH / 6, eggX + eggW / 2 - 1, eggY);
        p.noStroke();
        p.noFill();
    }

    function Egg(x, y) {
        this.x = x;
        this.y = y;
        this.r1 = 35;
        this.r2 = 50;
        this.col = p.color(246, 206, 137);

        this.display = function () {
            p.noStroke();
            p.fill(this.col);
            p.ellipse(this.x, this.y, this.r1, this.r2);
        };

        this.update = function () {
            this.y = this.y + p.random(0.8);
        };

        this.intersects = function () {
            let d = p.dist(this.x, this.y, p.mouseX, 300);
            for (let i = 0; i < eggs.length; i++) {
                if (d < 100) {
                    this.x = p.mouseX;
                    this.y = 280;
                    this.col = p.color(246, 206, 137, 100);
                }
            }
            if (this.y > p.height) {
                this.y = p.random(0, -p.height);
            }
        };
    }

    class EggTilt {
        constructor(xpos, ypos, t, s) {
            this.x = 50;
            this.y = 100;
            this.tilt = t;
            this.scalar = s / 100.0;
            this.angle = 0.0;
        }

        wobble() {
            this.tilt = p.cos(this.angle) / 8;
            this.angle += 0.1;
        }

        display() {
            p.noStroke();
            p.fill(255, p.mouseX, p.mouseY);
            p.push();
            p.translate(this.x, this.y);
            p.rotate(this.tilt);
            p.scale(this.scalar);
            p.beginShape();
            p.vertex(0, -100);
            p.bezierVertex(25, -100, 40, -65, 40, -40);
            p.bezierVertex(40, -15, 25, 0, 0, 0);
            p.bezierVertex(-25, 0, -40, -15, -40, -40);
            p.bezierVertex(-40, -65, -25, -100, 0, -100);
            p.endShape();
            p.pop();
        }
    }

    class EggRing {
        constructor(x, y, t, sp) {
            this.x = x;
            this.y = y;
            this.t = t;
            this.sp = sp;
            this.ovoid = new EggTilt(this.x, this.y, this.t, this.sp);
        }

        transmit() {
            this.ovoid.wobble();
            this.ovoid.display();
        }
    }
};

let myp5 = new p5(sketch);
