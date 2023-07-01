import p5 from 'p5';

new p5(createSketch);

function createSketch(p: p5) {
    /** Called once, automatically, by p5.js */
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handleMousePressed);
        // p.noLoop();
        // p.frameRate(5);
    }

    /** Called every frame, automatically, by p5.js */
    function draw() {
        drawPerlinCloudsGrid();
    }

    function drawPerlinCloudsGrid() {
        const cellSize = 40;
        const numColumns = p.ceil(p.width / cellSize);
        const numRows = p.ceil(p.height / cellSize);

        for (let gridX = 0; gridX < numColumns; gridX++) {
            for (let gridY = 0; gridY < numRows; gridY++) {
                const x = gridX * cellSize;
                const y = gridY * cellSize;
                const cellColour = calculateColourForPosition(x, y, p);
                p.fill(cellColour);
                p.square(x, y, cellSize);
            }
        }
    }

    function calculateColourForPosition(x: number, y: number, p: p5) {
        const noiseScale = 0.003;
        const noiseVal = p.noise(
            x * noiseScale,
            y * noiseScale,
            p.frameCount / 100
        );
        const c1 = p.color('cyan');
        const c2 = p.color('magenta');
        return p.lerpColor(c1, c2, p.map(noiseVal, 0.3, 0.7, 0, 1, true));
        // return p.color(noiseVal * 255);
    }

    function handleMousePressed() {
        if (p.mouseButton === p.LEFT) {
            p.background('white');
            p.noLoop();
        }
    }

    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;
    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
}
