import p5 from 'p5'
import { Walker, createWalker, drawWalker, updateWalker } from './walker'

new p5(createSketch)

function createSketch(p: p5) {
    //In instance mode, your previously "global" variables likely can sit here (where they won't conflict with other loaded sketches)
    let walker: Walker

    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight)
        myCanvas.mousePressed(handleMousePressed)
        walker = createWalker(p.width / 2, p.height / 2, p)
        // p.noLoop();
    }

    function draw() {
        drawWalker(walker, p)
        updateWalker(walker, p)
    }

    function handleMousePressed() {
        p.background('white')
        walker.pos.x = p.mouseX
        walker.pos.y = p.mouseY
    }

    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup
    p.draw = draw
    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight)
}
