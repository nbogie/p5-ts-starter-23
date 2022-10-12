import p5 from "p5";
import Matter from "matter-js";

const sketch = function (p: p5) {
    // module aliases
    const Engine = Matter.Engine,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Vector = Matter.Vector,
        Composite = Matter.Composite;

    let boxA: Matter.Body;
    let boxB: Matter.Body;
    let ground: Matter.Body;

    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.mousePressed(handleMousePressed);

        // create an engine
        const engine = Engine.create();

        // create two boxes and a ground
        boxA = Bodies.rectangle(400, 200, 80, 80);
        boxB = Bodies.rectangle(450, 50, 80, 80);
        ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        // add all of the bodies to the world
        Composite.add(engine.world, [boxA, boxB, ground]);

        //Cheekily piggy-back some properties of our own.  Be careful these don't clash with ones matterjs uses.
        //@ts-ignore
        ground.colour = getRandomColour();
        //@ts-ignore
        boxA.colour = getRandomColour();
        //@ts-ignore
        boxB.colour = getRandomColour();

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);
    }

    function draw() {
        p.background(30);
        drawBodyFromVertices(p, boxA);
        drawBodyFromVertices(p, boxB);
        drawBodyFromVertices(p, ground);
    }

    function drawBodyFromVertices(p, body: Matter.Body) {
        p.push();
        p.beginShape();
        //@ts-ignore
        p.fill(body.colour);
        for (const pt of body.vertices) {
            p.vertex(pt.x, pt.y);
        }
        p.endShape();
        p.pop();
    }

    function getRandomColour(): string {
        const palette = ["#556270", "#4ecdc4", "#c7f464", "#ff6b6b", "#c44d58"];
        return p.random(palette);
    }

    function handleMousePressed() {
        const mousePos = Vector.create(p.mouseX, p.mouseY);
        p.background("white");
        Body.setPosition(boxA, mousePos);

        const randVec = Vector.create(p.random(-80, 80), p.random(-80, 80));
        Body.setPosition(boxB, Vector.add(mousePos, randVec));
        Body.setVelocity(boxA, Vector.create(1, -5));
        Body.setVelocity(boxB, Vector.create(0, -5));
    }

    //Crucially, assign the setup and draw functions for the p5 sketch.
    p.setup = setup;
    p.draw = draw;

    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};
const myP5 = new p5(sketch);
