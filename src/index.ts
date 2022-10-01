import p5 from "p5";

const sketch = function (p: p5) {
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handleMousePressed);
        // console.log("Setup ran.");
        // p.noLoop();
    }

    function draw() {
        drawARandomCircle();
    }

    function drawARandomCircle() {
        const colour = getRandomColour();
        p.fill(colour);
        p.noStroke();
        const diameter = p.random(30, 500);
        p.circle(p.random(p.width), p.random(p.height), diameter);
    }

    function getRandomColour() {
        const palette = ["#556270", "#4ecdc4", "#c7f464", "#ff6b6b", "#c44d58"];
        return p.random(palette);
    }

    function handleMousePressed() {
        p.background("white");
    }

    //Crucially, assign the setup and draw functions for the p5 sketch.
    p.setup = setup;
    p.draw = draw;

    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};
const myP5 = new p5(sketch);
