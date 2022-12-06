// Day 5 - Supply Stacks
// https://adventofcode.com/2022/day/5

import fs from 'fs';
import path from 'path';

const [rawStacks, rawMoves] = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .replace(/\r/g, '')
    .trimEnd()
    .split('\n\n');

const parsedStacks = rawStacks
    .split('\n')
    .map(line => [...line].filter((value, index) => index % 4 === 1));

const indexes: any = parsedStacks.pop();

type Stacks = { [key: number]: string[] };

const stacks: Stacks = {};

for (const line of parsedStacks) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== ' ') {
            if (!stacks[indexes[i]]) {
                stacks[indexes[i]] = [];
            }
            stacks[indexes[i]].unshift(line[i]);
        }
    }
}

const movesList = rawMoves.split('\n').map(x =>
    x
        .replace(/[^0-9\.]+/g, ',')
        .split(',')
        .map(y => parseInt(y))
        .filter(Boolean)
);

for (const move of movesList) {
    const [amount, from, to] = move;
    const crates = stacks[from].splice(-amount);
    stacks[to].push(...crates);
}

const topCrates = Object.values(stacks)
    .map(stack => stack[stack.length - 1])
    .toString()
    .replace(/,/g, '');

console.log(topCrates);
