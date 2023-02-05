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

const isVisible = (x: number, y: number, table: number[][]) => {
    const size = table[y][x];
    const height = table.length;
    const width = table[0].length;

    // Check above
    for (let i = y - 1; i >= 0; i--) {
        if (table[i][x] >= size) break;
        if (table[i][x] < size && i === 0) return true;
    }

    // Check below
    for (let i = y + 1; i < height; i++) {
        if (table[i][x] >= size) break;
        if (table[i][x] < size && i === height - 1) return true;
    }

    // Check left
    for (let i = x - 1; i >= 0; i--) {
        if (table[y][i] >= size) break;
        if (table[y][i] < size && i === 0) return true;
    }

    // Check right
    for (let i = x + 1; i < width; i++) {
        if (table[y][i] >= size) break;
        if (table[y][i] < size && i === width - 1) return true;
    }

    return false;
};

const getVisibleCount = () => {
    let visibleCount = 0;

    // All outer edges are visible
    visibleCount += trees[0].length * 2 + trees.length * 2 - 4;

    for (let y = 1; y < trees.length - 1; y++) {
        for (let x = 1; x < trees[y].length - 1; x++) {
            if (isVisible(x, y, trees)) visibleCount++;
        }
    }

    return visibleCount;
};

const result = getVisibleCount();
console.log(result);
