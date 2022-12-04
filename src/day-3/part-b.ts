// Day 3 - Rucksack Reorganization
// https://adventofcode.com/2022/day/3

// Priority
// a -> z = 1 -> 26
// A -> Z = 27 -> 52

import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n');

const getGrouped = (array: any[]): any[] => {
    const result = [];
    for (let i = 0; i < array.length; i += 3) {
        result.push([array[i], array[i + 1], array[i + 2]]);
    }
    return result;
};

const groupedInput = getGrouped(input);

const getDuplicate = (a: string, b: string, c: string): string | null => {
    for (let i = 0; i < a.length; i++) {
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i]) && c.includes(a[i])) return a[i];
        }
    }
    return null;
};

const getPriority = (letter: string | null): number => {
    if (!letter) return 0;

    if (letter === letter.toLowerCase()) {
        return letter.charCodeAt(0) - 96;
    } else {
        return letter.charCodeAt(0) - 64 + 26;
    }
};

const result = groupedInput
    .map(([a, b, c]) => getDuplicate(a, b, c))
    .map(x => getPriority(x))
    .reduce((a, b) => a + b, 0);

console.log('Total priority is:', result);
