import p5 from "p5";
import { collect } from "./utils";

const sketch = function (p) {
    const palette = ["#f2e3c6", "#ffc6a5", "#e6324b", "#2b2b2b", "#353634"];

    function setup() {
        p.noLoop();
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(() => p.redraw());
    }

    interface Epicenter {
        pos: p5.Vector;
        shape: ShapeType;
        stoppingDiameter: number;
        rotation: number;
    }

    type ShapeType = "circle" | "square";

    function createACenter(): Epicenter {
        return {
            pos: p.createVector(
                p.random(-0.2, 1.2) * p.width,
                p.random(-0.2, 1.2) * p.height
            ),
            shape: p.random(["circle", "square"]),
            stoppingDiameter: p.random(100, 200),
            rotation: (p.random([0, 1, 2, 3, 4, 5, 6, 7]) * p.PI) / 8,
        };
    }

    function draw() {
        const centers = collect(10, createACenter);
        p.background(255);
        drawLayers(p, centers);
    }

    function drawLayers(p, centers) {
        p.noStroke();
        const startingDiameter = p.max(p.width, p.height);
        const bandThickness = 30;
        let layerIx = 0;
        let diameter = startingDiameter;
        while (diameter > 0) {
            p.fill(palette[layerIx % palette.length]);
            for (const c of centers) {
                if (diameter < c.stoppingDiameter) {
                    continue;
                }
                p.push();
                p.translate(c.pos.x, c.pos.y);
                if (c.shape === "circle") {
                    p.circle(0, 0, diameter);
                } else {
                    p.rectMode(p.CENTER);
                    p.rotate(c.rotation);
                    p.square(0, 0, diameter);
                }
                p.pop();
            }

            diameter -= bandThickness;
            layerIx++;
        }
    }

    p.setup = setup;
    p.draw = draw;
};
const myP5 = new p5(sketch);
