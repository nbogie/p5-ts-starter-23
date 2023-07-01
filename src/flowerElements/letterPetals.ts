import p5 from 'p5';

export function letterPetalsFn(p: p5, { palette, diameter }: FlowerInfo) {
    p.fill(p.random(palette));
    const words = ['code', 'create', 'p5js', 'flower', 'octopus'];
    const word = p.random(words);
    const letters = word.split('');

    const numPetals = letters.length; //p.random([4, 6, 8])
    const angleBetweenPetals = p.TWO_PI / numPetals;

    for (let i = 0; i < numPetals; i++) {
        const letter = letters[i];
        p.push();
        p.rotate(angleBetweenPetals * i);
        p.translate(diameter / 3, 0);
        p.rotate(p.PI / 2);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(diameter / 5);
        p.text(letter, 0, 0);
        p.pop();
    }
}
