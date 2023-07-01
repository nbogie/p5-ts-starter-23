import p5 from 'p5';

export function concentricCirclesFn(p: p5, { diameter, palette }: FlowerInfo) {
    for (let i = 0; i < 3; i++) {
        p.noFill();
        p.strokeWeight(p.random([1, 1, 1, 1, 2, 10]));
        p.stroke(p.random(palette));
        p.circle(0, 0, p.random(diameter));
    }
}
