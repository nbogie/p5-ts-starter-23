import p5 from "p5";
import { collect } from "./utils";

const palettes = require("nice-color-palettes/100") as Palette[];
type Palette = string[];

const sketch = function (p: p5) {
    function setup() {
        p.noLoop();
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(() => {
            if (p.mouseButton === p.LEFT) {
                p.redraw();
            }
        });
    }

    function draw() {
        const epicenters = collect(10, createAnEpicenter);
        p.background(255);
        drawLayers(p, epicenters);
    }

    interface Epicenter {
        pos: p5.Vector;
        shape: ShapeType;
        stoppingDiameter: number;
        rotation: number;
    }

    type ShapeType = "circle" | "square";

    function createAnEpicenter(): Epicenter {
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

    function drawLayers(p: p5, epicenters) {
        const palette = p.random(palettes);
        p.noStroke();
        const startingDiameter = p.max(p.width, p.height);
        const bandThickness = p.random(30, 85);
        let layerIx = 0;
        let diameter = startingDiameter;
        while (diameter > 0) {
            p.fill(palette[layerIx % palette.length]);
            setShadows(true);
            drawOneLayer(epicenters, diameter);
            setShadows(false);
            drawOneLayer(epicenters, diameter);
            diameter -= bandThickness;
            layerIx++;
        }
    }

    function drawOneLayer(epicenters: Epicenter[], diameter: number) {
        for (const c of epicenters) {
            drawOneShapeLayer(c, diameter);
        }
    }

    function drawOneShapeLayer(c: Epicenter, diameter: number) {
        if (diameter < c.stoppingDiameter) {
            return;
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

    function setShadows(isOn: boolean) {
        if (isOn) {
            p.drawingContext.shadowBlur = 10;
            p.drawingContext.shadowColor = p.color(0, 0, 0, 100);
        } else {
            p.drawingContext.shadowBlur = 0;
        }
    }

    p.setup = setup;
    p.draw = draw;
};
const myP5 = new p5(sketch);
