import p5 from 'p5';

export function concentricPolygons(p: p5, { palette, diameter }: FlowerInfo) {
    p.push();
    p.stroke(p.random(palette));
    p.noFill();
    const numSides = p.random([5, 6, 8]);
    p.rotate(-p.PI / 2);
    const angleBetweenPetals = p.TWO_PI / numSides;
    p.beginShape();
    const radius = p.random(0.1, 0.5) * diameter;
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleBetweenPetals;
        const pos = polarToCartesian(angle, radius);
        p.vertex(pos.x, pos.y);
    }
    p.endShape(p.CLOSE);
    p.pop();
}

function polarToCartesian(
    angle: number,
    radius: number
): { x: number; y: number } {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
    };
}
