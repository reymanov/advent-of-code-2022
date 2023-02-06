// Day 10 - Cathode-Ray Tube
// https://adventofcode.com/2022/day/10

import fs from 'fs';
import path from 'path';

const commands = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map(c => {
        const [name, n] = c.split(' ');
        return {
            name,
            n: parseInt(n) || 0,
        };
    });

const cycles = [20, 60, 100, 140, 180, 220];

const getTotalStrength = (commands: { name: string; n: number }[]) => {
    let total = 0;
    let cycle = 0;
    let x = 1;

    const records = new Map<number, number>();
    cycles.forEach(c => records.set(c, 0));

    for (let { name, n } of commands) {
        switch (name) {
            case 'noop':
                cycle++;
                if (records.has(cycle)) records.set(cycle, x);
                break;
            case 'addx':
                for (let i = 0; i < 2; i++) {
                    cycle++;
                    if (records.has(cycle)) records.set(cycle, x);
                }
                x += n;
                break;
            default:
                throw new Error(`Unknown command: ${name}`);
        }
    }

    records.forEach((value, key) => (total += value * key));
    return total;
};

console.log(getTotalStrength(commands));
