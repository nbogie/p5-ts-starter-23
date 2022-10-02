import p5 from "p5";
import { getStroke } from "perfect-freehand";

//An (advanced) example sketch using an external npm library.
//see https://github.com/steveruizok/perfect-freehand

const sketch = function (p: p5) {
    let inputPoints: number[][] = [];

    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handlePointerDown);
        myCanvas.mouseMoved(handlePointerMove);

        p.fill(getRandomColour());
    }

    function draw() {
        const strokeOptions = {
            size: 64,
            thinning: 0.5,
            smoothing: 0.5,
            streamline: 0.5,
            easing: (t) => t,
            start: {
                taper: 0,
                easing: (t) => t,
                cap: true,
            },
            end: {
                taper: 100,
                easing: (t) => t,
                cap: true,
            },
        };
        const stroke = getStroke(inputPoints, strokeOptions);
        const pathData = getSvgPathFromStroke(stroke);

        const myPath = new Path2D(pathData);

        p.drawingContext.fill(myPath);
    }
    function handlePointerDown(e) {
        inputPoints = [[p.mouseX, p.mouseY]];
    }

    function handlePointerMove(e) {
        if (p.mouseButton === "left" && p.mouseIsPressed)
            inputPoints.push([p.mouseX, p.mouseY]);
    }

    function handleKeyPressed() {
        console.log("hkp");
        if (p.key === " ") {
            inputPoints.length = 0;
            p.background(255);
        }
    }
    function getRandomColour() {
        const palette = ["#556270", "#4ecdc4", "#c7f464", "#ff6b6b", "#c44d58"];
        return p.random(palette);
    }

    p.setup = setup;
    p.draw = draw;
    p.keyPressed = handleKeyPressed;
    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};

function getSvgPathFromStroke(points, closed = true) {
    const average = (a, b) => (a + b) / 2;

    const len = points.length;

    if (len < 4) {
        return ``;
    }

    let a = points[0];
    let b = points[1];
    const c = points[2];

    let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
        2
    )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
        b[1],
        c[1]
    ).toFixed(2)} T`;

    for (let i = 2, max = len - 1; i < max; i++) {
        a = points[i];
        b = points[i + 1];
        result += `${average(a[0], b[0]).toFixed(2)},${average(
            a[1],
            b[1]
        ).toFixed(2)} `;
    }

    if (closed) {
        result += "Z";
    }

    return result;
}

const myP5 = new p5(sketch);
