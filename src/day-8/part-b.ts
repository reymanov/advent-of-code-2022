// Day 8 - Treetop Tree House
// https://adventofcode.com/2022/day/8

import fs from 'fs';
import path from 'path';

const trees = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map(row => row.split('').map(size => Number(size)));

const getScoreForNode = (x: number, y: number, table: number[][]) => {
    const size = table[y][x];
    const height = table.length;
    const width = table[0].length;

    let scoreUp = 0;
    let scoreDown = 0;
    let scoreLeft = 0;
    let scoreRight = 0;

    // Check above
    for (let i = y - 1; i >= 0; i--) {
        if (y === 0) return 0;
        if (table[i][x] < size) scoreUp++;
        if (table[i][x] >= size) {
            scoreUp++;
            break;
        }
    }

    // Check below
    for (let i = y + 1; i < height; i++) {
        if (y === height - 1) return 0;
        if (table[i][x] < size) scoreDown++;
        if (table[i][x] >= size) {
            scoreDown++;
            break;
        }
    }

    // Check left
    for (let i = x - 1; i >= 0; i--) {
        if (x === 0) return 0;
        if (table[y][i] < size) scoreLeft++;
        if (table[y][i] >= size) {
            scoreLeft++;
            break;
        }
    }

    // Check right
    for (let i = x + 1; i < width; i++) {
        if (x === width - 1) return 0;
        if (table[y][i] < size) scoreRight++;
        if (table[y][i] >= size) {
            scoreRight++;
            break;
        }
    }

    return scoreUp * scoreDown * scoreLeft * scoreRight;
};

const getBiggestScore = () => {
    let scores: number[] = [];

    for (let y = 0; y < trees.length; y++) {
        for (let x = 0; x < trees[y].length; x++) {
            scores.push(getScoreForNode(x, y, trees));
        }
    }

    const biggestScore = Math.max(...scores);
    return biggestScore;
};

const result = getBiggestScore();
console.log(result);
