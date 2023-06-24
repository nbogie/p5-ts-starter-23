import p5 from 'p5'

new p5(createSketch)

function createSketch(p: p5) {
    interface Walker {
        pos: { x: number; y: number }
    }

    //In instance mode, your previously "global" variables likely can sit here (where they won't conflict with other loaded sketches)
    let walker: Walker

    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight)
        myCanvas.mousePressed(handleMousePressed)
        walker = { pos: { x: p.width / 2, y: p.height / 2 } }
        // p.noLoop();
    }

    function draw() {
        drawWalker()
        updateWalker()
    }

    function drawWalker() {
        p.fill(getRandomColour())
        p.rectMode(p.CENTER)
        p.square(walker.pos.x, walker.pos.y, 10)
    }

    function updateWalker() {
        walker.pos.x += p.random(-10, 10)
        walker.pos.y += p.random(-10, 10)
    }

    function getRandomColour() {
        const palette = ['#556270', '#4ecdc4', '#c7f464', '#ff6b6b', '#c44d58']
        return p.random(palette)
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
