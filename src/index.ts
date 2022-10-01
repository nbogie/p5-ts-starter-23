import p5 from "p5";
console.log("imported p5");
const sketch = function (p) {
    function setup() {
        console.log("setup called");
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    function draw() {
        p.fill(p.random(255));
        p.circle(p.random(p.width), p.random(p.height), p.random(10, 40));
    }
    p.setup = setup;
    p.draw = draw;
};
const myP5 = new p5(sketch);
