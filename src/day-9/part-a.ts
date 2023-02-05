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
    const head = new Point(0, 0);
    const tail = new Point(0, 0);
    const visited = new Set<string>();

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
            head.move(line.direction);
            tail.follow(head);
            markVisited(tail, visited);
        }
    }

    return visited.size;
};

const result = getResult();
console.log(result);
