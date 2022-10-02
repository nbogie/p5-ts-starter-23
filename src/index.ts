import p5 from "p5";
import "p5/lib/addons/p5.sound";
// /* @ts-ignore */
// window.p5 = p5;

let fft: p5.FFT;

const sketch = function (p: p5) {
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handleMousePressed);
        console.log(p5);
        let mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT();
        fft.setInput(mic);
    }

    function draw() {
        fft.analyze(); // Compute the energy levels for each frequency band.

        const maxFreq = 2000; //Hz
        const numStepsOnXAxis = 100;
        const freqStep = maxFreq / numStepsOnXAxis;
        for (let freq = 40; freq < maxFreq; freq += freqStep) {
            const energyLevel = fft.getEnergy(freq);
            const y = p.map(energyLevel, 0, 255, 1000, 0); //convert energy from 0<->255 to 1000<->0
            const x = p.map(freq, 0, maxFreq, 0, p.width); //convert freq from 0<->maxFreq to 0<->width

            p.circle(x, y, 16);
        }
        drawARandomCircle();
    }

    function drawARandomCircle() {
        const colour = getRandomColour();
        p.fill(colour);
        p.noStroke();
        const diameter = p.random(20, 100);
        p.circle(p.mouseX, p.mouseY, diameter);
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
