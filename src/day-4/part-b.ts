// Day 4 - Camp Cleanup
// https://adventofcode.com/2022/day/4

import fs from 'fs';
import path from 'path';

const input = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(x => x.split(',').map(y => y.split('-').map(z => parseInt(z))));

const getRange = (a: number[]): number[] => {
    const range = [];
    for (let i = a[0]; i <= a[1]; i++) {
        range.push(i);
    }
    return range;
};

const checkIfContains = (a: number[], b: number[]): boolean => {
    const aContainsB = a.some(x => b.includes(x));
    const bContainsA = b.some(x => a.includes(x));

    return aContainsB || bContainsA;
};

const getResult = (input: number[][][]): number => {
    let result = 0;

    for (let i = 0; i < input.length; i++) {
        const rangeA = getRange(input[i][0]);
        const rangeB = getRange(input[i][1]);

        if (checkIfContains(rangeA, rangeB)) {
            result += 1;
        }
    }

    return result;
};

const result = getResult(input);

console.log('Total number of overlapping ranges is:', result);
