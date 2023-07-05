import p5 from 'p5';

new p5(createSketch);

function createSketch(p: p5) {
    //In instance mode your previously "global" variables can live here
    //(where they won't conflict with other loaded sketches)

    /** Called once, automatically, by p5.js */
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handleMousePressed);
        // p.noLoop();
    }

    /** Called every frame, automatically, by p5.js */
    function draw() {
        p.background("skyblue")
        const stepSize = 1;
        p.stroke(30)
        p.strokeWeight(2)
        p.beginShape()
        p.vertex(-50, p.height)

        for (let x = 0; x < p.width + stepSize; x += stepSize) {
            const y = calcSummedNoiseYAtXAndTime(x, p.frameCount * 6);
            p.vertex(x, y);
        }
        p.vertex(p.width + 50, p.height)
        p.endShape();
    }

    function calcSummedNoiseYAtXAndTime(x: number, t: number): number {
        const noiseScale = 0.001;
        let runningTotal = 0; //total amount of noise for this x
        let amp = 1; //will be reduced for each added octave
        let layerFreq = 1; //will be (probably) doubled for each octave

        const numOctaves = 6;


        let expectedTotalAvgAmp = 0;
        for (let layerIx = 0; layerIx < numOctaves; layerIx++) {
            const n = amp * p.noise((x + t) * noiseScale * layerFreq);
            runningTotal += n;
            expectedTotalAvgAmp += amp * 0.7;
            amp /= 2;//setup for next iteration
            layerFreq *= 3;
        }
        const y = p.map(runningTotal, 0, expectedTotalAvgAmp, p.height, 0, true);
        return y;
    }

    function handleMousePressed() {
        if (p.mouseButton === p.LEFT) {
            p.background('white');
            if (p.isLooping()) {
                p.noLoop();
            } else {
                p.loop();
            }
        }
    }

    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;
    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
}
