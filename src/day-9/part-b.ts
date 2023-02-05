// Day 9 - Rope Bridge
// https://adventofcode.com/2022/day/9

import fs from 'fs';
import path from 'path';

const lines = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map(line => {
        const [letter, number] = line.split(' ');
        return {
            direction: letter,
            totalMoves: parseInt(number),
        };
    });

const movesDefinition = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
};

class Point {
    x = 0;
    y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    move(direction: string) {
        const delta = movesDefinition[direction as 'R' | 'L' | 'U' | 'D'];
        this.x += delta.x;
        this.y += delta.y;
    }

    follow(point: Point) {
        const distance = Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y));
        if (distance > 1) {
            const directionX = point.x - this.x;
            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
            const directionY = point.y - this.y;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }
}

const markVisited = (point: Point, visited: Set<string>) => {
    visited.add(`${point.x},${point.y}`);
};

const getResult = () => {
    const knots = new Array(10).fill(0).map(_ => new Point(0, 0));
    const visited = new Set<string>();
    markVisited(new Point(0, 0), visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
            knots[0].move(line.direction);
            for (let knot = 1; knot < knots.length; knot++) {
                const point = knots[knot];
                point.follow(knots[knot - 1]);
            }
            const tail = knots[knots.length - 1];
            markVisited(tail, visited);
        }
    }

    return visited.size;
};

const result = getResult();
console.log(result);
