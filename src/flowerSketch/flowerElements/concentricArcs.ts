import p5 from 'p5';

export function concentricArcs(p: p5, { palette, diameter }: FlowerInfo) {
    p.noFill();
    const numSides = p.random([2, 4, 8]);
    p.push();
    p.rotate(-p.TWO_PI / numSides / 2);
    const angleBetweenPetals = p.TWO_PI / numSides;
    p.strokeCap(p.SQUARE);
    const numRings = p.random([1, 2, 3]);
    for (let ringIx = 0; ringIx < numRings; ringIx++) {
        p.stroke(p.random(palette));
        const radius = p.random(0.1, 0.5) * diameter;
        p.strokeWeight(p.random([1, 2, radius / 5]));
        for (let i = 0; i < numSides; i += 2) {
            const angleStart = i * angleBetweenPetals;
            const angleEnd = (i + 1) * angleBetweenPetals;
            p.arc(0, 0, radius, radius, angleStart, angleEnd);
        }
    }
    p.pop();
}
