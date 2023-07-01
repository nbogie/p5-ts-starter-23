import p5 from 'p5';

export function petalsFn(p: p5, { palette, diameter }: FlowerInfo) {
    p.fill(p.random(palette));
    const numPetals = p.random([4, 6, 8, 12, 16]);
    const angleBetweenPetals = p.TWO_PI / numPetals;
    for (let i = 0; i < numPetals; i++) {
        p.push();
        p.rotate(angleBetweenPetals * i);
        p.translate(diameter / 3, 0);
        p.noStroke();
        p.ellipse(0, 0, diameter / 4, diameter / 8);
        p.pop();
    }
}
