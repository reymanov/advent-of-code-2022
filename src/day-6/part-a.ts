// Day 6 - Tuning Trouble
// https://adventofcode.com/2022/day/6

import fs from 'fs';
import path from 'path';

const input = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .replace(/\r/g, '')
    .trim();

const isArrayUnique = (array: String[]) => {
    return new Set(array).size === array.length;
};

const processData = (buffer: String): number | null => {
    const slidingWindow = [];
    for (let i = 0; i < buffer.length; i++) {
        slidingWindow.push(input[i]);
        if (slidingWindow.length > 4) slidingWindow.shift();
        if (slidingWindow.length === 4 && isArrayUnique(slidingWindow)) return i + 1;
    }
    return null;
};

const result = processData(input);
console.log('Result:', result);
