import p5 from 'p5';
import { concentricCirclesFn } from './flowerElements/concentricCirclesFn';
import { petalsFn } from './flowerElements/petalsFn';
import { concentricPolygons } from './flowerElements/concentricPolygons';
import { letterPetalsFn } from './flowerElements/letterPetals';
import { concentricArcs } from './flowerElements/concentricArcs';

new p5(createSketch);

function createSketch(p: p5) {
    const palette = [
        '#f94144',
        '#f3722c',
        '#f8961e',
        '#f9844a',
        '#f9c74f',
        '#90be6d',
        '#43aa8b',
        '#4d908e',
        '#577590',
        '#277da1',
    ];
    const bgColor = 50;
    /** Called once, automatically, by p5.js */
    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handleMousePressed);
        // p.background(p.random(palette));
        p.background(bgColor);

        p.noLoop();
    }

    /** Called every frame, automatically, by p5.js */
    function draw() {
        drawFlowersGrid();
    }

    function drawFlowersGrid() {
        const cellSize = 200;
        const numColumns = p.ceil(p.width / cellSize);
        const numRows = p.ceil(p.height / cellSize);

        for (let gridX = 0; gridX < numColumns + 1; gridX++) {
            for (let gridY = 0; gridY < numRows + 1; gridY++) {
                const x = gridX * cellSize;
                const y = gridY * cellSize;
                drawFlowerAt({ x, y }, cellSize * 0.8, p);
            }
        }
    }

    function drawFlowerAt(
        pos: { x: number; y: number },
        diameter: number,
        p: p5
    ) {
        p.fill(p.random(255));
        p.rectMode(p.CENTER);
        p.push();
        p.translate(pos.x, pos.y);

        const possibleElements = [
            concentricCirclesFn,
            petalsFn,
            concentricPolygons,
            concentricArcs,
            // letterPetalsFn,
        ];
        const fns = p.shuffle(possibleElements).slice(0, p.random([0, 1, 2]));
        const flowerInfo: FlowerInfo = {
            diameter,
            palette,
        };
        fns.forEach((fn) => fn(p, flowerInfo));
        p.pop();
    }

    function handleMousePressed() {
        if (p.mouseButton === p.LEFT) {
            p.background(bgColor);
            p.redraw();
        }
    }

    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;
    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
}
