import p5 from 'p5'

export interface Walker {
    pos: { x: number; y: number }
}

export function createWalker(x: number, y: number, p: p5): Walker {
    return { pos: { x, y } }
}

export function drawWalker(walker: Walker, p: p5) {
    p.fill(getRandomColour(p))
    p.rectMode(p.CENTER)
    p.square(walker.pos.x, walker.pos.y, 10)
}

export function updateWalker(walker: Walker, p: p5) {
    walker.pos.x += p.random(-10, 10)
    walker.pos.y += p.random(-10, 10)
}

function getRandomColour(p: p5) {
    const palette = ['#556270', '#4ecdc4', '#c7f464', '#ff6b6b', '#c44d58']
    return p.random(palette)
}
