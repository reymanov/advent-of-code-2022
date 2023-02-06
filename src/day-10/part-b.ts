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

class CRT {
    width: number;
    height: number;
    currentIndex: number;
    content: string[][];

    constructor(width = 40, height = 6) {
        this.width = width;
        this.height = height;
        this.currentIndex = 0;

        this.content = new Array(this.height).fill(0).map(_ => new Array(this.width).fill(' '));
    }

    runCycle(spritePosition: number) {
        const x = this.currentIndex % this.width;
        const y = Math.floor(this.currentIndex / this.width);

        if (y >= this.height) return;

        if (Math.abs(x - spritePosition) < 2) this.content[y][x] = '#';
        else this.content[y][x] = '.';

        this.currentIndex++;
    }

    printScreen() {
        console.log(this.content.map(line => line.join('')).join('\n'));
    }
}

const runCRT = (commands: { name: string; n: number }[]) => {
    let cycle = 0;
    let x = 1;

    const crt = new CRT();

    for (let { name, n } of commands) {
        switch (name) {
            case 'noop':
                cycle++;
                crt.runCycle(x);
                break;
            case 'addx':
                for (let i = 0; i < 2; i++) {
                    cycle++;
                    crt.runCycle(x);
                }
                x += n;
                break;
            default:
                throw new Error(`Unknown command: ${name}`);
        }
    }

    crt.printScreen();
};

runCRT(commands);
