import p5 from 'p5';

export function petalsFn(p: p5, { palette, diameter }: FlowerInfo) {
    p.fill(p.random(palette));
    const numPetals = p.random([4, 6, 8, 12, 16]);
    const angleBetweenPetals = p.TWO_PI / numPetals;
    const flowerInfo: FlowerInfo = {
        diameter: diameter * p.random(0.5, 1),
        palette,
    };
    const drawPetal = p.random([
        drawPetalCircle,
        drawPetalSquare,
        drawPetalTrianglePointIn,
        drawPetalTrianglePointOut,
        drawPetalSineWave,
        drawPetalRectPairs
    ]);
    const petalRingD = diameter / p.random([3, 4, 8]);
    for (let i = 0; i < numPetals; i++) {
        p.push();
        p.rotate(angleBetweenPetals * i);
        p.translate(petalRingD, 0);
        p.noStroke();
        drawPetal(p, flowerInfo);

        p.pop();
    }
}
function drawPetalCircle(p: p5, { diameter }: FlowerInfo): void {
    p.circle(0, 0, diameter / 8);
}
function drawPetalSquare(p: p5, { diameter }: FlowerInfo): void {
    p.square(0, 0, diameter / 8);
}

function drawPetalRectPairs(p: p5, { diameter }: FlowerInfo): void {
    p.push()
    const w = diameter / 16;
    const len = diameter / 5

    p.rect(0, -diameter / 16, len, w);
    p.rect(0, diameter / 16, len, w);
    p.pop()
}

function drawPetalSineWave(p: p5, { diameter, palette }: FlowerInfo): void {
    const outerD = diameter * 0.3
    const innerD = 0.3 * outerD

    const amp = 2;
    p.stroke(p.random(palette))
    p.strokeWeight(3)
    for (let x = innerD; x < outerD; x++) {
        p.point(x, amp * p.sin(x))
    }
}

function drawPetalTrianglePointIn(p: p5, { diameter }: FlowerInfo): void {
    const outerD = diameter / 6;
    const h = diameter / 12; //really, half-height
    p.beginShape();
    p.vertex(0, 0);
    p.vertex(outerD, -h);
    p.vertex(outerD, h);
    p.endShape(p.CLOSE);
}
function drawPetalTrianglePointOut(p: p5, { diameter }: FlowerInfo): void {
    const innerD = diameter / 8;
    const outerD = diameter / 4;
    const h = diameter / 16; //half-thickness, really
    p.beginShape();
    p.vertex(innerD, -h);
    p.vertex(outerD, 0);
    p.vertex(innerD, h);
    p.endShape(p.CLOSE);
}
